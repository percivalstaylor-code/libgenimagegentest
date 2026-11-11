import { AbsoluteFill, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "./theme";
import { Captions } from "./Captions";
import data from "./captions.json";

const FPS = 30;
// part1: from 0.30s to its last frame; part2: from 0.533s (drops the repeated "Platform") to 15.55s
const A = { from: 0, start: Math.round(data.aIn * FPS), end: Math.round(data.aIn * FPS) + data.aLen };
const B = { from: data.aLen, start: 16, end: Math.round(data.bOut * FPS) };
const lenA = A.end - A.start, lenB = B.end - B.start;
export const totalFrames = lenA + lenB;
// b-roll covers "...the government stupidly decided to build a train station platform", ending just past the splice
const BROLL = { from: 318, dur: 130, srcFrames: 122 };
// punch-ins on emphasis (timeline seconds of "Utter" and "Vote")
const PUNCH = [{ at: 21.3, scale: 1.06 }, { at: 28.44, scale: 1.11 }];

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ramp = (f: number, len: number, inF: number, outF: number) =>
  Math.min(interpolate(f, [0, inF], [0, 1], { ...clamp, easing: theme.ease.out }),
           interpolate(f, [len - outF, len], [1, 0], { ...clamp, easing: theme.ease.in }));

const Punch: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  let scale = 1;
  for (const p of PUNCH) {
    const s = spring({ frame: frame + B.from - p.at * fps, fps, config: theme.spring.punch });
    scale = interpolate(s, [0, 1], [scale, p.scale]);
  }
  return <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "30% 52%" }}>{children}</AbsoluteFill>;
};

const BRoll: React.FC = () => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const inF = theme.timing.brollIn * fps, outF = theme.timing.brollOut * fps;
  const enter = spring({ frame, fps, config: theme.spring.smooth, durationInFrames: inF });
  const exit = interpolate(frame, [BROLL.dur - outF, BROLL.dur], [0, 1], { ...clamp, easing: theme.ease.in });
  const kenBurns = interpolate(frame, [0, BROLL.dur], [1, 1.07], { ...clamp, easing: theme.ease.inOut });
  const scale = interpolate(enter, [0, 1], [1.18, 1]) * kenBurns * interpolate(exit, [0, 1], [1, 1.06]);
  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, 1 - exit), transform: `scale(${scale})`, }}>
      <OffthreadVideo src={staticFile("broll.mp4")} muted playbackRate={BROLL.srcFrames / BROLL.dur}
        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(1.05) contrast(1.04)" }} />
    </AbsoluteFill>
  );
};

export const Edit: React.FC = () => {
  const frame = useCurrentFrame(); const { fps, durationInFrames } = useVideoConfig();
  const fadeIn = theme.timing.fadeIn * fps, fadeOut = theme.timing.fadeOut * fps, join = theme.timing.audioJoin * fps;
  const black = 1 - ramp(frame, durationInFrames, fadeIn, fadeOut);
  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.black }}>
      <Sequence from={A.from} durationInFrames={lenA}>
        <OffthreadVideo src={staticFile("part1.mp4")} startFrom={A.start} endAt={A.end}
          volume={(f) => ramp(f, lenA, 3, join)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Sequence>
      <Sequence from={B.from} durationInFrames={lenB}>
        <Punch>
          <OffthreadVideo src={staticFile("part2.mp4")} startFrom={B.start} endAt={B.end}
            volume={(f) => ramp(f, lenB, join, fadeOut)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Punch>
      </Sequence>
      <Sequence from={BROLL.from} durationInFrames={BROLL.dur}><BRoll /></Sequence>
      {/* subtle vignette above footage, below captions */}
      <AbsoluteFill style={{ pointerEvents: "none", background: `radial-gradient(ellipse at 50% 45%, transparent 60%, ${theme.colors.vignette} 100%)` }} />
      <Captions />
      <AbsoluteFill style={{ backgroundColor: theme.colors.black, opacity: black, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
