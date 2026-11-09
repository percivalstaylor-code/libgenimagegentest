# Greenvale election day voting centres — card

1080×1350 card (plus `@2x`, 2160×2700) matching the light early-voting panel card
(`../greenvale-early-voting/greenvale-early-voting-panel.png`): underlined "Greenvale" title with
"Election day centres" in blue, blue serif date line, pale-blue rounded panel with the 15 centres grouped
by suburb in two columns, and the centred "Jim Overend / LIBERAL FOR GREENVALE" + navy Liberal Victoria
logo footer.

- `greenvale-election-day.png` — 1080×1350, for upload
- `greenvale-election-day@2x.png` — 2160×2700

## Content

Centres as supplied by the campaign. **Added by design, please confirm against the VEC:** the date line
"Election day is Saturday 28 November" and "Voting centres are open 8 am–6 pm." (the standard Victorian
election-day hours).

| Suburb | Centre | Address |
|---|---|---|
| Attwood | Attwood House Community Centre | 202 Erinbank Crescent |
| Coolaroo | Coolaroo South Primary School | 52–72 Bushfield Crescent |
| Craigieburn | Our Lady’s Primary School | 169–171 Craigieburn Road (access via Bridgewater Road) |
| Craigieburn | Craigieburn Secondary College | 102 Hothlyn Drive |
| Craigieburn | Yellowbox Drive Voting Centre | 23 Yellowbox Drive |
| Greenvale | Greenvale Primary School | 5 Langton Way |
| Greenvale | Keelonith Primary School | 1 Blossom Drive |
| Greenvale | Greenvale Recreation Centre | 27 Barrymore Road |
| Meadow Heights | Meadow Heights Primary School | 46–62 Paringa Boulevard |
| Roxburgh Park | Roxburgh Park Football Club | Lakeside Reserve, 75 Lakeside Drive |
| Roxburgh Park | Roxburgh Homestead Primary School | 21–33 McPherson Boulevard (access via Homestead Run) |
| Roxburgh Park | Roxburgh Park Primary School | 7–21 Almands Avenue (access via Sommeville Drive) |
| Roxburgh Park | Roxburgh Rise Primary School | 35–59 Lockwood Drive |
| Roxburgh Park | Good Samaritan Primary School | 1–29 Southern Cross Drive |
| Westmeadows | Westmeadows Community Centre | 9A Ardlie Street |

## Editing / re-rendering

Copy and layout live in the defaults block of `source/election-day.html`: `groups` is
`[suburb, column 0|1, [[venue, address, access note?], ...]]`; the panel height and footer position are
computed from the content, so adding or removing a centre reflows automatically (check the footer still
ends above ~1320px).

```bash
cd source && node render.js            # -> ../greenvale-election-day.png and @2x
```

Fonts: DM Serif Display, Instrument Serif and Inter, SIL Open Font License (texts in `source/`).
