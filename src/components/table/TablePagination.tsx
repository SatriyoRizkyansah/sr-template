import React from "react";
import { Box, TablePagination as MUITablePagination } from "@mui/material";
import type { TablePaginationProps } from "./types";

export const TablePagination: React.FC<TablePaginationProps> = ({ page, rowsPerPage, totalRows, onPageChange, onRowsPerPageChange, rowsPerPageOptions = [5, 10, 25, 50] }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
      <MUITablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))}
        sx={{
          "& .MuiTablePagination-root": {
            color: "var(--foreground)",
          },
          "& .MuiTablePagination-select": {
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: "var(--foreground)",
            margin: 0,
          },
        }}
      />
    </Box>
  );
};
