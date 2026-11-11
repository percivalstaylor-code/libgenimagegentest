# Technical Colleges — two-slide carousel

1080×1350 slides (plus `@2x`, 2160×2700) in the light polling-card style (navy/blue, Inter ExtraBold +
condensed serif, pale cards, Jim Overend name block + navy Liberal Victoria logo) over the soft-blur aerial
background from `../policy-background/`.

1. `tech-colleges-1-labor.png` — **"Under Labor, TAFE is failing"**: jobs card (highest unemployment
   rate in the nation; 12% youth unemployment and rising; 700,000 vocationally qualified workers needed over
   the next decade) and TAFE card ($73.5m underlying sector deficit, largest since 2021; $718m paid for Free
   TAFE with no evidence it's meeting its goals; lowest student satisfaction with training quality in the
   nation), a source line and a "Swipe for our plan" cue. Source: `source/labor-tafe.html`.
2. `tech-colleges-2-plan.png` — **"Bringing back Technical Colleges"**: 10 new colleges and $222m over
   eight years offset by budget savings; six ticks (plumbing/electrical/carpentry, healthcare & hospitality,
   full-time with dedicated teachers, real vocational qualifications, partnered with local industry,
   pathways into apprenticeships); Jess Wilson quote. Source: `source/tech-colleges.html`.

## Where each claim comes from — check before posting

| Claim | Source |
|---|---|
| Highest unemployment rate in the nation; youth unemployment rising to 12%; 700,000 VET-qualified workers needed over the next decade | Liberal release, 11 Oct 2026 (Technical Colleges). No unemployment *number* is shown: the latest ABS figure couldn't be confirmed (Property Council cited Victoria at 5.1%, highest state, for July 2026). Add the current ABS rate if wanted. |
| $73.5m adjusted net deficit without advanced 2026 funding and capital grants, largest since 2021 ("underlying" on the slide) | Victorian Auditor-General, 2025 TAFE audit results (via Liberal release) |
| $718m paid to TAFEs for Free TAFE tuition (to Aug 2025); department could not demonstrate Free TAFE is meeting objectives | Victorian Auditor-General, Free TAFE audit (via Liberal release) |
| Lowest student satisfaction with quality of training in the nation | Productivity Commission, Report on Government Services 2026 mid-year (via Liberal release) |
| 10 colleges; $222m over eight years offset by savings; trades, healthcare, hospitality; full-time with dedicated teachers; qualifications (vs Labor's Tech Schools); industry partners; apprenticeship pathways; Wilson quote | Liberal release, 11 Oct 2026 |

The earlier "Why it matters in the North" Census figures were dropped at the campaign's request.

## Editing / re-rendering

Copy and layout live in each page's defaults block.

```bash
cd source && node render.js                                          # slide 1
node render.js '{}' tech-colleges.html tech-colleges-2-plan          # slide 2
```

Fonts: DM Serif Display, Instrument Serif and Inter, SIL Open Font License (texts in `source/`).
