import { Box, Card, Typography } from "@mui/material";
import { DashboardLayout } from "../layouts";

interface FeaturePlaceholderPageProps {
  title: string;
  description: string;
}

export function FeaturePlaceholderPage({ title, description }: FeaturePlaceholderPageProps) {
  return (
    <DashboardLayout title={title}>
      <Box sx={{ py: 2.5, px: { xs: 2, sm: 3 } }}>
        <Card
          sx={{
            borderRadius: "18px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--card)",
            p: { xs: 2.5, sm: 3.5 },
            boxShadow: "0 14px 28px rgba(15, 23, 42, 0.05)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "var(--foreground)",
              fontWeight: 700,
              mb: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)", maxWidth: 780, lineHeight: 1.7 }}>
            {description}
          </Typography>
        </Card>
      </Box>
    </DashboardLayout>
  );
}

export default FeaturePlaceholderPage;
