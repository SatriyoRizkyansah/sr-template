import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import type { TableToolbarProps } from "./types";

export const TableToolbar: React.FC<TableToolbarProps> = ({ searchValue, onSearchChange, searchPlaceholder = "Search...", title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {title && (
        <Box component="h2" sx={{ m: 0, fontSize: "1.25rem", fontWeight: 600, color: "var(--foreground)" }}>
          {title}
        </Box>
      )}

      <TextField
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        sx={{
          minWidth: 250,
          ml: "auto",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "var(--card)",
            color: "var(--foreground)",
            borderColor: "var(--border)",
            "& fieldset": {
              borderColor: "var(--border)",
            },
            "&:hover fieldset": {
              borderColor: "var(--muted-foreground)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--primary)",
            },
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: "var(--muted-foreground)",
            opacity: 0.7,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "var(--muted-foreground)", fontSize: "1.25rem" }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
