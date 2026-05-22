import { createContext, useCallback, useContext, useState } from "react";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [visible, setVisible] = useState(false);

  const openSidebar  = useCallback(() => setVisible(true),  []);
  const closeSidebar = useCallback(() => setVisible(false), []);

  return (
    <SidebarContext.Provider value={{ visible, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
