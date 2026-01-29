/**
 * Data Table Types & Interfaces
 */

export interface Column<T> {
  id: keyof T;
  label: string;
  align?: "left" | "center" | "right";
  width?: string | number;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface TableFilterOption {
  label: string;
  value: string;
}

export interface PaginationState {
  page: number;
  rowsPerPage: number;
}

export interface FilterState {
  [key: string]: string | number | boolean | null;
}

export interface SortState {
  orderBy: string | null;
  order: "asc" | "desc";
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  searchPlaceholder?: string;
  rowsPerPageOptions?: number[];
  onRowClick?: (row: T) => void;
  compact?: boolean;
  filterField?: keyof T;
  filterOptions?: TableFilterOption[];
  defaultFilterValue?: string;
  filterLabel?: string;
}

export interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  title?: string;
}

export interface TablePaginationProps {
  page: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
}
