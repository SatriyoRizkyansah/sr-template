/**
 * DataTable Component - Example Usage
 *
 * This example demonstrates how to use the DataTable component
 * with all its features: search, filter, pagination, and sorting
 */

import React, { useMemo } from "react";
import { DataTable, type Column } from "./index";

// Example data type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}

// Example data
const EXAMPLE_USERS: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User",
    status: "active",
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    role: "Editor",
    status: "inactive",
    joinDate: "2024-03-10",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    role: "User",
    status: "active",
    joinDate: "2024-04-05",
  },
  {
    id: 5,
    name: "Emma Davis",
    email: "emma@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-05-12",
  },
];

/**
 * DataTableExample Component
 *
 * @example
 * ```tsx
 * import { DataTableExample } from "@/components/table/DataTableExample";
 *
 * export default function Page() {
 *   return <DataTableExample />;
 * }
 * ```
 */
export const DataTableExample: React.FC = () => {
  // Define table columns
  const columns: Column<User>[] = useMemo(
    () => [
      {
        id: "name",
        label: "Name",
        sortable: true,
        filterable: true,
        width: "25%",
      },
      {
        id: "email",
        label: "Email",
        sortable: true,
        filterable: true,
        width: "30%",
      },
      {
        id: "role",
        label: "Role",
        sortable: true,
        filterable: true,
        width: "15%",
      },
      {
        id: "status",
        label: "Status",
        sortable: true,
        render: (value) => (
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: value === "active" ? "var(--chart-1)" : "var(--chart-5)",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {String(value).toUpperCase()}
          </span>
        ),
      },
      {
        id: "joinDate",
        label: "Join Date",
        sortable: true,
        width: "15%",
      },
    ],
    [],
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "2rem", color: "var(--foreground)" }}>Users Management</h1>

      <DataTable
        columns={columns}
        data={EXAMPLE_USERS}
        title="All Users"
        searchPlaceholder="Search by name, email, or role..."
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowClick={(user) => console.log("Row clicked:", user)}
        compact
        filterField="status"
        filterLabel="Status"
        filterOptions={[
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ]}
      />
    </div>
  );
};

export default DataTableExample;
