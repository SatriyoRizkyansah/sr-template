import React from "react";
import { Dialog, DialogContent, IconButton, Typography, Box, Stack, Button, Divider } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export interface ModalSection {
  title?: string;
  description?: string;
  content?: React.ReactNode;
}

export interface ModalAction {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  sections?: ModalSection[];
  children?: React.ReactNode;
  actions?: ModalAction[];
  maxWidth?: number;
}

const actionVariantStyles: Record<NonNullable<ModalAction["variant"]>, Record<string, string>> = {
  primary: {
    backgroundColor: "var(--foreground)",
    color: "var(--background)",
  },
  secondary: {
    backgroundColor: "var(--muted)",
    color: "var(--foreground)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--foreground)",
  },
};

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, description, sections, children, actions, maxWidth = 520 }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "calc(var(--radius-xl))",
          border: "1px solid color-mix(in srgb, var(--border) 70%, transparent)",
          backgroundColor: "var(--card)",
          color: "var(--card-foreground)",
          boxShadow: "0 35px 120px rgba(15, 23, 42, 0.22)",
          width: "100%",
          maxWidth,
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, pb: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "var(--foreground)", mb: 0.5 }}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
                {description}
              </Typography>
            )}
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              backgroundColor: "var(--muted)",
              border: "1px solid var(--border)",
              color: "var(--muted-foreground)",
              borderRadius: "var(--radius)",
              "&:hover": {
                backgroundColor: "var(--accent)",
              },
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

        {(sections?.length || children) && <Divider sx={{ my: 3, borderColor: "var(--border)" }} />}

        <Stack spacing={2.5} sx={{ px: 3 }}>
          {sections?.map((section, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid color-mix(in srgb, var(--border) 80%, transparent)",
                borderRadius: "var(--radius-lg)",
                p: 2.25,
                background: "color-mix(in srgb, var(--card) 85%, transparent)",
              }}
            >
              {(section.title || section.description) && (
                <Box sx={{ mb: section.content ? 1.25 : 0 }}>
                  {section.title && (
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "var(--foreground)", mb: 0.3 }}>
                      {section.title}
                    </Typography>
                  )}
                  {section.description && (
                    <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
                      {section.description}
                    </Typography>
                  )}
                </Box>
              )}
              {section.content}
            </Box>
          ))}

          {children}
        </Stack>

        {actions && actions.length > 0 && (
          <Box sx={{ display: "flex", gap: 1.5, p: 3, pt: 2, justifyContent: "flex-end" }}>
            {actions.map((action, index) => {
              const variant = action.variant ?? "primary";
              return (
                <Button
                  key={`${action.label}-${index}`}
                  type={action.type ?? "button"}
                  disabled={action.disabled}
                  onClick={action.onClick}
                  sx={{
                    px: 2.75,
                    py: 1,
                    borderRadius: "var(--radius)",
                    fontWeight: 600,
                    textTransform: "none",
                    border: variant === "ghost" ? "1px solid var(--border)" : "none",
                    ...actionVariantStyles[variant],
                  }}
                >
                  {action.label}
                </Button>
              );
            })}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
