import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type { NavItem } from "./sidebarItems";

interface SidebarNavItemProps {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onNavigate: (path: string) => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, active, collapsed, onNavigate }) => {
  return (
    <ListItemButton
      key={item.title}
      onClick={() => onNavigate(item.path)}
      sx={{
        borderRadius: 1.5,
        mb: 0.25,
        py: 1,
        px: 1.75,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        backgroundColor: active ? "var(--accent)" : "transparent",
        color: active ? "var(--primary)" : "var(--foreground)",
        justifyContent: "flex-start",
        overflow: "hidden",
        "&:hover": {
          backgroundColor: "var(--accent)",
          color: "var(--primary)",
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 36,
          color: "inherit",
          opacity: active ? 1 : 0.7,
          justifyContent: "flex-start",
          flex: "0 0 auto",
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.title}
        sx={{
          ml: collapsed ? 0 : 1,
          flex: collapsed ? "0 0 auto" : "1 1 auto",
          minWidth: 0,
          maxWidth: collapsed ? 0 : 200,
          opacity: collapsed ? 0 : 1,
          overflow: "hidden",
          transition: "max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, margin 0.3s ease",
          whiteSpace: "nowrap",
          pointerEvents: collapsed ? "none" : "auto",
          "& .MuiListItemText-primary": {
            fontSize: "0.875rem",
            fontWeight: active ? 600 : 500,
          },
        }}
      />
    </ListItemButton>
  );
};

export default SidebarNavItem;
