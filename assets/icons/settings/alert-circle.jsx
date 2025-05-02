import Svg, { Path, Circle } from "react-native-svg";

export const AlertCircle = ({ color, size, width, height, active }) => {
  return (
    <Svg
      fill={color ?? "#002d55"}
      width={width ?? size ?? 24}
      height={height ?? size ?? 24}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <Path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      <Circle cx="12" cy="16" r="1" />
      <Path d="M12 7a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1z" />
    </Svg>
  );
};
