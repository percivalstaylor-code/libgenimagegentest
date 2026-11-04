"""Build a stylised vector map for the 1080x1080 tile, highlighting one area.

Inputs (OSM-derived / open data):
  --roads    MATSim Melbourne network (networkCleaned.xml.gz, EPSG:28355, links tagged with OSM highway type)
  --suburbs  Victorian locality boundaries GeoJSON (suburb-10-vic.geojson, EPSG:4326) — used for label anchors,
             and as the highlight when --focus-geojson is not given (Craigieburn + Roxburgh Park)
  --focus-geojson / --focus-field / --focus-value
             highlight a feature from another GeoJSON instead, e.g. a Vicmap electoral district:
             --focus-geojson districts.geojson --focus-field district --focus-value GREENVALE
Outputs:
  map.svg          full-tile (1080x1080) SVG, no text
  map_labels.json  pixel anchors for suburb labels (labels are set in HTML so they use the brand fonts)
"""
import argparse, gzip, json, re
from pyproj import Transformer
from shapely.geometry import shape, mapping
from shapely.ops import transform as shp_transform, unary_union  # noqa: deprecated but stable in shapely 2.x

ap = argparse.ArgumentParser()
ap.add_argument('--roads', required=True)
ap.add_argument('--suburbs', required=True)
ap.add_argument('--out', default='.')
ap.add_argument('--mpp', type=float, default=14.0, help='metres per pixel')
ap.add_argument('--center', default='144.9225,-37.6035', help='lon,lat placed at --anchor')
ap.add_argument('--anchor', default='540,700', help='tile pixel for --center')
ap.add_argument('--focus-geojson')
ap.add_argument('--focus-field', default='district')
ap.add_argument('--focus-value')
a = ap.parse_args()

TILE = 1080
to_mga = Transformer.from_crs(4326, 28355, always_xy=True)
clon, clat = map(float, a.center.split(','))
ax, ay = map(float, a.anchor.split(','))
CX, CY = to_mga.transform(clon, clat)


def P(x, y):
    return ((x - CX) / a.mpp + ax, (CY - y) / a.mpp + ay)


PAD = 60  # px margin beyond the tile so lines run off the edges cleanly
def on_tile(p):
    return -PAD <= p[0] <= TILE + PAD and -PAD <= p[1] <= TILE + PAD


# ---------- roads ----------
CLASS = {  # osm highway type -> style class
    'motorway': 'mw', 'motorway_link': 'mwl', 'trunk': 'maj', 'trunk_link': 'mid', 'primary': 'maj', 'primary_link': 'mid',
    'secondary': 'mid', 'secondary_link': 'mid', 'tertiary': 'mid', 'tertiary_link': 'min',
    'unclassified': 'min', 'residential': 'min', 'living_street': 'min', 'road': 'min',
}
node_re = re.compile(r'<node id="([^"]+)" x="([^"]+)" y="([^"]+)"')
link_re = re.compile(r'<link id="[^"]+" from="([^"]+)" to="([^"]+)"')
type_re = re.compile(r'name="type"[^>]*>([^<]*)<')
nodes, seen, roads = {}, set(), {k: [] for k in set(CLASS.values())}
cur = None
with gzip.open(a.roads, 'rt', encoding='utf-8') as f:
    for line in f:
        if cur is None:
            m = node_re.search(line)
            if m:
                nodes[m.group(1)] = P(float(m.group(2)), float(m.group(3)))
                continue
            m = link_re.search(line)
            if m:
                cur = (m.group(1), m.group(2))
            continue
        m = type_re.search(line)
        if m:
            cls = CLASS.get(m.group(1))
            u, v = cur
            key = (min(u, v), max(u, v))
            if cls and key not in seen and u in nodes and v in nodes:
                p, q = nodes[u], nodes[v]
                if on_tile(p) or on_tile(q):
                    seen.add(key)
                    roads[cls].append((p, q))
        if '</link>' in line:
            cur = None


def segs_to_path(segs):
    # chain consecutive segments sharing endpoints to keep the path compact
    out, last = [], None
    for p, q in segs:
        if last is not None and abs(last[0] - p[0]) < 1e-6 and abs(last[1] - p[1]) < 1e-6:
            out.append('L%.1f %.1f' % q)
        else:
            out.append('M%.1f %.1fL%.1f %.1f' % (p[0], p[1], q[0], q[1]))
        last = q
    return ''.join(out)


# ---------- suburbs ----------
gj = json.load(open(a.suburbs))
sub = {}
for feat in gj['features']:
    name = (feat['properties'].get('vic_loca_2') or '').upper()
    if name in ('CRAIGIEBURN', 'ROXBURGH PARK', 'GREENVALE', 'MICKLEHAM', 'SOMERTON', 'KALKALLO', 'CAMPBELLFIELD', 'MEADOW HEIGHTS', 'COOLAROO', 'ATTWOOD', 'WOLLERT', 'WESTMEADOWS', 'DALLAS', 'BROADMEADOWS', 'TULLAMARINE', 'GLADSTONE PARK', 'BULLA'):
        g = shape(feat['geometry'])
        sub[name] = shp_transform(lambda x, y, z=None: P(*to_mga.transform(x, y)), g).buffer(0)


