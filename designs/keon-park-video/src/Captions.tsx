import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "./theme";
import data from "./captions.json";

type Word = { t: string; s: number; e: number };
type Page = { start: number; end: number; words: Word[] };
const pages = data.pages as Page[];
const MAX_HOLD = 0.5; // s a page lingers into a pause before clearing

const outline = (c: string) =>
  [`0 0 6px ${c}`, `3px 3px 0 ${c}`, `-3px 3px 0 ${c}`, `3px -3px 0 ${c}`, `-3px -3px 0 ${c}`,
   `0 4px 0 ${c}`, `0 -4px 0 ${c}`, `4px 0 0 ${c}`, `-4px 0 0 ${c}`, `0 10px 24px ${theme.colors.shadow}`].join(",");

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const t = frame / fps;
  const idx = pages.findIndex((p, i) => {
    const next = pages[i + 1];
    const until = next ? Math.min(next.start, p.end + MAX_HOLD) : p.end + MAX_HOLD;
    return t >= p.start && t < until;
  });
  if (idx < 0) return null;
  const page = pages[idx];
  const pf = (page.start * fps);
  const enter = spring({ frame: frame - pf, fps, config: theme.spring.snappy });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{
        position: "absolute", left: 0, right: 0, top: height * theme.caption.centerY, transform:
          `translateY(-50%) translateY(${interpolate(enter, [0, 1], [18, 0])}px) scale(${interpolate(enter, [0, 1], [0.92, 1])})`,
        opacity: enter, display: "flex", justifyContent: "center",
      }}>
        <div style={{ maxWidth: theme.caption.maxWidth, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
          {page.words.map((w, i) => {
            // whole phrase enters together with a short stagger; the spoken word gets the blue pill
            const pop = spring({ frame: frame - pf - i * theme.caption.stagger, fps, config: theme.spring.snappy });
            const hit = spring({ frame: frame - w.s * fps, fps, config: theme.spring.snappy });
            const active = t >= w.s && t < (page.words[i + 1]?.s ?? page.end + MAX_HOLD);
            return (
              <span key={i} style={{
                position: "relative", display: "inline-block", padding: "2px 16px 8px",
                fontFamily: theme.fonts.caption, fontSize: theme.caption.size, lineHeight: 1.1, letterSpacing: "-0.02em",
                color: theme.colors.text, textShadow: active ? "none" : outline(theme.colors.outline),
                opacity: pop,
                transform: `translateY(${interpolate(pop, [0, 1], [14, 0])}px) scale(${active ? interpolate(hit, [0, 1], [0.94, 1.05]) : 1})`,
              }}>
                {active && <span style={{
                  position: "absolute", inset: 0, borderRadius: 18, background: theme.colors.hero, zIndex: -1,
                  boxShadow: `0 8px 22px ${theme.colors.shadow}`,
                }} />}
                {w.t}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
