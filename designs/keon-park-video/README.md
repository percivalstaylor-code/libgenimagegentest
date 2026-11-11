# Keon Park station — edited Reel (Remotion)

1080×1920, 30 fps, ~29.7 s. Edit of the two selfie takes (`public/part1.mp4`, `public/part2.mp4`) with the
skyrail b-roll (`public/broll.mp4`).

- Part 1 from 0.30 s; part 2 from 0.53 s (drops the repeated "Platform") to 15.55 s.
- B-roll push-in over "…the government stupidly decided to build a train station platform", covering the
  splice between takes.
- Punch-ins on "Utter incompetence" and "Vote 1 for Hamza".
- Word-synced subtitles (`src/captions.json`, transcribed with faster-whisper `medium.en`, corrected:
  "Creon Park" → "Keon Park"), active word on a Liberal-blue pill. Short fade in/out.

## Render

```bash
npm install
npx remotion render src/index.ts KeonPark out/raw.mp4 --codec h264 --crf 17 \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell
# final: smaller file, loudness levelled for social (-14 LUFS)
ffmpeg -i out/raw.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:v libx264 -crf 19 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 192k keon-park-edit.mp4
```

Status: the final encode (`keon-park-edit.mp4`) has not been produced yet; `out/raw.mp4` (not committed)
is the full-quality render.
