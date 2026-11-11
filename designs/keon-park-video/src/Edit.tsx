import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "./theme";
import { Captions } from "./Captions";
import data from "./captions.json";

const FPS = 30;
// part1: from 0.30s to its last frame; part2: from 0.533s (drops the repeated "Platform") to bOut (keeps "Thank you")
const A = { from: 0, start: Math.round(data.aIn * FPS), end: Math.round(data.aIn * FPS) + data.aLen };
const B = { from: data.aLen, start: 16, end: Math.round(data.bOut * FPS) };
const lenA = A.end - A.start, lenB = B.end - B.start;
export const totalFrames = lenA + lenB;
// Keon Park platform photo flashes on (shutter click) over "station platform | right next", hiding the
// splice between the takes (which don't match); the skyrail b-roll plays over "this space on the other
// side for a platform", ending as "Utter" lands. broll.mp4 is 122 frames.
const PHOTO = { from: 418, dur: 44 };
const BROLLS = [{ from: 539, dur: 100, srcStart: 0, srcEnd: 100 }];
// punch-ins on emphasis (timeline seconds of "Utter" and "Vote")
const PUNCH = [{ at: 21.3, scale: 1.06 }, { at: 28.44, scale: 1.11 }];

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const easeIn = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: theme.ease.in });
const easeOut = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: theme.ease.out });
// 0→1→0 envelope; reaches 0 exactly on the last frame
const ramp = (f: number, len: number, inF: number, outF: number) =>
  Math.min(easeOut(f, 0, inF), 1 - easeIn(f, len - 1 - outF, len - 1));

const fill = { width: "100%", height: "100%", objectFit: "cover" } as const;

const Punch: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  let scale = 1;
  for (const p of PUNCH) {
    const s = spring({ frame: frame + B.from - p.at * fps, fps, config: theme.spring.punch });
    scale = interpolate(s, [0, 1], [scale, p.scale]);
  }
  return <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "30% 52%" }}>{children}</AbsoluteFill>;
};

const BRoll: React.FC<{ dur: number; srcStart: number; srcEnd: number }> = ({ dur, srcStart, srcEnd }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const enter = easeOut(frame, 0, theme.timing.brollIn * fps);
  const exit = easeIn(frame, dur - 1 - theme.timing.brollOut * fps, dur - 1);
  const kenBurns = interpolate(frame, [0, dur], [1, 1.07], { ...clamp, easing: theme.ease.inOut });
  const scale = interpolate(enter, [0, 1], [1.16, 1]) * kenBurns * interpolate(exit, [0, 1], [1, 1.06]);
  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, 1 - exit), transform: `scale(${scale})`, filter: `blur(${6 * (1 - enter) + 6 * exit}px)` }}>
      <OffthreadVideo src={staticFile("broll.mp4")} muted startFrom={srcStart} playbackRate={(srcEnd - srcStart) / dur}
        style={{ ...fill, filter: "saturate(1.05) contrast(1.04)" }} />
    </AbsoluteFill>
  );
};

/** photo flash: white flash + click, full photo as a tilted print over a blurred copy of itself */
const PhotoFlash: React.FC = () => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const T = theme.photo;
  const enter = spring({ frame, fps, config: theme.spring.snappy });
  const exit = easeIn(frame, PHOTO.dur - 1 - T.out * fps, PHOTO.dur - 1);
  const flash = 1 - easeOut(frame, 0, T.flash * fps);
  const drift = interpolate(frame, [0, PHOTO.dur], [1, 1.04], { ...clamp, easing: theme.ease.inOut });
  const src = staticFile("keon-park-platform.jpg");
  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      <Img src={src} style={{ ...fill, filter: "blur(34px) brightness(0.62) saturate(1.1)", transform: `scale(${1.15 * drift})` }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{
          width: T.width, padding: T.border, background: theme.colors.text, borderRadius: 8,
          boxShadow: `0 30px 70px ${theme.colors.shadow}, 0 6px 16px ${theme.colors.shadow}`,
          transform: `translateY(${T.offsetY}px) rotate(${interpolate(enter, [0, 1], [T.rotate - 3, T.rotate])}deg) scale(${interpolate(enter, [0, 1], [1.18, 1]) * drift * interpolate(exit, [0, 1], [1, 0.96])})`,
        }}>
          <Img src={src} style={{ width: "100%", display: "block", borderRadius: 3 }} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: theme.colors.text, opacity: flash }} />
    </AbsoluteFill>
  );
};

const Watermark: React.FC = () => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const W = theme.watermark;
  const s = spring({ frame: frame - W.delay * fps, fps, config: theme.spring.smooth });
  return (<>
    {/* soft corner shading so the white logo reads over pale sky */}
    <AbsoluteFill style={{ pointerEvents: "none", opacity: s,
      background: `radial-gradient(ellipse 520px 360px at ${W.left + W.width * 0.45}px ${W.top + 50}px, ${W.scrim} 0%, transparent 70%)` }} />
    <Img src={staticFile("logo-white.png")} style={{
      position: "absolute", left: W.left, top: W.top, width: W.width,
      opacity: W.opacity * s, transform: `translateY(${interpolate(s, [0, 1], [-12, 0])}px) scale(${interpolate(s, [0, 1], [0.94, 1])})`,
      transformOrigin: "0 0", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.55)) drop-shadow(0 0 18px rgba(0,0,0,0.25))",
    }} />
  </>);
};

export const Edit: React.FC = () => {
  const frame = useCurrentFrame(); const { fps, durationInFrames } = useVideoConfig();
  const fadeIn = theme.timing.fadeIn * fps, fadeOut = theme.timing.fadeOut * fps, join = theme.timing.audioJoin * fps;
  const black = 1 - ramp(frame, durationInFrames, fadeIn, fadeOut);
  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.black }}>
      <Sequence from={A.from} durationInFrames={lenA}>
        <OffthreadVideo src={staticFile("part1.mp4")} startFrom={A.start} endAt={A.end}
          volume={(f) => ramp(f, lenA, 3, join)} style={fill} />
      </Sequence>
      <Sequence from={B.from} durationInFrames={lenB}>
        <Punch>
          <OffthreadVideo src={staticFile("part2.mp4")} startFrom={B.start} endAt={B.end}
            volume={(f) => ramp(f, lenB, join, fadeOut)} style={fill} />
        </Punch>
      </Sequence>
      <Sequence from={PHOTO.from} durationInFrames={PHOTO.dur}><PhotoFlash /></Sequence>
      <Sequence from={PHOTO.from}><Audio src={staticFile("click.wav")} volume={theme.photo.clickVolume} /></Sequence>
      {BROLLS.map((b) => (
        <Sequence key={b.from} from={b.from} durationInFrames={b.dur}><BRoll {...b} /></Sequence>
      ))}
      {/* subtle vignette above footage, below graphics */}
      <AbsoluteFill style={{ pointerEvents: "none", background: `radial-gradient(ellipse at 50% 45%, transparent 60%, ${theme.colors.vignette} 100%)` }} />
      <Watermark />
      <Captions />
      <AbsoluteFill style={{ backgroundColor: theme.colors.black, opacity: black, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
