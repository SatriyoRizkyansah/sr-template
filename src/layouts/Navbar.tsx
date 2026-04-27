import { AppBar, Toolbar, Box, Typography, IconButton, InputBase, useMediaQuery, useTheme as useMuiTheme } from "@mui/material";
import { Search as SearchIcon, DarkMode as DarkModeIcon, LightMode as LightModeIcon } from "@mui/icons-material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useSidebar } from "./DashboardLayout";
import { useTheme } from "../theme/useTheme";
import { CommandPalette } from "../components";
import { useState } from "react";

const drawerWidth = 250;
const drawerWidthCollapsed = 80;

export function Navbar() {
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { mode, toggleColorMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery("(max-width:767px)");
  const sidebarWidth = isCollapsed ? drawerWidthCollapsed : drawerWidth;
  const currentWidth = isMobile ? 0 : sidebarWidth;

  // const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        width: isMobile ? "100%" : `calc(100% - ${currentWidth}px)`,
        ml: isMobile ? 0 : `${currentWidth}px`,
        backgroundColor: "var(--muted)",
        backgroundImage: "none",
        color: "var(--foreground)",
        top: 0,
        transition: "margin 0.3s ease, width 0.3s ease",
        // borderBottom: "1px solid var(--border)",
        height: 56,
      }}
    >
      <Toolbar
        sx={{
          minHeight: "56px !important",
          px: { xs: 2, sm: 3 },
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{ justifySelf: "start" }}>
          {isMobile ? (
            <IconButton
              onClick={() => setIsCollapsed(!isCollapsed)}
              sx={{
                color: "var(--foreground)",
                backgroundColor: "var(--muted)",
                border: "1px solid var(--border)",
                width: 32,
                height: 32,
                borderRadius: "var(--radius)",
                transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: "var(--accent)",
                  borderColor: "var(--primary)",
                },
              }}
            >
              <MenuOutlinedIcon fontSize="small" />
            </IconButton>
          ) : null}
        </Box>
        <Box
          onClick={() => setCommandPaletteOpen(true)}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "var(--card)",
            borderRadius: "999px",
            px: 2,
            py: 0.15,
            width: "100%",
            maxWidth: 520,
            border: `1px solid ${muiTheme.palette.divider}`,
            transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
            gap: 1,
            justifySelf: "center",
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
              fontSize: "0.8rem",
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, justifySelf: "end" }}>
          <IconButton
            onClick={toggleColorMode}
            sx={{
              color: "var(--foreground)",
              backgroundColor: "var(--muted)",
              border: "1px solid var(--border)",
              width: 32,
              height: 32,
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

          {/* <Avatar
            onClick={handleMenuOpen}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: muiTheme.palette.primary.main,
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--primary-foreground)",
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
                  backgroundColor: "var(--card)",
                  color: "var(--card-foreground)",
                  boxShadow: "var(--shadow-lg)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  minWidth: 220,
                  overflow: "hidden",
                },
              },
            }}
          >
            <MenuItem
              disabled
              sx={{
                color: "var(--foreground)",
                py: 1.5,
                "&.Mui-disabled": {
                  opacity: 1,
                  backgroundColor: "var(--card)",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  mr: 1.5,
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                HN
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  Harper Nelson
                </Typography>
                <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>
                  harper@example.com
                </Typography>
              </Box>
            </MenuItem>
          </Menu> */}
        </Box>
      </Toolbar>
      <CommandPalette isOpen={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
    </AppBar>
  );
}
