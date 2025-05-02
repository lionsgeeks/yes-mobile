import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../../constants/themes";

export const Cross = ({ size, color, rotate, stroke }) => {
  return (
    <Svg
      width={size ?? 20}
      height={size ?? 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M15.8334 15.8333L4.16675 4.16663"
        stroke={COLORS[color]}
        strokeWidth={stroke ?? 1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.8334 4.16663L4.16675 15.8333"
        stroke={COLORS[color]}
        strokeWidth={stroke ?? 1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
