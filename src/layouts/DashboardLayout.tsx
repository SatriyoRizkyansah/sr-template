import React, { createContext, useContext, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const drawerWidth = 250;
const drawerWidthCollapsed = 80;

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar-collapsed");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const updateCollapsed = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
    }
  };

  // Desktop: collapsed = 80px, Desktop: expanded = 250px
  // Mobile: collapsed = 0px, Mobile: expanded = 250px
  const isMobile = useMediaQuery("(max-width:767px)");
  const sidebarWidth = isCollapsed ? drawerWidthCollapsed : drawerWidth;
  const currentWidth = isMobile ? 0 : sidebarWidth;

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed: updateCollapsed }}>
      <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--background)" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: isMobile ? "100%" : `calc(100% - ${currentWidth}px)`,
            ml: isMobile ? 0 : `${currentWidth}px`,
            minHeight: "100vh",
            transition: "margin 0.3s ease, width 0.3s ease",
          }}
        >
          <Navbar title={title} />
          <Box
            sx={{
              mt: "64px",
              minHeight: "calc(100vh - 64px)",
              overflow: "auto",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </SidebarContext.Provider>
  );
};

export default DashboardLayout;
