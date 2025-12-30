import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Typography, Box } from "@mui/material";

const OrdersPage: React.FC = () => {
  return (
    <DashboardLayout title="Orders">
      <Box sx={{ py: 2, px: 3 }}>
        <Typography variant="h4" sx={{ color: "var(--foreground)", mb: 2 }}>
          Orders
        </Typography>
        <Typography variant="body1" sx={{ color: "var(--muted-foreground)" }}>
          This is the orders page. Content will be added here.
        </Typography>
      </Box>
    </DashboardLayout>
  );
};

export default OrdersPage;
