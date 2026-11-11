// theme.ts — single source of truth. Never inline colours, easings or springs in components.
import { Easing } from "remotion";

export const theme = {
  colors: {
    hero: "#0a62b3",        // Liberal blue — active-word pill, the one hero colour
    text: "#ffffff",
    outline: "rgba(6, 18, 40, 0.92)",
    shadow: "rgba(0, 0, 0, 0.45)",
    black: "#000000",
    vignette: "rgba(0, 0, 0, 0.28)",
  },
  fonts: { caption: "InterXB" },
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: { damping: 14, stiffness: 160, mass: 0.6 },
    smooth: { damping: 20, stiffness: 90, mass: 1 },
    punch: { damping: 18, stiffness: 260, mass: 0.5 },
  },
  timing: {
    fadeIn: 0.2,        // s, open from black
    fadeOut: 0.4,       // s, close to black (video + audio)
    audioJoin: 0.1,     // s, tiny audio ramps at the splice to avoid clicks
    brollIn: 0.27,      // s, b-roll entrance
    brollOut: 0.3,      // s, b-roll exit (faster than entrance)
  },
  caption: { size: 86, centerY: 0.73, maxWidth: 940, stagger: 3 },
} as const;
