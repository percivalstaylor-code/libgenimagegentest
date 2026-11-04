# Select-entry school for the north — carousel tile

1080×1080 social tile in the style of the existing Liberal Victoria policy carousel
(navy headline band dissolving into a full-bleed image, condensed high-contrast serif
headline with a light-blue italic tail, sans subhead, pagination dots).

- `select-entry-school-north.png` — 1080×1080, for upload
- `select-entry-school-north@2x.png` — 2160×2160, crisper type for print/zoom

## Re-rendering / editing

Everything is plain HTML/CSS in `source/slide.html`; the defaults at the bottom of that file
*are* the published layout. To change copy, the active carousel dot, or placement:

```bash
cd source && node render.js '{"dot":2}'
```

Any key from the defaults block can be overridden the same way (e.g. `head`, `sub`,
`cx`/`cy`/`cw`/`rot` for the news clipping). Requires `playwright` and a Chromium it can launch.

## Assets

- `map_clean.jpg` — the existing Craigieburn / Roxburgh Park map story frame with its closing
  line and baked-in attribution patched out (replaced with map texture from directly below).
  The OpenStreetMap credit is re-drawn bottom-right by the HTML and must stay (ODbL).
- `clipping.png` — the ABC News headline cutting, cut out of its background with transparency.
- Fonts: DM Serif Display (headline, condensed to 88% to match the brand serif) and Inter
  (subhead), both SIL Open Font License — licence texts included.
