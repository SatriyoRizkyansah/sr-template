import React from "react";
import { Box, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import type { NavItem } from "./sidebarItems";

interface SidebarNavItemProps {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onNavigate: (path: string) => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, active, collapsed, onNavigate }) => {
  const showBadge = item.badge !== undefined && item.badge !== null;

  return (
    <ListItemButton
      key={item.title}
      onClick={() => onNavigate(item.path)}
      sx={{
        borderRadius: 1.5,
        mb: 0.5,
        py: 1,
        px: collapsed ? 1 : 1.5,
        transition: "all 0.2s ease",
        backgroundColor: active ? "var(--card)" : "transparent",
        border: active ? "1px solid var(--border)" : "1px solid transparent",
        color: active ? "var(--foreground)" : "var(--muted-foreground)",
        justifyContent: collapsed ? "center" : "flex-start",
        boxShadow: active ? "0 2px 8px rgba(15, 23, 42, 0.08)" : "none",
        "&:hover": {
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
          color: "var(--foreground)",
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: collapsed ? "auto" : 36,
          color: "inherit",
          justifyContent: "flex-start",
          flex: "0 0 auto",
          mr: collapsed ? 0 : 1,
        }}
      >
        {item.icon}
      </ListItemIcon>

      {!collapsed && (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: active ? 600 : 500,
              color: "inherit",
              transition: "color 0.2s ease",
            }}
          >
            {item.title}
          </Typography>
          {showBadge && (
            <Box
              component="span"
              sx={{
                minWidth: 24,
                px: 0.75,
                py: 0.25,
                borderRadius: 9999,
                fontSize: "0.7rem",
                fontWeight: 600,
                textAlign: "center",
                backgroundColor: active ? "rgba(2, 132, 199, 0.15)" : "var(--muted)",
                color: active ? "var(--primary)" : "var(--muted-foreground)",
              }}
            >
              {item.badge}
            </Box>
          )}
        </Box>
      )}
    </ListItemButton>
  );
};

export default SidebarNavItem;
