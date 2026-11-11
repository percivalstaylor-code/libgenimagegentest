# Crime carousel — Greenvale / Hume

Two 1080×1350 slides (plus `@2x`, 2160×2700) in the same style as the Technical Colleges carousel:

1. `crime-1-labor.png` — **Labor's failure**, in Labor red and white
2. `crime-2-plan.png` — **The Liberal Plan**, in Liberal blue

Slide 1 carries only the Liberal Victoria logo (no candidate names). Slide 2 is signed off by three candidates, in equal-width columns ordered alphabetically by electorate
(which puts Jim in the centre): **Baris Duzova, Liberal for Broadmeadows** · **Jim Overend, Liberal for
Greenvale** · **Eddie Dadisho, Liberal for Kalkallo**, with the Jess Wilson's Liberal Victoria logo centred
beneath (`cands` in each page's defaults).

---

## Post caption (ready to paste)

Labor has lost control of crime. Across Hume, crime is up 30% since 2022.

Motor vehicle thefts have more than doubled. Serious assaults are up 54%. Offences at our train stations have more than tripled. And Craigieburn Police Station has gone from being open 24/7 to just two days a week.

Across Victoria, 723 people became a victim of crime every single day in the year to June 2026, and 279,102 crimes remain unsolved.

Our Liberal and Nationals team has a comprehensive plan to reduce crime and keep Victorians safe. We will:

✅ Recruit 3,000 more police officers
✅ Reopen the more than 40 police stations closed under Labor, including reopening Craigieburn Police Station 24 hours a day, 7 days a week
✅ Recruit 200 additional PSOs and return them to every single metropolitan train station, including Coolaroo, Jacana, Oak Park, Gowrie and Fawkner
✅ Implement real Adult Crime, Adult Time laws, including for arson and motor vehicle theft
✅ Introduce a tough new one-strike rule for bail
✅ Establish a new Court of Criminal Appeal
✅ Invest in proven early intervention and rehabilitation programs

Victorians deserve to feel safe again.

**Sources:** Crime Statistics Agency Victoria, recorded offences, Hume LGA, year ending June 2026 compared with year ending December 2022 (data released 18 October 2026). Crime Statistics Agency Victoria, victims and unsolved offences, year ending June 2026. Liberal and Nationals, *Our Plan to Keep Victorians Safe*.

*(Add the authorisation statement.)*

---

## Slide copy and where each figure comes from

### Slide 1 — "Labor has lost control of crime."
Serif line: *Crime across Hume is **up 30% since 2022***

| On the slide | Figure | Source |
|---|---|---|
| up 30% since 2022 | Total offences 18,186 → 23,691 (+30%) | CSA, Hume LGA, YE Jun 2026 vs YE Dec 2022 |
| +118% motor vehicle thefts | 789 → 1,721 | same |
| +54% serious assaults | 643 → 992 | same |
| +242% train station offences | 149 → 509 (location: train station) | same |
| Craigieburn Police Station cut from 24/7 to two days a week | 24/7 → two days a week, 10 am–5 pm | Campaign-supplied — **please confirm** |
| 723 Victorians became a victim of crime every day | 263,746 victims in the 12 months to June 2026 | CSA (via Liberal material) |
| 1,400+ vacancies on Victoria Police rosters | | Liberal material |
| 40+ police stations closed or on reduced hours | | Liberal material |
| 279,102 crimes remain unsolved | year to June 2026 | CSA (via Liberal material) |
| PSOs stripped from Roxburgh Park, Coolaroo, Jacana, Oak Park, Gowrie and Fawkner stations | local stations among the 119 that lost permanent PSOs | Campaign-supplied — **please confirm** (statewide figure: Liberal policy) |
| A crime every 50 seconds across Victoria | | Liberal policy, citing Crime Statistics Agency |

**Caveat:** the CSA figures cover the **whole Hume council area**. They are not published by state district, so they include areas outside Greenvale. That's why the slide says "Hume", not "Greenvale".

### Slide 2 — "The Liberal Plan: Reduce crime. Keep Victorians safe."
Serif line: *More police on the beat and **real consequences***

- **3,000** more police officers
- **40+** police stations reopened
- **200** more PSOs, back at every metro station
- Local commitment cards (solid blue), replacing the tick list:
  -  **"For our community — Craigieburn Police Station, reopened 24 hours a day, 7 days a week"** (answers slide 1's "cut from 24/7 to two days a week")
  - **"For our community — PSOs back at our stations: Coolaroo, Jacana, Oak Park, Gowrie and Fawkner"**
    (Roxburgh Park is on slide 1's stripped list but not on this card, as supplied — check whether to add it)

**Note on PSO numbers:** the policy document says 270 additional PSOs for stations plus 200 for shopping-centre strike teams. The campaign's latest summary says "200 additional PSOs … return them to every single metropolitan train station". The slide follows the latest summary. Confirm which one is current.

The Craigieburn (reopen, 24/7) and local PSO commitments were supplied by the campaign — **confirm they are announced Liberal commitments** before posting. The other plan points (one-strike bail, Adult Crime Adult Time, Court of Criminal Appeal, early intervention) are no longer on the slide but remain in the caption's ✅ list.

---

## Re-rendering

Copy and layout live in each page's defaults block (`source/crime-labor.html`, `source/crime-plan.html`).

```bash
cd source && node render.js                                   # slide 1
node render.js '{}' crime-plan.html crime-2-plan              # slide 2
```

Fonts: DM Serif Display, Instrument Serif and Inter, SIL Open Font License (texts in `source/`).
