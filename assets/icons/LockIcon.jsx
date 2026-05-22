import Svg, { Circle, Path, Rect } from "react-native-svg";

/**
 * Lucide-style lock icon.
 * @param {{ size?: number, color?: string, strokeWidth?: number }} props
 */
export default function LockIcon({ size = 20, color = "#A69385", strokeWidth = 1.6 }) {
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
      {/* Shackle */}
      <Path d="M8 11V7a4 4 0 0 1 8 0v4" />
      {/* Lock body */}
      <Rect x="3" y="11" width="18" height="11" rx="2" />
      {/* Keyhole dot */}
      <Circle cx="12" cy="16" r="1" fill={color} stroke="none" />
    </Svg>
  );
}
