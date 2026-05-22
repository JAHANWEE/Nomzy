import Svg, { Path, Rect } from "react-native-svg";

export default function MailIcon({ size = 20, color = "#A69385", strokeWidth = 1.6 }) {
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
      <Rect x="2" y="4" width="20" height="16" rx="2" />
      <Path d="M2 7l10 7 10-7" />
    </Svg>
  );
}
