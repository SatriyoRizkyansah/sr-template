import React from "react";
import { Box, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, KeyboardArrowDownRounded } from "@mui/icons-material";
import type { TablePaginationProps } from "./types";

export const TablePagination: React.FC<TablePaginationProps> = ({ page, rowsPerPage, totalRows, onPageChange, onRowsPerPageChange, rowsPerPageOptions = [5, 10, 25, 50] }) => {
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const isFirstPage = page === 0;
  const isLastPage = page >= totalPages - 1;
  const startItem = totalRows === 0 ? 0 : page * rowsPerPage + 1;
  const endItem = Math.min(totalRows, (page + 1) * rowsPerPage);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 2,
        justifyContent: "space-between",
        px: 2,
        py: 1.5,
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--card)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
        <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
          Rows per page
        </Typography>
        <Select
          size="small"
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
          IconComponent={KeyboardArrowDownRounded}
          sx={{
            minWidth: 90,
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            borderRadius: 2,
            height: 36,
            "& fieldset": {
              borderColor: "var(--border)",
            },
            "&:hover fieldset": {
              borderColor: "var(--muted-foreground)",
            },
            "& svg": {
              color: "var(--muted-foreground)",
            },
          }}
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
          {startItem}-{endItem} of {totalRows || 0}
        </Typography>
        <IconButton
          size="small"
          onClick={() => onPageChange(Math.max(0, page - 1))}
          disabled={isFirstPage}
          sx={{
            border: "1px solid var(--border)",
            borderRadius: "999px",
            color: "var(--foreground)",
            width: 36,
            height: 36,
            backgroundColor: "var(--background)",
            transition: "all var(--transition-fast)",
            "&:hover": {
              backgroundColor: "var(--muted)",
            },
            "&:disabled": {
              opacity: 0.35,
              backgroundColor: "transparent",
            },
          }}
        >
          <ChevronLeft fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
          disabled={isLastPage}
          sx={{
            border: "1px solid var(--border)",
            borderRadius: "999px",
            color: "var(--foreground)",
            width: 36,
            height: 36,
            backgroundColor: "var(--background)",
            transition: "all var(--transition-fast)",
            "&:hover": {
              backgroundColor: "var(--muted)",
            },
            "&:disabled": {
              opacity: 0.35,
              backgroundColor: "transparent",
            },
          }}
        >
          <ChevronRight fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
