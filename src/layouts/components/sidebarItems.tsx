import React from "react";
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
} from "@mui/icons-material";

export interface NavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

export const marketingItems: NavItem[] = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { title: "Marketplace", icon: <MarketplaceIcon />, path: "/marketplace" },
  { title: "Orders", icon: <OrdersIcon />, path: "/orders" },
  { title: "Tracking", icon: <TrackingIcon />, path: "/tracking" },
  { title: "Customers", icon: <CustomersIcon />, path: "/customers" },
  { title: "Discounts", icon: <DiscountsIcon />, path: "/discounts" },
];

export const paymentsItems: NavItem[] = [
  { title: "Ledger", icon: <LedgerIcon />, path: "/ledger" },
  { title: "Taxes", icon: <TaxesIcon />, path: "/taxes" },
];

export const systemItems: NavItem[] = [{ title: "Settings", icon: <SettingsIcon />, path: "/settings" }];
