import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../../constants/themes";

export const Bell = ({ height, width, size, active, color = "dark" }) => {
  return (
    <Svg
      height={height ?? size ?? 26}
      width={width ?? size ?? 26}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99996 16.873C14.6993 16.873 16.8733 16.2701 17.0833 13.8504C17.0833 11.4323 15.5676 11.5878 15.5676 8.62089C15.5676 6.30341 13.371 3.66663 9.99996 3.66663C6.62894 3.66663 4.43233 6.30341 4.43233 8.62089C4.43233 11.5878 2.91663 11.4323 2.91663 13.8504C3.12742 16.2793 5.30144 16.873 9.99996 16.873Z"
        stroke={COLORS[color]}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9906 19.381C10.8539 20.6432 9.08052 20.6582 7.93286 19.381"
        stroke={COLORS[color]}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {active ? (
        <Path
          d="M17.0001 4C17.0001 5.65685 15.657 7 14.0001 7C12.3433 7 11.0001 5.65685 11.0001 4C11.0001 2.34315 12.3433 1 14.0001 1C15.657 1 17.0001 2.34315 17.0001 4Z"
          fill={COLORS.primary}
          stroke={color == "white" ? COLORS.black : COLORS.white}
        />
      ) : null}
    </Svg>
  );
};
