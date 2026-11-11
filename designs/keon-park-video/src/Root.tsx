import { Composition, staticFile } from "remotion";

const font = new FontFace("InterXB", `url(${staticFile("Inter-ExtraBold.otf")})`);
font.load().then((f) => document.fonts.add(f));
import { Edit, totalFrames } from "./Edit";

export const RemotionRoot: React.FC = () => (
  <Composition id="KeonPark" component={Edit} durationInFrames={totalFrames} fps={30} width={1080} height={1920} />
);
