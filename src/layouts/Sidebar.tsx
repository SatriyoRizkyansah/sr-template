import { Box, Drawer, List, Typography, Avatar, IconButton, useMediaQuery, ListItemButton, ListItemIcon } from "@mui/material";
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, LogoutOutlined } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSidebar } from "./DashboardLayout";
import { SidebarNavItem, sidebarSections, type NavItem } from "./components";

const drawerWidth = 250;
const drawerWidthCollapsed = 80;

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const isMobile = useMediaQuery("(max-width:767px)");
  const sidebarWidth = isCollapsed ? drawerWidthCollapsed : drawerWidth;
  const drawerPaperWidth = isMobile ? drawerWidth : sidebarWidth;

  const isActive = (path: string) => location.pathname === path;

  const renderNavItem = (item: NavItem) => <SidebarNavItem key={item.title} item={item} active={isActive(item.path)} collapsed={isCollapsed} onNavigate={navigate} />;

  const renderSectionHeader = (title: string, abbreviation: string) => (
    <Box
      sx={{
        position: "relative",
        height: 26,
        overflow: "hidden",
        mb: 0.5,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          px: 1.5,
          py: 0.5,
          display: "block",
          color: "var(--muted-foreground)",
          fontWeight: 700,
          fontSize: "0.67rem",
          letterSpacing: "0.12em",
          position: "absolute",
          left: 0,
          opacity: isCollapsed ? 0 : 1,
          transition: "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: isCollapsed ? "none" : "auto",
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="overline"
        sx={{
          px: 1.5,
          py: 0.5,
          display: "block",
          color: "var(--muted-foreground)",
          fontWeight: 700,
          fontSize: "0.67rem",
          letterSpacing: "0.12em",
          textAlign: "center",
          position: "absolute",
          left: 0,
          right: 0,
          opacity: isCollapsed ? 1 : 0,
          transition: "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: isCollapsed ? "auto" : "none",
          textTransform: "uppercase",
        }}
      >
        {abbreviation}
      </Typography>
    </Box>
  );

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? !isCollapsed : true}
      onClose={() => setIsCollapsed(true)}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerPaperWidth,
          boxSizing: "border-box",
          backgroundColor: "var(--muted)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
          borderRight: "1px solid var(--border)",
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "visible",
        },
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          px: 1.5,
          minHeight: 56,
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          backgroundColor: "var(--muted)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0, flex: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary)",
              fontWeight: 800,
              fontSize: "0.9rem",
            }}
          >
            SJ
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isCollapsed ? "0fr" : "1fr",
              transition: "grid-template-columns 0.24s cubic-bezier(0.4, 0, 0.2, 1)",
              minWidth: 0,
            }}
          >
            <Box sx={{ overflow: "hidden" }}>
              <Typography
                variant="body1"
                fontWeight={700}
                sx={{
                  color: "var(--foreground)",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                  opacity: isCollapsed ? 0 : 1,
                  transform: isCollapsed ? "translateX(-8px)" : "translateX(0)",
                  transition: "opacity 0.18s ease, transform 0.24s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Sasmita HRMS
              </Typography>
            </Box>
          </Box>
        </Box>

        {!isCollapsed && (
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{
              color: "var(--foreground)",
              width: 30,
              height: 30,
              borderRadius: "8px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--card)",
              "&:hover": {
                backgroundColor: "var(--accent)",
                borderColor: "var(--primary)",
              },
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}

        {isCollapsed && !isMobile && (
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{
              position: "absolute",
              right: "-16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--foreground)",
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              width: 30,
              height: 30,
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.1)",
              transition: "all 0.3s ease",
              zIndex: 1300,
              borderRadius: "8px",
              "&:hover": {
                borderColor: "var(--primary)",
                backgroundColor: "var(--accent)",
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: "0 6px 14px rgba(15, 23, 42, 0.14)",
              },
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>
      {/* Navigation Content */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 1.25,
          scrollbarWidth: "thin",
          scrollbarColor: "var(--border) transparent",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "var(--border)",
            borderRadius: "3px",
            "&:hover": {
              backgroundColor: "var(--muted-foreground)",
            },
          },
        }}
      >
        {sidebarSections.map((section, index) => (
          <Box key={section.key} sx={{ mb: index === sidebarSections.length - 1 ? 0 : 1.5 }}>
            {renderSectionHeader(section.title, section.abbreviation)}
            <List sx={{ p: 0 }}>{section.items.map(renderNavItem)}</List>
          </Box>
        ))}
      </Box>
      {/* User Profile Section */}
      <Box
        sx={{
          p: 1.25,
          pt: 1,
          borderTop: "1px solid var(--border)",
          backgroundColor: "var(--muted)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.25,
            borderRadius: "10px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--card)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            justifyContent: isCollapsed ? "center" : "flex-start",
            "&:hover": {
              borderColor: "var(--primary)",
              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.08)",
            },
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              backgroundColor: "var(--accent)",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "var(--foreground)",
            }}
          >
            HN
          </Avatar>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isCollapsed ? "0fr" : "1fr",
              transition: "grid-template-columns 0.24s cubic-bezier(0.4, 0, 0.2, 1)",
              flex: 1,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                overflow: "hidden",
                minWidth: 0,
                opacity: isCollapsed ? 0 : 1,
                transform: isCollapsed ? "translateX(-8px)" : "translateX(0)",
                transition: "opacity 0.18s ease, transform 0.24s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Typography variant="body2" fontWeight={600} sx={{ color: "var(--foreground)", whiteSpace: "nowrap" }}>
                Harper Nelson
              </Typography>
              <Typography variant="caption" sx={{ color: "var(--muted-foreground)", whiteSpace: "nowrap" }}>
                Admin Manager
              </Typography>
            </Box>
          </Box>
        </Box>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            mt: 1,
            borderRadius: "10px",
            border: "1px solid var(--border)",
            color: "var(--muted-foreground)",
            px: isCollapsed ? 1 : 1.5,
            py: 1,
            gap: 1,
            justifyContent: isCollapsed ? "center" : "flex-start",
            "&:hover": {
              borderColor: "var(--destructive)",
              backgroundColor: "rgba(220, 38, 38, 0.08)",
              color: "var(--destructive)",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: isCollapsed ? "auto" : 32, color: "inherit", justifyContent: "center" }}>
            <LogoutOutlined fontSize="small" />
          </ListItemIcon>
          {!isCollapsed && (
            <Typography variant="body2" fontWeight={600}>
              Logout
            </Typography>
          )}
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
