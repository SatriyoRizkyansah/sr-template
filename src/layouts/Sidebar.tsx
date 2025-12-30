import React from "react";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, IconButton, useMediaQuery } from "@mui/material";
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
  const isMobile = useMediaQuery("(max-width:767px)");
  const sidebarWidth = isCollapsed ? drawerWidthCollapsed : drawerWidth;
  const drawerPaperWidth = isMobile ? drawerWidth : sidebarWidth;

  const isActive = (path: string) => location.pathname === path;

  const renderNavItem = (item: NavItem) => (
    <ListItemButton
      key={item.title}
      onClick={() => navigate(item.path)}
      sx={{
        borderRadius: 1.5,
        mb: 0.25,
        py: 1,
        px: 1.75,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        backgroundColor: isActive(item.path) ? "var(--accent)" : "transparent",
        color: isActive(item.path) ? "var(--primary)" : "var(--foreground)",
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
          opacity: isActive(item.path) ? 1 : 0.7,
          justifyContent: "flex-start",
          flex: "0 0 auto",
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.title}
        sx={{
          ml: isCollapsed ? 0 : 1,
          flex: isCollapsed ? "0 0 auto" : "1 1 auto",
          minWidth: 0,
          maxWidth: isCollapsed ? 0 : 200,
          opacity: isCollapsed ? 0 : 1,
          overflow: "hidden",
          transition: "max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, margin 0.3s ease",
          whiteSpace: "nowrap",
          pointerEvents: isCollapsed ? "none" : "auto",
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
          boxShadow: "none",
          borderRight: "none",
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "visible",
        },
      }}
    >
      {/* Logo Section */}
      <Box sx={{ p: 2, pb: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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

        {isCollapsed && !isMobile && (
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
          p: 1.5,
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
        <Box
          sx={{
            position: "relative",
            height: "32px",
            overflow: "hidden",
          }}
        >
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
              position: "absolute",
              left: 0,
              opacity: isCollapsed ? 0 : 1,
              transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: isCollapsed ? "none" : "auto",
            }}
          >
            Marketing
          </Typography>
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
              textAlign: "center",
              position: "absolute",
              left: 0,
              right: 0,
              opacity: isCollapsed ? 1 : 0,
              transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: isCollapsed ? "auto" : "none",
            }}
          >
            M
          </Typography>
        </Box>
        <List sx={{ p: 0, mb: 2 }}>{marketingItems.map(renderNavItem)}</List>

        {/* Payments Section */}
        <Box
          sx={{
            position: "relative",
            height: "30px",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              px: 2,
              py: 0.75,
              display: "block",
              color: "var(--muted-foreground)",
              fontWeight: 600,
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              position: "absolute",
              left: 0,
              opacity: isCollapsed ? 0 : 1,
              transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: isCollapsed ? "none" : "auto",
            }}
          >
            Payments
          </Typography>
          <Typography
            variant="overline"
            sx={{
              px: 2,
              py: 0.75,
              display: "block",
              color: "var(--muted-foreground)",
              fontWeight: 600,
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textAlign: "center",
              position: "absolute",
              left: 0,
              right: 0,
              opacity: isCollapsed ? 1 : 0,
              transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: isCollapsed ? "auto" : "none",
            }}
          >
            P
          </Typography>
        </Box>
        <List sx={{ p: 0, mb: 2 }}>{paymentsItems.map(renderNavItem)}</List>

        {/* System Section */}
        <Box
          sx={{
            position: "relative",
            height: "30px",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              px: 2,
              py: 0.75,
              display: "block",
              color: "var(--muted-foreground)",
              fontWeight: 600,
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              position: "absolute",
              left: 0,
              opacity: isCollapsed ? 0 : 1,
              transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: isCollapsed ? "none" : "auto",
            }}
          >
            System
          </Typography>
          <Typography
            variant="overline"
            sx={{
              px: 2,
              py: 0.75,
              display: "block",
              color: "var(--muted-foreground)",
              fontWeight: 600,
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textAlign: "center",
              position: "absolute",
              left: 0,
              right: 0,
              opacity: isCollapsed ? 1 : 0,
              transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: isCollapsed ? "auto" : "none",
            }}
          >
            S
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>{systemItems.map(renderNavItem)}</List>
      </Box>
      {/* User Profile Section */}
      <Box
        sx={{
          p: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.5,
            borderRadius: 1.5,
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
