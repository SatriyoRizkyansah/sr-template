import React from "react";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ShoppingCart as MarketplaceIcon,
  Assignment as OrdersIcon,
  TrendingUp as TrackingIcon,
  People as CustomersIcon,
  LocalOffer as DiscountsIcon,
  Receipt as LedgerIcon,
  AccountBalance as TaxesIcon,
  Settings as SettingsIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 280;

interface NavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

// Main marketing items
const marketingItems: NavItem[] = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { title: "Marketplace", icon: <MarketplaceIcon />, path: "/marketplace" },
  { title: "Orders", icon: <OrdersIcon />, path: "/orders" },
  { title: "Tracking", icon: <TrackingIcon />, path: "/tracking" },
  { title: "Customers", icon: <CustomersIcon />, path: "/customers" },
  { title: "Discounts", icon: <DiscountsIcon />, path: "/discounts" },
];

// Payments section
const paymentsItems: NavItem[] = [
  { title: "Ledger", icon: <LedgerIcon />, path: "/ledger" },
  { title: "Taxes", icon: <TaxesIcon />, path: "/taxes" },
];

// System section
const systemItems: NavItem[] = [
  { title: "Settings", icon: <SettingsIcon />, path: "/settings" },
  { title: "Dark mode", icon: <DarkModeIcon />, path: "/dark-mode" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const renderNavItem = (item: NavItem) => (
    <ListItemButton
      key={item.title}
      onClick={() => navigate(item.path)}
      sx={{
        borderRadius: 2,
        mb: 0.5,
        py: 1.5,
        px: 2,
        transition: "all 0.2s ease",
        backgroundColor: isActive(item.path) ? "var(--accent)" : "transparent",
        color: isActive(item.path) ? "var(--primary)" : "var(--foreground)",
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
          opacity: isActive(item.path) ? 1 : 0.7,
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.title}
        sx={{
          "& .MuiListItemText-primary": {
            fontSize: "0.875rem",
            fontWeight: isActive(item.path) ? 600 : 500,
          },
        }}
      />
    </ListItemButton>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "var(--card)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          height: "100vh",
        },
      }}
    >
      {/* Logo Section */}
      <Box sx={{ p: 3, pb: 2, borderBottom: "1px solid var(--border)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "var(--primary)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: "1.125rem",
            }}
          >
            F
          </Box>
          <Typography variant="h6" fontWeight={600} sx={{ color: "var(--foreground)" }}>
            Flup
          </Typography>
        </Box>
      </Box>

      {/* Navigation Content */}
      <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
        {/* Marketing Section */}
        <Typography
          variant="overline"
          sx={{
            px: 2,
            py: 1,
            display: "block",
            color: "var(--muted-foreground)",
            fontWeight: 600,
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
          }}
        >
          Marketing
        </Typography>
        <List sx={{ p: 0, mb: 3 }}>{marketingItems.map(renderNavItem)}</List>

        {/* Payments Section */}
        <Typography
          variant="overline"
          sx={{
            px: 2,
            py: 1,
            display: "block",
            color: "var(--muted-foreground)",
            fontWeight: 600,
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
          }}
        >
          Payments
        </Typography>
        <List sx={{ p: 0, mb: 3 }}>{paymentsItems.map(renderNavItem)}</List>

        {/* System Section */}
        <Typography
          variant="overline"
          sx={{
            px: 2,
            py: 1,
            display: "block",
            color: "var(--muted-foreground)",
            fontWeight: 600,
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
          }}
        >
          System
        </Typography>
        <List sx={{ p: 0 }}>{systemItems.map(renderNavItem)}</List>
      </Box>

      {/* User Profile Section */}
      <Box
        sx={{
          borderTop: "1px solid var(--border)",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            borderRadius: 2,
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "var(--accent)",
            },
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              backgroundColor: "var(--primary)",
              fontSize: "0.875rem",
            }}
          >
            HN
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} sx={{ color: "var(--foreground)" }}>
              Harper Nelson
            </Typography>
            <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>
              Admin Manager
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
