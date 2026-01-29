import React, { useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Typography, Box, Chip, Button, Stack, TextField, MenuItem, InputAdornment } from "@mui/material";
import { DataTable, type Column } from "../components/table";
import Modal, { type ModalSection } from "../components/modal";

// Product data type
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
  sales: number;
  rating: number;
}

// Example product data
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    category: "Electronics",
    price: 299.99,
    stock: 45,
    status: "active",
    sales: 1250,
    rating: 4.8,
  },
  {
    id: 2,
    name: "USB-C Cable 2m",
    category: "Accessories",
    price: 14.99,
    stock: 320,
    status: "active",
    sales: 5680,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Laptop Stand Aluminum",
    category: "Office",
    price: 49.99,
    stock: 0,
    status: "inactive",
    sales: 890,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Mechanical Keyboard RGB",
    category: "Electronics",
    price: 129.99,
    stock: 78,
    status: "active",
    sales: 3420,
    rating: 4.9,
  },
  {
    id: 5,
    name: "Wireless Mouse",
    category: "Accessories",
    price: 34.99,
    stock: 156,
    status: "active",
    sales: 2100,
    rating: 4.6,
  },
  {
    id: 6,
    name: "4K Monitor 27 inch",
    category: "Electronics",
    price: 399.99,
    stock: 12,
    status: "active",
    sales: 450,
    rating: 4.8,
  },
  {
    id: 7,
    name: "Desk Organizer Set",
    category: "Office",
    price: 24.99,
    stock: 200,
    status: "active",
    sales: 1680,
    rating: 4.4,
  },
  {
    id: 8,
    name: "Phone Mount Car",
    category: "Accessories",
    price: 19.99,
    stock: 85,
    status: "active",
    sales: 2340,
    rating: 4.5,
  },
];

const CATEGORY_OPTIONS = ["Electronics", "Accessories", "Office"];
const STATUS_OPTIONS: Product["status"][] = ["active", "inactive"];

const MarketplacePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: CATEGORY_OPTIONS[0],
    price: "",
    stock: "",
    status: STATUS_OPTIONS[0],
  });

  const resetProductForm = () =>
    setNewProduct({
      name: "",
      category: CATEGORY_OPTIONS[0],
      price: "",
      stock: "",
      status: STATUS_OPTIONS[0],
    });

  const handleFieldChange = (field: keyof typeof newProduct) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const productModalSections: ModalSection[] = [
    {
      title: "Product details",
      description: "Basic information about your item",
      content: (
        <Stack spacing={1.5}>
          <TextField label="Product name" size="small" fullWidth value={newProduct.name} onChange={handleFieldChange("name")} />
          <TextField label="Category" select size="small" fullWidth value={newProduct.category} onChange={handleFieldChange("category")}>
            {CATEGORY_OPTIONS.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <TextField
              label="Price"
              size="small"
              fullWidth
              type="number"
              value={newProduct.price}
              onChange={handleFieldChange("price")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}>
                    $
                  </InputAdornment>
                ),
              }}
            />
            <TextField label="Stock" size="small" fullWidth type="number" value={newProduct.stock} onChange={handleFieldChange("stock")} />
          </Stack>
        </Stack>
      ),
    },
    {
      title: "Visibility",
      description: "Control status and availability",
      content: (
        <Stack spacing={1.5}>
          <TextField label="Status" select size="small" fullWidth value={newProduct.status} onChange={handleFieldChange("status")}>
            {STATUS_OPTIONS.map((status) => (
              <MenuItem key={status} value={status}>
                {status === "active" ? "Active" : "Inactive"}
              </MenuItem>
            ))}
          </TextField>
          <TextField label="Short description" multiline minRows={2} size="small" fullWidth placeholder="Add any special notes" />
        </Stack>
      ),
    },
  ];

  // Define table columns
  const columns: Column<Product>[] = useMemo(
    () => [
      {
        id: "name",
        label: "Product Name",
        sortable: true,
        filterable: true,
        width: "25%",
      },
      {
        id: "category",
        label: "Category",
        sortable: true,
        filterable: true,
        width: "15%",
      },
      {
        id: "price",
        label: "Price",
        align: "right",
        sortable: true,
        render: (value) => `$${(value as number).toFixed(2)}`,
        width: "12%",
      },
      {
        id: "stock",
        label: "Stock",
        align: "center",
        sortable: true,
        render: (value) => {
          const stock = value as number;
          const color = stock === 0 ? "error" : stock < 20 ? "warning" : "success";
          return <Chip label={stock} size="small" color={color} variant="outlined" />;
        },
        width: "10%",
      },
      {
        id: "sales",
        label: "Sales",
        align: "right",
        sortable: true,
        width: "10%",
      },
      {
        id: "rating",
        label: "Rating",
        align: "center",
        sortable: true,
        render: (value) => <span style={{ color: "var(--chart-1)", fontWeight: 600 }}>⭐ {(value as number).toFixed(1)}</span>,
        width: "10%",
      },
      {
        id: "status",
        label: "Status",
        align: "center",
        sortable: true,
        render: (value) => <Chip label={String(value).toUpperCase()} size="small" color={value === "active" ? "success" : "default"} variant={value === "active" ? "filled" : "outlined"} />,
        width: "12%",
      },
    ],
    [],
  );

  return (
    <DashboardLayout title="Marketplace">
      <Box sx={{ py: 2, px: 3 }}>
        <Box sx={{ mb: 3, display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" } }}>
          <Box>
            <Typography variant="h4" sx={{ color: "var(--foreground)", mb: 0.5 }}>
              Marketplace
            </Typography>
            <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
              Manage your products and inventory
            </Typography>
          </Box>

          <Button variant="contained" onClick={() => setIsModalOpen(true)} sx={{ borderRadius: "var(--radius)", textTransform: "none", fontWeight: 600 }}>
            Add product
          </Button>
        </Box>

        {/* DataTable Implementation */}
        <DataTable
          columns={columns}
          data={PRODUCTS}
          title="Products"
          searchPlaceholder="Search by product name, category..."
          rowsPerPageOptions={[5, 10, 25, 50]}
          onRowClick={(product) => {
            console.log("Product clicked:", product);
            // You can add navigation or modal here
          }}
          compact
        />

        <Modal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            resetProductForm();
          }}
          title="Add new product"
          description="Keep your catalog up to date by filling in the details below."
          sections={productModalSections}
          actions={[
            {
              label: "Cancel",
              variant: "ghost",
              onClick: () => {
                setIsModalOpen(false);
                resetProductForm();
              },
            },
            {
              label: "Save product",
              variant: "primary",
              onClick: () => {
                console.log("New product payload", newProduct);
                setIsModalOpen(false);
                resetProductForm();
              },
            },
          ]}
        />
      </Box>
    </DashboardLayout>
  );
};

export default MarketplacePage;
