import React from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, Box } from "@mui/material";
import { useTheme } from "../theme/useTheme";
import { KeyboardArrowRightRounded as ArrowIcon } from "@mui/icons-material";
import "./CommandPalette.css";

interface CommandPaletteProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen: externalOpen, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const currentOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setCurrentOpen = (newOpen: boolean) => {
    if (externalOpen === undefined) {
      setInternalOpen(newOpen);
    }
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

  React.useEffect(() => {
    if (currentOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [currentOpen]);

  const commandSections = [
    {
      heading: "Pages",
      items: [
        { label: "Dashboard", path: "/dashboard", keywords: ["home", "dashboard", "overview"] },
        { label: "Marketplace", path: "/marketplace", keywords: ["shop", "marketplace", "store"] },
        { label: "Orders", path: "/orders", keywords: ["order", "orders", "purchases"] },
        { label: "Tracking", path: "/tracking", keywords: ["track", "tracking", "shipment"] },
        { label: "Customers", path: "/customers", keywords: ["customer", "customers", "users", "people"] },
        { label: "Discounts", path: "/discounts", keywords: ["discount", "discounts", "promo", "offer"] },
      ],
    },
    {
      heading: "Finance",
      items: [
        { label: "Ledger", path: "/ledger", keywords: ["ledger", "accounting", "books"] },
        { label: "Taxes", path: "/taxes", keywords: ["tax", "taxes", "finance"] },
      ],
    },
    {
      heading: "Components",
      items: [{ label: "Settings", path: "/settings", keywords: ["setting", "settings", "config", "configuration"] }],
    },
  ];

  const renderCommandItem = (item: { label: string; keywords: string[]; action: () => void; value: string }) => {
    const handleAction = () => {
      item.action();
    };

    return (
      <Command.Item
        key={item.value}
        value={item.value}
        keywords={item.keywords}
        className="command-item"
        onSelect={handleAction}
        onPointerDown={(event) => {
          event.preventDefault();
          handleAction();
        }}
      >
        <span className="command-arrow">
          <ArrowIcon fontSize="small" />
        </span>
        <span className="command-item-label">{item.label}</span>
      </Command.Item>
    );
  };

  return (
    <Dialog
      open={currentOpen}
      onClose={() => setCurrentOpen(false)}
      fullWidth
      maxWidth="sm"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
          },
        },
        paper: {
          sx: {
            background: "transparent",
            boxShadow: "none",
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box className="command-dialog">
          <Command label="Global command menu" className="command-root">
            <div className="command-input-wrapper">
              <Command.Input ref={inputRef} autoFocus placeholder="Search pages, actions... (Cmd+K)" className="command-input" />
            </div>
            <Command.List className="command-list">
              <Command.Empty className="command-empty">No results found.</Command.Empty>

              {commandSections.map((section) => (
                <Command.Group key={section.heading} className="command-group">
                  <div className="command-heading">{section.heading}</div>
                  {section.items.map((item) =>
                    renderCommandItem({
                      label: item.label,
                      keywords: item.keywords,
                      value: item.label.toLowerCase(),
                      action: () => handleNavigation(item.path),
                    }),
                  )}
                </Command.Group>
              ))}

              <Command.Group className="command-group">
                <div className="command-heading">Theme</div>
                {renderCommandItem({
                  label: `Toggle ${mode === "dark" ? "Light" : "Dark"} Mode`,
                  keywords: ["theme", "mode", "dark", "light"],
                  value: "theme-toggle",
                  action: () => {
                    toggleColorMode();
                    setCurrentOpen(false);
                  },
                })}
              </Command.Group>
            </Command.List>
          </Command>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;
