import React, { useMemo, useState, useId } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { FilterList } from "@mui/icons-material";
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
const ALL_FILTER_VALUE = "__all";

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps<AnyData>>(
  ({ columns, data, title, searchPlaceholder = "Search...", rowsPerPageOptions = [5, 10, 25], onRowClick, compact = true, filterField, filterOptions, defaultFilterValue, filterLabel }, ref) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] || 10);
    const filterDropdownId = useId();

    const showFilter = Boolean(filterField && filterOptions?.length);
    const normalizedFilterOptions = useMemo(() => {
      if (!showFilter || !filterOptions) return [];
      const hasAll = filterOptions.some((option) => option.value === ALL_FILTER_VALUE);
      return hasAll ? filterOptions : [{ label: "All", value: ALL_FILTER_VALUE }, ...filterOptions];
    }, [filterOptions, showFilter]);

    const initialFilterValue = defaultFilterValue ?? normalizedFilterOptions[0]?.value ?? ALL_FILTER_VALUE;
    const [filterValue, setFilterValue] = useState(initialFilterValue);

    const activeFilterValue = useMemo(() => {
      if (!showFilter) return ALL_FILTER_VALUE;
      const values = normalizedFilterOptions.map((option) => option.value);
      if (values.includes(filterValue)) {
        return filterValue;
      }
      return normalizedFilterOptions[0]?.value ?? ALL_FILTER_VALUE;
    }, [filterValue, normalizedFilterOptions, showFilter]);

    // Get searchable fields
    const searchableFields = useMemo(() => columns.filter((col) => col.filterable !== false).map((col) => col.id), [columns]);

    // Process data
    const filteredData = useMemo(() => {
      if (!showFilter || !filterField) return data;
      if (activeFilterValue === ALL_FILTER_VALUE) return data;
      return data.filter((row) => String(row[filterField]) === activeFilterValue);
    }, [data, filterField, activeFilterValue, showFilter]);

    const defaultSortConfig = useMemo(() => ({ orderBy: null as keyof AnyData | null, order: "asc" as const }), []);

    const { data: processedData, total } = useMemo(
      () => processTableData(filteredData, searchQuery, defaultSortConfig, { page, rowsPerPage }, searchableFields as unknown as (keyof AnyData)[]),
      [filteredData, searchQuery, defaultSortConfig, page, rowsPerPage, searchableFields],
    );

    const handleFilterSelectChange = (event: SelectChangeEvent<string>) => {
      setFilterValue(event.target.value as string);
      setPage(0);
    };

    return (
      <Box ref={ref}>
        <TableToolbar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder={searchPlaceholder} title={title} />

        <Box
          sx={{
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            backgroundColor: "var(--card)",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
            overflow: "hidden",
          }}
        >
          {showFilter && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                px: 3,
                py: 2,
                borderBottom: "1px solid var(--border)",
                backgroundColor: "var(--card)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FilterList sx={{ color: "var(--muted-foreground)" }} />
                <Typography variant="body2" sx={{ color: "var(--muted-foreground)", fontWeight: 500 }}>
                  Filter by {filterLabel ?? "status"}
                </Typography>
              </Box>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel id={`${filterDropdownId}-label`} sx={{ color: "var(--muted-foreground)", "&.Mui-focused": { color: "var(--foreground)" } }}>
                  {filterLabel ?? "Filter"}
                </InputLabel>
                <Select
                  labelId={`${filterDropdownId}-label`}
                  id={`${filterDropdownId}-select`}
                  value={activeFilterValue}
                  label={filterLabel ?? "Filter"}
                  onChange={handleFilterSelectChange}
                  sx={{
                    borderRadius: 999,
                    backgroundColor: "var(--card)",
                    color: "var(--foreground)",
                    "& fieldset": {
                      borderColor: "var(--border)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--muted-foreground)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--primary)",
                    },
                    "& .MuiSelect-icon": {
                      color: "var(--muted-foreground)",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "var(--card)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                      },
                    },
                  }}
                >
                  {normalizedFilterOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          <TableContainer>
            <Table size={compact ? "small" : "medium"} sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "color-mix(in srgb, var(--muted) 75%, transparent)", "& th": { borderColor: "var(--border)" } }}>
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
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {processedData.length > 0 ? (
                  processedData.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      hover={Boolean(onRowClick)}
                      onClick={() => onRowClick?.(row)}
                      sx={{
                        cursor: onRowClick ? "pointer" : "default",
                        "& td": {
                          borderBottom: "1px solid var(--border)",
                          color: "var(--foreground)",
                          fontSize: compact ? "0.9rem" : "1rem",
                          py: compact ? 1.75 : 2.25,
                        },
                        "&:last-of-type td": {
                          borderBottom: 0,
                        },
                      }}
                    >
                      {columns.map((column) => (
                        <TableCell key={String(column.id)} align={column.align}>
                          {column.render ? column.render(row[column.id], row) : String(row[column.id])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
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
              setPage(0);
            }}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </Box>
      </Box>
    );
  },
);

DataTable.displayName = "DataTable";
