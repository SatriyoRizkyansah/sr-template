import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Typography, Box } from "@mui/material";

const MarketplacePage: React.FC = () => {
  return (
    <DashboardLayout title="Marketplace">
      <Box sx={{ py: 2, px: 3 }}>
        <Typography variant="h4" sx={{ color: "var(--foreground)", mb: 2 }}>
          Marketplace
        </Typography>
        <Typography variant="body1" sx={{ color: "var(--muted-foreground)" }}>
          This is the marketplace page. Content will be added here.
        </Typography>
      </Box>
    </DashboardLayout>
  );
};

export default MarketplacePage;
