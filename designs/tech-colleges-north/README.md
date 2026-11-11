# Technical Colleges — North policy post

1080×1350 post (plus `@2x`, 2160×2700) on the Liberal Technical Colleges commitment (announced 11 Oct
2026), tailored to the North. Light polling-card style (navy/blue, Inter ExtraBold + condensed serif, pale
cards, Jim Overend name block + navy Liberal Victoria logo) over the soft-blur aerial background from
`../policy-background/`, with a white wash at top and bottom for the headline and footer.

## Copy and where it comes from

From the Liberal press release ("Bringing back Technical Colleges…", 11 Oct 2026):
- 10 new Technical Colleges across Victoria; 5,000 secondary students; Years 10–12
- ~500 students per college, co-located at existing secondary schools and TAFE Institutes
- Trades: plumbing, electrical, carpentry; also healthcare and hospitality
- Partnered with local businesses and industry bodies; pathways into apprenticeships

"Why it matters in the North" (Hume City, ABS Census 2016–2021, via Hume City Council's economic profile,
economy.id.com.au — `/hume/occupations` and `/hume/workers-place-of-residence-industry`):
- **15,700** Hume residents work as Technicians and Trades Workers (15,706; 15.3% of employed residents, 2021)
- **+4,000** more Hume residents working in Construction, 2016→2021 (+4,007); profile.id names Construction
  and Health care & social assistance as the largest growth industries — hence "one of the biggest jumps".

These were found via web search; economy.id and the council site could not be opened from the build
environment, so **confirm both figures on economy.id before posting**. Hume unemployment was deliberately
left off: current figures could not be verified (search results gave inconsistent periods).

The release does not say where the 10 colleges will be, so the post does not claim one for the North.

## Editing / re-rendering

All copy and layout live in the defaults block of `source/tech-colleges.html` (`head`, `lead`, `stats`,
`ticks`, `north`, `wash`, `top`, `gaps`).

```bash
cd source && node render.js            # -> ../tech-colleges-north.png and @2x
```

Fonts: DM Serif Display, Instrument Serif and Inter, SIL Open Font License (texts in `source/`).
