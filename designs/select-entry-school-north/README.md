# Select-entry school for the north — carousel tile

1080×1080 social tile in the style of the existing Liberal Victoria policy carousel
(navy headline band dissolving into a full-bleed image, condensed high-contrast serif
headline with a light-blue italic tail, sans subhead, pagination dots).

- `select-entry-school-north.png` — 1080×1080, for upload
- `select-entry-school-north@2x.png` — 2160×2160, crisper type for print/zoom

## Re-rendering / editing the tile

Everything is plain HTML/CSS in `source/slide.html`; the defaults at the bottom of that file
*are* the published layout. To change copy, the active carousel dot, or label placement:

```bash
cd source && node render.js '{"dot":2}'
```

Any key from the defaults block can be overridden the same way (e.g. `head`, `sub`, or `tags` —
`[text, x, y, fontPx, minor]` per suburb label). Requires `playwright` and a Chromium it can launch.

## The map

`source/map.svg` is a vector map drawn from open data by `source/map/build_map.py` (no raster
basemap, no Hume Fwy marker). It draws every street in frame faintly by road class, then
Craigieburn + Roxburgh Park as one glowing area with brighter streets inside and a dashed line
on their shared boundary. Labels are set in HTML so they use the brand fonts.

Data (fetched from public GitHub mirrors; not committed — too large):

| Layer | Source | Licence |
|---|---|---|
| Streets (OSM highway types) | MATSim Melbourne network, `melbourne-baseline/networkCleaned.xml.gz` in [rhys-newbury/matsim_melbourne](https://github.com/rhys-newbury/matsim_melbourne), generated from OpenStreetMap | ODbL — © OpenStreetMap contributors |
| Suburb boundaries | `suburb-10-vic.geojson` in [tonywr71/GeoJson-Data](https://github.com/tonywr71/GeoJson-Data) (Victorian locality boundaries, Geoscape Administrative Boundaries) | CC BY 4.0 — © Geoscape Australia |

Both credits are drawn bottom-right on the tile and must stay.

To rebuild or re-frame the map (`--mpp` = metres per pixel, `--center lon,lat` lands at `--anchor x,y`):

```bash
pip install pyproj shapely
python source/map/build_map.py --roads networkCleaned.xml.gz --suburbs suburb-10-vic.geojson \
  --out source --mpp 16.5 --anchor 535,703
```

The street network is a routing graph, so streets are drawn node-to-node: curves are slightly
faceted up close, which is invisible at tile size.

## Fonts

DM Serif Display (headline and labels, condensed to 88% to match the brand serif) and Inter
(subhead, credits), both SIL Open Font License — licence texts included in `source/`.