def ring_path(geom):
    polys = [geom] if geom.geom_type == 'Polygon' else list(geom.geoms)
    d = []
    for poly in polys:
        for ring in [poly.exterior] + list(poly.interiors):
            c = list(ring.coords)
            d.append('M' + 'L'.join('%.1f %.1f' % pt for pt in c) + 'Z')
    return ''.join(d)


shared_d = ''
if a.focus_geojson:
    hits = [f for f in json.load(open(a.focus_geojson))['features']
            if str(f['properties'].get(a.focus_field, '')).upper() == a.focus_value.upper()]
    if len(hits) != 1:
        raise SystemExit(f'expected exactly one feature with {a.focus_field}={a.focus_value}, found {len(hits)}')
    focus = shp_transform(lambda x, y, z=None: P(*to_mga.transform(x, y)), shape(hits[0]['geometry'])).buffer(0)
else:
    focus = unary_union([sub['CRAIGIEBURN'], sub['ROXBURGH PARK']]).buffer(0)
    shared = sub['CRAIGIEBURN'].boundary.intersection(sub['ROXBURGH PARK'].boundary)
    for ln in (getattr(shared, 'geoms', [shared])):
        if ln.geom_type == 'LineString' and len(ln.coords) > 1:
            shared_d += 'M' + 'L'.join('%.1f %.1f' % pt for pt in ln.coords)
focus_d = ring_path(focus)

# ---------- svg ----------
road_style = {  # stroke width, outside alpha, inside alpha
    'min': (0.9, .17, .72), 'mid': (1.5, .30, .78), 'maj': (2.2, .42, .9), 'mwl': (1.6, .45, .7), 'mw': (3.2, .7, .95),
}
order = ['min', 'mid', 'maj', 'mwl', 'mw']


def road_layer(alpha_idx, color):
    out = []
    for cls in order:
        w, ao, ai = road_style[cls]
        al = ao if alpha_idx == 0 else ai
        col = '#9fdcff' if cls in ('mw', 'mwl') else color
        out.append(f'<path d="{segs_to_path(roads[cls])}" fill="none" stroke="{col}" stroke-opacity="{al}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')
    return '\n'.join(out)


svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{TILE}" height="{TILE}" viewBox="0 0 {TILE} {TILE}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0.35" y2="1">
    <stop offset="0" stop-color="#0d2f6e"/><stop offset=".55" stop-color="#123b82"/><stop offset="1" stop-color="#0e3170"/>
  </linearGradient>
  <radialGradient id="areaFill" cx="50%" cy="45%" r="65%">
    <stop offset="0" stop-color="#8ec5ff" stop-opacity=".20"/><stop offset="1" stop-color="#6aa8ff" stop-opacity=".08"/>
  </radialGradient>
  <clipPath id="focusClip"><path d="{focus_d}"/></clipPath>
  <filter id="halo" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="16"/></filter>
  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter>
  <filter id="soft" x="-5%" y="-5%" width="110%" height="110%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>
<rect width="{TILE}" height="{TILE}" fill="url(#bg)"/>
<g id="roads-out">{road_layer(0, '#a9c8ff')}</g>
<path d="{focus_d}" fill="#7fb8ff" fill-opacity=".10" stroke="#bfe3ff" stroke-opacity=".55" stroke-width="34" filter="url(#halo)"/>
<path d="{focus_d}" fill="url(#areaFill)"/>
<g clip-path="url(#focusClip)" filter="url(#soft)">{road_layer(1, '#e6f1ff')}</g>
<path d="{shared_d}" fill="none" stroke="#ffffff" stroke-opacity=".45" stroke-width="1.6" stroke-dasharray="6 6"/>
<path d="{focus_d}" fill="none" stroke="#ffffff" stroke-opacity=".75" stroke-width="7" filter="url(#glow)"/>
<path d="{focus_d}" fill="none" stroke="#ffffff" stroke-width="3.4" stroke-linejoin="round"/>
</svg>'''
open(f'{a.out}/map.svg', 'w').write(svg)


def label_anchor(g):
    p = g.representative_point()
    return [round(p.x, 1), round(p.y, 1)]


labels = {'_focus': {'rep': label_anchor(focus), 'centroid': label_anchor(focus.centroid), 'bounds': [round(v, 1) for v in focus.bounds]}}
for n, g in sub.items():
    inner = g.intersection(focus)
    labels[n.title()] = {'rep': label_anchor(g), 'bounds': [round(v, 1) for v in g.bounds],
                         'in_focus_rep': label_anchor(inner) if inner.area > 1 else None,
                         'in_focus_share': round(inner.area / g.area, 3)}
json.dump(labels, open(f'{a.out}/map_labels.json', 'w'), indent=1)
print('roads:', {k: len(v) for k, v in roads.items()}, 'svg KB', len(svg) // 1024)
for n, v in labels.items():
    print(n, v)
