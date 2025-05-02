import Svg, { Path, Defs, Rect, ClipPath, G } from "react-native-svg";
import { COLORS } from "../../constants/themes";

export const ArrowSquare = ({ size, color }) => {
  return (
    <Svg
      width={size ?? 25}
      height={size ?? 24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#arrow-square-clip)">
        <Path
          d="M16.2526 16.6744C15.8774 20.4559 13.6379 22 8.73526 22L8.5779 22C3.16684 22 1 20.1197 1 15.4244L1 8.57563C1 3.88025 3.16684 2 8.57789 2L8.73526 2C13.6016 2 15.8411 3.52311 16.2405 7.24159M9.5 12L22.6442 12.0105M19.9447 15.5294L24 12.0105L19.9447 8.49159"
          stroke={COLORS[color] ?? COLORS.primary + "3f"}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="arrow-square-clip">
          <Rect width={25} height={24} fill="white" transform="translate(25 24) rotate(180)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
