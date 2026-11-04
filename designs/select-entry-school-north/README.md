# Select-entry school for the north — carousel tile

1080×1080 social tile in the style of the existing Liberal Victoria policy carousel
(navy headline band dissolving into a full-bleed image, condensed high-contrast serif
headline with a light-blue italic tail, sans subhead). No carousel dots, so it works as a standalone post.

Layout: headline and subhead on top; Greenvale electorate map on the left with an education badge
(hand-drawn mortarboard, inline SVG) marking the Craigieburn / Roxburgh Park area; candidate
portrait on the right with a soft backlight, a navy fade, and the caption
"Jim Overend / Liberal Candidate for Greenvale".

- `select-entry-school-north.png` — 1080×1080, for upload
- `select-entry-school-north@2x.png` — 2160×2160, crisper type for print/zoom

## Re-rendering / editing the tile

Everything is plain HTML/CSS in `source/slide.html`; the defaults at the bottom of that file
*are* the published layout. To change copy or label placement:

```bash
cd source && node render.js '{"sub":"A new select-entry high school<br>for Roxburgh Park."}'
```

Any key from the defaults block can be overridden the same way (e.g. `head`, `sub`, `tags` —
`[text, x, y, fontPx, minor, caption]` per map label — `badge`, `jim`, `glow`, `caption`). Requires `playwright` and a Chromium it can launch.

## The map

`source/map.svg` is a vector map drawn from open data by `source/map/build_map.py` (no raster
basemap, no Hume Fwy marker). It draws every street in frame faintly by road class, then the
**Greenvale state electorate (Greenvale District)** as one glowing area with brighter streets
inside. Labels ("Greenvale", "Roxburgh Park" — matching tags) are set in HTML so they use the
brand fonts.

The district covers Greenvale, Roxburgh Park, Meadow Heights, Attwood and Somerton, about half
of Westmeadows, and the southern ~14% of Craigieburn (2021 VEC redivision boundaries, in force
for the 2022 and 2026 elections).

Data (fetched from public GitHub mirrors; not committed — too large):

| Layer | Source | Licence |
|---|---|---|
| Streets (OSM highway types) | MATSim Melbourne network, `melbourne-baseline/networkCleaned.xml.gz` in [rhys-newbury/matsim_melbourne](https://github.com/rhys-newbury/matsim_melbourne), generated from OpenStreetMap | ODbL — © OpenStreetMap contributors |
| Electorate boundary (highlight) | `assets/data/districts.geojson` in [dean8000/vic-votes-2026](https://github.com/dean8000/vic-votes-2026) — Vicmap Admin electoral districts, feature `GREENVALE` (created 2021-11-19); cross-checked against an independent copy in hayleypring2/victoria-land-doesnt-vote | CC BY 4.0 — © State of Victoria (Vicmap) |
| Suburb boundaries (label placement only, not drawn) | `suburb-10-vic.geojson` in [tonywr71/GeoJson-Data](https://github.com/tonywr71/GeoJson-Data) | CC BY 4.0 — © Geoscape Australia |

The OpenStreetMap and Vicmap credits are drawn bottom-left on the tile and must stay.

To rebuild or re-frame the map (`--mpp` = metres per pixel, `--center lon,lat` lands at `--anchor x,y`):

```bash
pip install pyproj shapely
python source/map/build_map.py --roads networkCleaned.xml.gz --suburbs suburb-10-vic.geojson \
  --focus-geojson districts.geojson --focus-field district --focus-value GREENVALE \
  --out source --mpp 19 --center 144.9043,-37.6404 --anchor 360,708
```

The street network is a routing graph, so streets are drawn node-to-node: curves are slightly
faceted up close, which is invisible at tile size.

## Portrait and icon

- `source/jim.png` — campaign-supplied transparent cut-out of the candidate (solid areas normalised
  to full opacity so the map doesn't show through).
- The mortarboard icon is drawn in-house as SVG in `slide.html` (no stock asset), so it carries no
  third-party licence. Its map position is indicative of the Craigieburn / Roxburgh Park area,
  not a site.

## Fonts

DM Serif Display (headline and labels, condensed to 88% to match the brand serif) and Inter
(subhead, credits), both SIL Open Font License — licence texts included in `source/`.
