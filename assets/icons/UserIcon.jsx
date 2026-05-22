import Svg, { Circle, Path } from "react-native-svg";

/**
 * Lucide-style user icon.
 * @param {{ size?: number, color?: string, strokeWidth?: number }} props
 */
export default function UserIcon({ size = 20, color = "#A69385", strokeWidth = 1.6 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head */}
      <Circle cx="12" cy="8" r="4" />
      {/* Shoulders */}
      <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </Svg>
  );
}
