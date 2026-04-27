import { AppBar, Toolbar, Box, Typography, IconButton, InputBase, useMediaQuery, useTheme as useMuiTheme, Badge, Menu, MenuItem, Divider } from "@mui/material";
import { Search as SearchIcon, DarkMode as DarkModeIcon, LightMode as LightModeIcon, NotificationsNone as NotificationsNoneIcon } from "@mui/icons-material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useSidebar } from "./DashboardLayout";
import { useTheme } from "../theme/useTheme";
import { CommandPalette } from "../components";
import { useState } from "react";

const drawerWidth = 250;
const drawerWidthCollapsed = 80;

export function Navbar() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { mode, toggleColorMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery("(max-width:767px)");
  const sidebarWidth = isCollapsed ? drawerWidthCollapsed : drawerWidth;
  const currentWidth = isMobile ? 0 : sidebarWidth;

  const dummyNotifications = [
    { id: 1, title: "Reminder", content: "Laporan mingguan belum dikirim." },
    { id: 2, title: "Approval", content: "1 pengajuan cuti menunggu persetujuan." },
    { id: 3, title: "Info", content: "Maintenance sistem dijadwalkan Jumat 21:00." },
  ];

  const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setNotificationAnchor(null);
  };

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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flex: 1, minWidth: 0 }}>
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

          <Box
            onClick={() => setCommandPaletteOpen(true)}
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              backgroundColor: "var(--card)",
              borderRadius: "999px",
              px: 2,
              py: 0.15,
              width: "min(460px, 100%)",
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
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <IconButton
            onClick={handleOpenNotifications}
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
            <Badge color="error" variant="dot" overlap="circular" invisible={dummyNotifications.length === 0}>
              <NotificationsNoneIcon fontSize="small" />
            </Badge>
          </IconButton>

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
        </Box>
      </Toolbar>

      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleCloseNotifications}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 320,
            borderRadius: "10px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--card)",
          },
        }}
      >
        <MenuItem disabled sx={{ opacity: 1 }}>
          <Typography variant="body2" fontWeight={700} sx={{ color: "var(--foreground)" }}>
            Notifications
          </Typography>
        </MenuItem>
        <Divider />
        {dummyNotifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleCloseNotifications} sx={{ alignItems: "flex-start", py: 1.1 }}>
            <Box>
              <Typography variant="body2" fontWeight={600} sx={{ color: "var(--foreground)" }}>
                {notification.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "var(--muted-foreground)", whiteSpace: "normal" }}>
                {notification.content}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>

      <CommandPalette isOpen={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
    </AppBar>
  );
}
