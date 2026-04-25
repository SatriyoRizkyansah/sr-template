import React, { createContext, useContext, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

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

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
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
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", backgroundColor: "var(--muted)" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: isMobile ? "100%" : `calc(100% - ${currentWidth}px)`,
            ml: isMobile ? 0 : `${currentWidth}px`,
            height: "100vh",
            overflow: "hidden",
            transition: "margin 0.3s ease, width 0.3s ease",
            backgroundColor: "var(--muted)",
          }}
        >
          <Navbar />
          <Box
            sx={{
              mt: "40px",
              height: "calc(100vh - 56px)",
              overflow: "hidden",
              p: { xs: 0, sm: 2 },
            }}
          >
            <Box
              sx={{
                height: "100%",
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: { xs: 0, sm: "14px" },
                boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {title && (
                <Box
                  sx={{
                    px: { xs: 2, sm: 2.5 },
                    py: 1.5,
                    borderBottom: "1px solid var(--border)",
                    backgroundColor: "var(--card)",
                  }}
                >
                  <Typography variant="body1" sx={{ color: "var(--foreground)", fontWeight: 600 }}>
                    {title}
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  flex: 1,
                  overflow: "auto",
                  overscrollBehavior: "contain",
                  scrollbarWidth: "thin",
                  scrollbarColor: "var(--border) transparent",
                  scrollbarGutter: "stable",
                  "&::-webkit-scrollbar": {
                    width: "10px",
                    height: "10px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "var(--border)",
                    borderRadius: "999px",
                    border: "3px solid transparent",
                    backgroundClip: "content-box",
                    minHeight: "48px",
                    transition: "background-color 0.2s ease",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "var(--muted-foreground)",
                  },
                }}
              >
                {children}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </SidebarContext.Provider>
  );
}
