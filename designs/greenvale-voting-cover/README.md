# Greenvale "Where & when to vote" — carousel cover

1080×1350 cover slide (plus `@2x`, 2160×2700) for the voting-information carousel, in the light campaign
style used by the early-voting and election-day cards: underlined "Greenvale" title with "Where & when to
vote" in blue; three "when" blocks (early voting, postal voting, election day); a "Swipe for every centre →"
cue; a large Jim Overend cut-out on a pale-blue field, bleeding off the bottom; and the
"Jim Overend / LIBERAL FOR GREENVALE" name block with the navy Liberal Victoria logo.

## Content — confirm against the VEC before posting

- **Early voting:** 18–27 November, 9 am–6 pm, closed Sunday 22 Nov, 3 pre-poll centres (campaign-supplied).
- **Postal voting:** apply by 6 pm Wednesday 25 November, post back by 6 pm Saturday 28 November (from the
  campaign's "Postal" slide).
- **Election day:** Saturday 28 November, 8 am–6 pm (standard Victorian election-day hours), 15 voting
  centres (campaign-supplied list; see `../greenvale-election-day/`).

## Editing / re-rendering

Copy and layout live in the defaults block of `source/cover.html` (`head`, `when`, `swipe`, `jim`, `field`,
`foot`, `name`).

```bash
cd source && node render.js            # -> ../greenvale-voting-cover.png and @2x
```

Fonts: DM Serif Display, Instrument Serif and Inter, SIL Open Font License (texts in `source/`).
