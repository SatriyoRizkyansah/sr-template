import React from "react";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, IconButton } from "@mui/material";
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
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSidebar } from "./DashboardLayout";

const drawerWidth = 250;
const drawerWidthCollapsed = 80;

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
const systemItems: NavItem[] = [{ title: "Settings", icon: <SettingsIcon />, path: "/settings" }];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const isActive = (path: string) => location.pathname === path;

  const renderNavItem = (item: NavItem) => (
    <ListItemButton
      key={item.title}
      onClick={() => navigate(item.path)}
      sx={{
        borderRadius: 2,
        mb: 0.5,
        py: 1.5,
        px: isCollapsed ? 1.5 : 2,
        transition: "all 0.2s ease",
        backgroundColor: isActive(item.path) ? "var(--accent)" : "transparent",
        color: isActive(item.path) ? "var(--primary)" : "var(--foreground)",
        justifyContent: isCollapsed ? "center" : "flex-start",
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
          justifyContent: "center",
        }}
      >
        {item.icon}
      </ListItemIcon>
      {!isCollapsed && (
        <ListItemText
          primary={item.title}
          sx={{
            "& .MuiListItemText-primary": {
              fontSize: "0.875rem",
              fontWeight: isActive(item.path) ? 600 : 500,
            },
          }}
        />
      )}
    </ListItemButton>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isCollapsed ? drawerWidthCollapsed : drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "var(--muted)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          boxShadow: "none",
          borderRight: "none",
          transition: "width 0.3s ease",
          overflow: "visible",
        },
      }}
    >
      {/* Logo Section */}
      <Box sx={{ p: 3, pb: 2, display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
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
          {!isCollapsed && (
            <Typography variant="h6" fontWeight={600} sx={{ color: "var(--foreground)" }}>
              Flup
            </Typography>
          )}
        </Box>

        {!isCollapsed && (
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{
              color: "var(--foreground)",
              padding: 1,
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "var(--accent)",
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}

        {isCollapsed && (
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{
              position: "absolute",
              right: "-22px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              backgroundColor: "rgba(14, 165, 233, 0.85)",
              width: 28,
              height: 28,
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s ease",
              zIndex: 1300,
              borderRadius: "4px",
              fontSize: "0.875rem",
              "&:hover": {
                backgroundColor: "rgba(14, 165, 233, 1)",
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <ChevronRightIcon sx={{ fontSize: "18px" }} />
          </IconButton>
        )}
      </Box>
      {/* Navigation Content */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 2,
          // Custom scrollbar styling
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
        {/* Marketing Section */}
        {!isCollapsed && (
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
        )}
        <List sx={{ p: 0, mb: 3 }}>{marketingItems.map(renderNavItem)}</List>

        {/* Payments Section */}
        {!isCollapsed && (
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
        )}
        <List sx={{ p: 0, mb: 3 }}>{paymentsItems.map(renderNavItem)}</List>

        {/* System Section */}
        {!isCollapsed && (
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
        )}
        <List sx={{ p: 0 }}>{systemItems.map(renderNavItem)}</List>
      </Box>
      {/* User Profile Section */}
      <Box
        sx={{
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
            justifyContent: isCollapsed ? "center" : "flex-start",
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
          {!isCollapsed && (
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={600} sx={{ color: "var(--foreground)" }}>
                Harper Nelson
              </Typography>
              <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>
                Admin Manager
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
