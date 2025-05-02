import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../constants/themes";
import { useAppContext } from "@/context";

export const Arrow = ({ size = 14, color = "primary", rotate = 0, stroke = 2.75 }) => {
  const {darkMode } = useAppContext()
  return (
    <Svg
      rotation={rotate}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12.9167 15.8333L7.08335 9.99996L12.9167 4.16663"
        stroke={darkMode?"white":"black"}
        strokeWidth={stroke}
      />
    </Svg>
  );
};
