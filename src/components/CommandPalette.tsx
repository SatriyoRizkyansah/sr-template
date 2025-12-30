import React from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../theme/useTheme";
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
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import "./CommandPalette.css";

interface CommandPaletteProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen: externalOpen, onOpenChange }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useTheme();

  const currentOpen = externalOpen !== undefined ? externalOpen : open;
  const setCurrentOpen = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  // Keyboard shortcut Cmd+K / Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCurrentOpen(!currentOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setCurrentOpen(false);
  };

  return (
    <Command.Dialog open={currentOpen} onOpenChange={setCurrentOpen}>
      <div className="cmdk-wrapper">
        <Command.Input placeholder="Search pages, actions... (Cmd+K)" className="cmdk-input" />
        <Command.List className="cmdk-list">
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="Pages" className="cmdk-group">
            <Command.Item onSelect={() => handleNavigation("/dashboard")} keywords={["home", "dashboard", "overview"]} value="dashboard" className="cmdk-item">
              <DashboardIcon className="cmdk-icon" />
              Dashboard
            </Command.Item>
            <Command.Item onSelect={() => handleNavigation("/marketplace")} keywords={["shop", "marketplace", "store"]} value="marketplace" className="cmdk-item">
              <MarketplaceIcon className="cmdk-icon" />
              Marketplace
            </Command.Item>
            <Command.Item onSelect={() => handleNavigation("/orders")} keywords={["order", "orders", "purchases"]} value="orders" className="cmdk-item">
              <OrdersIcon className="cmdk-icon" />
              Orders
            </Command.Item>
            <Command.Item onSelect={() => handleNavigation("/tracking")} keywords={["track", "tracking", "shipment"]} value="tracking" className="cmdk-item">
              <TrackingIcon className="cmdk-icon" />
              Tracking
            </Command.Item>
            <Command.Item onSelect={() => handleNavigation("/customers")} keywords={["customer", "customers", "users", "people"]} value="customers" className="cmdk-item">
              <CustomersIcon className="cmdk-icon" />
              Customers
            </Command.Item>
            <Command.Item onSelect={() => handleNavigation("/discounts")} keywords={["discount", "discounts", "promo", "offer"]} value="discounts" className="cmdk-item">
              <DiscountsIcon className="cmdk-icon" />
              Discounts
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Finance" className="cmdk-group">
            <Command.Item onSelect={() => handleNavigation("/ledger")} keywords={["ledger", "accounting", "books"]} value="ledger" className="cmdk-item">
              <LedgerIcon className="cmdk-icon" />
              Ledger
            </Command.Item>
            <Command.Item onSelect={() => handleNavigation("/taxes")} keywords={["tax", "taxes", "finance"]} value="taxes" className="cmdk-item">
              <TaxesIcon className="cmdk-icon" />
              Taxes
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Settings" className="cmdk-group">
            <Command.Item onSelect={() => handleNavigation("/settings")} keywords={["setting", "settings", "config", "configuration"]} value="settings" className="cmdk-item">
              <SettingsIcon className="cmdk-icon" />
              Settings
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Theme" className="cmdk-group">
            <Command.Item
              onSelect={() => {
                toggleColorMode();
                setCurrentOpen(false);
              }}
              keywords={["theme", "mode", "dark", "light"]}
              value="theme"
              className="cmdk-item"
            >
              {mode === "dark" ? <LightModeIcon className="cmdk-icon" /> : <DarkModeIcon className="cmdk-icon" />}
              Toggle {mode === "dark" ? "Light" : "Dark"} Mode
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};

export default CommandPalette;
