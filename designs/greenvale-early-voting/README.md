# Greenvale early voting (pre-poll) locations — tile

1080×1080 social tile (plus `@2x`, 2160×2160) in the same style as the select-entry tiles:
headline "Vote early in *Greenvale.*", pre-poll dates and hours, the Greenvale electorate map with
numbered pins, a matching numbered venue list, and the Jess Wilson's Liberal Victoria watermark.

- `greenvale-early-voting-panel.png` / `@2x` — **latest: 1080×1350 card, "Early Voting centres" reference
  layout in the light style, symmetrical (no candidate photo)**: heading "Greenvale / *Early voting* centres"
  (Inter ExtraBold; "Greenvale" 1.3× larger with a thick blue underline; "Early voting" in blue), serif dates line, pale-blue rounded panel with blue ticks, suburb
  in condensed serif and "venue | address" in navy sans in one centred column, and a larger centred
  footer stacking "Jim Overend / LIBERAL FOR GREENVALE" above the navy Liberal Victoria logo. Source: `source/early-voting-panel.html`
  (`node render.js '{}' early-voting-panel.html greenvale-early-voting-panel`).
- `greenvale-early-voting-light.png` / `@2x` — 1080×1350 light card after the "Postal" reference:
  white ground, heavy navy Inter ExtraBold heading, blue condensed serif (Instrument Serif light + DM Serif
  Display bold), bold navy sans supporting lines with a soft text shadow; all type centred with generous white
  space like the reference; venues, name and logo centred in the left column beside a large candidate
  cut-out bleeding off the right and bottom edges; navy logo (`logo-navy.png`, the white wordmark recoloured #162133). No map.
  Source: `source/early-voting-light.html`
  (`node render.js '{}' early-voting-light.html greenvale-early-voting-light`).
- `greenvale-early-voting-portrait.png` / `@2x` — 1080×1350 card (4:5, feed-friendly) laid out after the
  "Early Voting centres" reference: headline, rounded venue panel, candidate cut-out bottom-left overlapping
  the panel, name block and logo bottom-right — in the Greenvale campaign style (navy/sky, condensed serif,
  glowing electorate mini-map with numbered pins, road-map texture background). Source:
  `source/early-voting-portrait.html`.
- `greenvale-early-voting.png` / `@2x` — earlier 1080×1080 square version (map left, list right).

## Content (as supplied by the campaign — check against the VEC before posting)

**Pre-poll: 18–27 November** · 9 am–6 pm, closed Sunday 22 November.

1. Attwood House Community Centre — 202 Erinbank Crescent, Attwood
2. Yellowbox Drive Voting Centre — 23 Yellowbox Drive, Craigieburn
3. Roxburgh Park Football Club — Lakeside Reserve, 75 Lakeside Drive, Roxburgh Park

## Editing / re-rendering

All copy and placement live in the defaults block of `source/early-voting.html`
(`head`, `sub`, `venues` — `[name, address, pin x, pin y]` — and `list` for the column layout).

```bash
cd source && node render.js '{}' early-voting-portrait.html greenvale-early-voting-portrait   # portrait card
node render.js                         # -> ../greenvale-early-voting.png and @2x (square)
node render.js '{}' early-voting.html greenvale-early-voting 1,2,4   # also a 4320px @4x
```

## Pin positions

Geocoded with OpenStreetMap Nominatim (two independent lookups per venue agreed to within ~200 m),
and all three confirmed inside the Greenvale District boundary:

| Venue | lat, lon | tile px |
|---|---|---|
| Attwood House Community Centre (OSM amenity) | -37.671061, 144.897567 | 268.4, 877.3 |
| 23 Yellowbox Drive, Craigieburn (OSM address) | -37.618619, 144.944015 | 433.8, 631.1 |
| 75 Lakeside Drive, Roxburgh Park (OSM address) | -37.630192, 144.930896 | 386.7, 685.6 |

Portrait card mini-map (`source/map-mini.svg`, 34 m/px, lon/lat 144.9043,-37.6404 at 540,540):
Attwood 524.8,640.5 · Yellowbox 641.5,466.6 · Lakeside 608.3,505.2 (map-mini px; the page offsets them by
its `mini.box`/`mini.crop`). `map-mini-outline.svg` re-draws the boundary unmasked on top, and
`map-bg.svg` is `map.svg` with the highlight removed (roads only), used as background texture.

Square tile pixels use the same projection as `source/map.svg` (EPSG:28355, 24 m/px, lon/lat 144.9043,-37.6404
at 290,735). If the map is re-framed, recompute them with those parameters.

## Map and credits

`source/map.svg` is built by `source/map/build_map.py` (see `../select-entry-school-north/README.md`
for the data sources) with:

```bash
python source/map/build_map.py --roads networkCleaned.xml.gz --suburbs suburb-10-vic.geojson \
  --focus-geojson districts.geojson --focus-field district --focus-value GREENVALE \
  --out source --mpp 24 --center 144.9043,-37.6404 --anchor 290,735
```

Credits go in the post caption (both licences require them):

> Map data © OpenStreetMap contributors. Electorate boundary © State of Victoria (Vicmap), CC BY 4.0.

Fonts: DM Serif Display, Instrument Serif and Inter, SIL Open Font License (texts in `source/`).
