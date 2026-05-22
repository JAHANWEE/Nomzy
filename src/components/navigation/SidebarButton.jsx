import { Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSidebar } from "../../context/SidebarContext";
import { C } from "../../data/homeData";

function MenuIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round">
      <Path d="M3 6h18M3 12h18M3 18h12" />
    </Svg>
  );
}

export default function SidebarButton({ style }) {
  const { openSidebar } = useSidebar();

  return (
    <Pressable style={[styles.button, style]} onPress={openSidebar}>
      <MenuIcon />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
});
