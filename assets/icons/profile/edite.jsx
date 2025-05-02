import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../../constants/themes";

export const Edite = ({ size = 24, color = "dark" }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[
        "M11.4562 17.0358H17.5",
        "M10.65 3.16233C11.2964 2.38982 12.4583 2.27655 13.2469 2.90978C13.2905 2.94413 14.6912 4.03232 14.6912 4.03232C15.5575 4.55599 15.8266 5.66925 15.2912 6.51882C15.2627 6.56432 7.34329 16.4704 7.34329 16.4704C7.07981 16.7991 6.67986 16.9931 6.25242 16.9978L3.21961 17.0358L2.53628 14.1436C2.44055 13.7369 2.53628 13.3098 2.79975 12.9811L10.65 3.16233Z",
        "M9.18402 5.00073L13.7276 8.49",
      ].map((draw, index) => (
        <Path
          key={index}
          d={draw}
          stroke={COLORS[color]}
          strokeOpacity={0.75}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...(index === 1 ? { fillRule: "evenodd", clipRule: "evenodd" } : {})}
        />
      ))}
    </Svg>
  );
};
