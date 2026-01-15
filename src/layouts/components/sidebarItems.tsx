import React from "react";
import {
  DashboardOutlined as DashboardIcon,
  ShoppingCartOutlined as MarketplaceIcon,
  AssignmentOutlined as OrdersIcon,
  TrendingUpOutlined as TrackingIcon,
  PeopleOutline as CustomersIcon,
  LocalOfferOutlined as DiscountsIcon,
  ReceiptLongOutlined as LedgerIcon,
  AccountBalanceOutlined as TaxesIcon,
  SettingsOutlined as SettingsIcon,
} from "@mui/icons-material";

export interface NavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  badge?: number | string;
}

export const marketingItems: NavItem[] = [
  { title: "Dashboard", icon: <DashboardIcon fontSize="small" />, path: "/dashboard" },
  { title: "Marketplace", icon: <MarketplaceIcon fontSize="small" />, path: "/marketplace" },
  { title: "Orders", icon: <OrdersIcon fontSize="small" />, path: "/orders", badge: 12 },
  { title: "Tracking", icon: <TrackingIcon fontSize="small" />, path: "/tracking" },
  { title: "Customers", icon: <CustomersIcon fontSize="small" />, path: "/customers" },
  { title: "Discounts", icon: <DiscountsIcon fontSize="small" />, path: "/discounts" },
];

export const paymentsItems: NavItem[] = [
  { title: "Ledger", icon: <LedgerIcon fontSize="small" />, path: "/ledger" },
  { title: "Taxes", icon: <TaxesIcon fontSize="small" />, path: "/taxes" },
];

export const systemItems: NavItem[] = [{ title: "Settings", icon: <SettingsIcon fontSize="small" />, path: "/settings" }];

export const sidebarSections = [
  { key: "marketing", title: "Marketing", abbreviation: "M", items: marketingItems },
  { key: "payments", title: "Payments", abbreviation: "P", items: paymentsItems },
  { key: "system", title: "System", abbreviation: "S", items: systemItems },
];
