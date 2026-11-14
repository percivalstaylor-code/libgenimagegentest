# "Thank you Ashwood" — projection slide (Theo Zographos, Liberal for Ashwood)

Landscape slide for projecting behind Theo during his speech.

- `thank-you-ashwood.png` — 1920×1080 (standard HD projector / screen)
- `thank-you-ashwood@2x.png` — 3840×2160 (4K screens; also downsizes cleanly)

Liberal-blue field (matching Theo's corflutes), "Thank you / Ashwood." in white Inter ExtraBold with a
sky-blue underline, "Theo Zographos / LIBERAL FOR ASHWOOD", the white Jess Wilson's Liberal Victoria
logo, and the campaign-day volunteer photo (Chadstone Village) as a white-edged print on the right.

The photo was a phone screenshot (920×976 after cropping the black bars); it was upscaled 4× with OpenCV
EDSR super-resolution (non-generative — faces are sharpened, not invented) and saved as `source/photo.jpg`.

Re-render: `cd source && node render.js '{}' slide.html thank-you-ashwood 1,2`
(copy and layout live in the defaults block of `source/slide.html`).
