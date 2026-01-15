import React, { useState } from "react";
import { AppBar, Toolbar, Box, Typography, IconButton, InputBase, Avatar, Menu, MenuItem, useMediaQuery, useTheme as useMuiTheme } from "@mui/material";
import { Search as SearchIcon, DarkMode as DarkModeIcon, LightMode as LightModeIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import { useSidebar } from "./DashboardLayout";
import { useTheme } from "../theme/useTheme";
import CommandPalette from "../components/CommandPalette";

const drawerWidth = 250;
const drawerWidthCollapsed = 80;

interface NavbarProps {
  title?: string;
}

const Navbar: React.FC<NavbarProps> = ({ title = "Dashboard" }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { mode, toggleColorMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery("(max-width:767px)");
  const sidebarWidth = isCollapsed ? drawerWidthCollapsed : drawerWidth;
  const currentWidth = isMobile ? 0 : sidebarWidth;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        width: isMobile ? "100%" : `calc(100% - ${currentWidth}px)`,
        ml: isMobile ? 0 : `${currentWidth}px`,
        backgroundColor: "var(--background)",
        backgroundImage: "none",
        color: "var(--foreground)",
        top: 0,
        transition: "margin 0.3s ease, width 0.3s ease",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: "64px !important", px: 3, pl: isCollapsed ? { xs: 3, sm: 5 } : 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{
              display: { xs: "flex", md: "none" },
              color: muiTheme.palette.text.primary,
              backgroundColor: muiTheme.palette.action.hover,
              border: `1px solid ${muiTheme.palette.divider}`,
              borderRadius: muiTheme.shape.borderRadius,
              width: 40,
              height: 40,
              transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                backgroundColor: muiTheme.palette.action.selected,
                borderColor: muiTheme.palette.primary.main,
              },
            }}
          >
            {isCollapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
          </IconButton>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              color: "var(--foreground)",
              fontSize: "1.5rem",
              letterSpacing: "-0.025em",
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            onClick={() => setCommandPaletteOpen(true)}
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              backgroundColor: muiTheme.palette.action.hover,
              borderRadius: muiTheme.shape.borderRadius,
              px: 2,
              py: 0.45,
              mr: 0,
              minWidth: 220,
              border: `1px solid ${muiTheme.palette.divider}`,
              transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              gap: 1,
              "&:hover": {
                borderColor: muiTheme.palette.primary.main,
                backgroundColor: muiTheme.palette.action.selected,
              },
            }}
          >
            <SearchIcon sx={{ color: muiTheme.palette.text.secondary, fontSize: "14px" }} />
            <InputBase
              placeholder="Search... (Cmd+K)"
              sx={{
                flex: 1,
                color: muiTheme.palette.text.primary,
                fontSize: "0.65rem",
                pointerEvents: "none",
                "& input::placeholder": {
                  color: muiTheme.palette.text.secondary,
                  opacity: 1,
                },
              }}
              readOnly
            />
            <Typography
              sx={{
                fontSize: "0.7rem",
                color: muiTheme.palette.text.secondary,
                fontWeight: 500,
              }}
            >
              ⌘K
            </Typography>
          </Box>

          <IconButton
            onClick={toggleColorMode}
            sx={{
              color: "var(--foreground)",
              backgroundColor: "var(--muted)",
              border: "1px solid var(--border)",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "var(--radius)",
              transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                backgroundColor: "var(--accent)",
                borderColor: "var(--primary)",
              },
            }}
          >
            {mode === "dark" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </IconButton>

          <Avatar
            onClick={handleMenuOpen}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: muiTheme.palette.primary.main,
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              border: `2px solid ${muiTheme.palette.divider}`,
              transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                borderColor: muiTheme.palette.primary.main,
                transform: "scale(1.05)",
                boxShadow: muiTheme.shadows[6],
              },
            }}
          >
            HN
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            slotProps={{
              paper: {
                sx: {
                  mt: 1.5,
                  boxShadow: muiTheme.shadows[9],
                  border: `1px solid ${muiTheme.palette.divider}`,
                  borderRadius: muiTheme.shape.borderRadius,
                  minWidth: 200,
                },
              },
            }}
          >
            <MenuItem
              disabled
              sx={{
                color: muiTheme.palette.text.primary,
                py: 1.5,
                "&.Mui-disabled": {
                  opacity: 1,
                },
              }}
            >
              <Avatar sx={{ width: 28, height: 28, mr: 1.5, backgroundColor: muiTheme.palette.primary.main }}>HN</Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  Harper Nelson
                </Typography>
                <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary }}>
                  harper@example.com
                </Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      <CommandPalette isOpen={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
    </AppBar>
  );
};

export default Navbar;
