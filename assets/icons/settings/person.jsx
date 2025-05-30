import Svg, { Path, Circle } from "react-native-svg";

export const Person = ({ color, size, width, height, active }) => {
  return (
    <Svg
      fill={color ?? "#002d55"}
      width={width ?? size ?? 24}
      height={height ?? size ?? 24}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <Path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
      <Path d="M12 13a7 7 0 0 0-7 7 1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7z" />
    </Svg>
  );
};
