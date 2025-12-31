import React, { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Checkbox, Box, Typography, TableSortLabel } from "@mui/material";
import { TableToolbar } from "./TableToolbar";
import { TablePagination } from "./TablePagination";
import { processTableData } from "./utils";
import type { DataTableProps } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

/**
 * DataTable Component
 * Reusable table dengan built-in search, filter, pagination, dan sorting
 *
 * @example
 * ```tsx
 * const columns: Column<User>[] = [
 *   { id: 'name', label: 'Name', sortable: true },
 *   { id: 'email', label: 'Email' },
 * ];
 *
 * <DataTable columns={columns} data={users} title="Users" />
 * ```
 */
export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps<AnyData>>(
  ({ columns, data, title, searchPlaceholder = "Search...", rowsPerPageOptions = [5, 10, 25], onRowClick, selectable = false, onSelectionChange, compact = true }, ref) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] || 10);
    const [sortConfig, setSortConfig] = useState<{ orderBy: string | null; order: "asc" | "desc" }>({
      orderBy: null,
      order: "asc",
    });
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

    // Get searchable fields
    const searchableFields = useMemo(() => columns.filter((col) => col.filterable !== false).map((col) => col.id), [columns]);

    // Process data
    const { data: processedData, total } = useMemo(
      () => processTableData(data, searchQuery, sortConfig, { page, rowsPerPage }, searchableFields as unknown as (keyof AnyData)[]),
      [data, searchQuery, sortConfig, page, rowsPerPage, searchableFields]
    );

    // Handle sort
    const handleSort = (columnId: string) => {
      if (sortConfig.orderBy === columnId) {
        setSortConfig({
          orderBy: columnId,
          order: sortConfig.order === "asc" ? "desc" : "asc",
        });
      } else {
        setSortConfig({
          orderBy: columnId,
          order: "asc",
        });
      }
    };

    // Handle select all
    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        const allIndices = processedData.map((_, idx) => page * rowsPerPage + idx);
        setSelectedRows(new Set(allIndices));
        if (onSelectionChange) {
          onSelectionChange(processedData);
        }
      } else {
        setSelectedRows(new Set());
        if (onSelectionChange) {
          onSelectionChange([]);
        }
      }
    };

    // Handle row select
    const handleRowSelect = (rowIndex: number) => {
      const newSelected = new Set(selectedRows);
      const absoluteIndex = page * rowsPerPage + rowIndex;

      if (newSelected.has(absoluteIndex)) {
        newSelected.delete(absoluteIndex);
      } else {
        newSelected.add(absoluteIndex);
      }

      setSelectedRows(newSelected);

      // Collect selected rows data
      const selectedRowsData = processedData.filter((_, idx) => newSelected.has(page * rowsPerPage + idx));
      if (onSelectionChange) {
        onSelectionChange(selectedRowsData);
      }
    };

    const allSelectedOnPage = processedData.length > 0 && processedData.every((_, idx) => selectedRows.has(page * rowsPerPage + idx));

    return (
      <Box ref={ref}>
        <TableToolbar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder={searchPlaceholder} title={title} />

        <TableContainer component={Paper} sx={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 1 }}>
          <Table size={compact ? "small" : "medium"} sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "var(--muted)" }}>
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox indeterminate={processedData.length > 0 && !allSelectedOnPage && selectedRows.size > 0} checked={allSelectedOnPage} onChange={(e) => handleSelectAll(e.target.checked)} sx={{ color: "var(--primary)" }} />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={String(column.id)}
                    align={column.align}
                    sx={{
                      fontWeight: 600,
                      color: "var(--foreground)",
                      width: column.width,
                      backgroundColor: "var(--muted)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {column.sortable ? (
                      <TableSortLabel
                        active={sortConfig.orderBy === String(column.id)}
                        direction={sortConfig.orderBy === String(column.id) ? sortConfig.order : "asc"}
                        onClick={() => handleSort(String(column.id))}
                        sx={{
                          color: "var(--foreground)",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                          },
                          "& .MuiTableSortLabel-icon": {
                            color: "var(--primary) !important",
                          },
                        }}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {processedData.length > 0 ? (
                processedData.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    onClick={() => onRowClick?.(row)}
                    sx={{
                      cursor: onRowClick ? "pointer" : "default",
                      backgroundColor: selectedRows.has(page * rowsPerPage + rowIndex) ? "var(--accent)" : "transparent",
                      "&:hover": {
                        backgroundColor: "var(--accent)",
                      },
                      borderColor: "var(--border)",
                      "& td": {
                        borderColor: "var(--border)",
                        color: "var(--foreground)",
                      },
                    }}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedRows.has(page * rowsPerPage + rowIndex)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleRowSelect(rowIndex);
                          }}
                          sx={{ color: "var(--primary)" }}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell key={String(column.id)} align={column.align}>
                        {column.render ? column.render(row[column.id], row) : String(row[column.id])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={selectable ? columns.length + 1 : columns.length} align="center" sx={{ py: 4 }}>
                    <Typography color="var(--muted-foreground)">{searchQuery ? "No results found" : "No data available"}</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={total}
          onPageChange={setPage}
          onRowsPerPageChange={(newRowsPerPage) => {
            setRowsPerPage(newRowsPerPage);
            setPage(0); // Reset ke halaman pertama
          }}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </Box>
    );
  }
);

DataTable.displayName = "DataTable";
