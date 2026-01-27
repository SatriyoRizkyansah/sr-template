import React from "react";
import { Typography, Card, Box, Stack } from "@mui/material";
import { TrendingUp, AttachMoney, ShoppingCart, People } from "@mui/icons-material";
import DashboardLayout from "../layouts/DashboardLayout";

const DashboardPage: React.FC = () => {
  const stats = [
    { title: "Total Revenue", value: "$45,231", change: "+20.1%", icon: AttachMoney },
    { title: "Total Orders", value: "1,234", change: "+12.5%", icon: ShoppingCart },
    { title: "Total Users", value: "8,462", change: "+5.2%", icon: People },
    { title: "Growth Rate", value: "32.4%", change: "+8.1%", icon: TrendingUp },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <Box sx={{ py: 2, px: 3 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "var(--foreground)",
              mb: 1,
              fontSize: { xs: "1.875rem", md: "2.25rem" },
              letterSpacing: "-0.025em",
            }}
          >
            Good morning, Harper 👋
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "var(--muted-foreground)",
              fontWeight: 400,
              fontSize: "1.125rem",
            }}
          >
            Here's what's happening with your store today.
          </Typography>
        </Box>

        <Stack spacing={4}>
          {/* Stats Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  sx={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    p: 3,
                    transition: "all var(--transition-fast)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      borderColor: "var(--primary)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--muted-foreground)",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "10px",
                        backgroundColor: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--primary-foreground)",
                      }}
                    >
                      <Icon fontSize="medium" />
                    </Box>
                  </Box>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "var(--foreground)",
                      fontSize: "1.875rem",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {stat.value}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: stat.change.startsWith("+") ? "var(--success)" : "var(--danger)",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    {stat.change} from last month
                  </Typography>
                </Card>
              );
            })}
          </Box>

          {/* Chart Section */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
              gap: 3,
            }}
          >
            <Card
              sx={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                p: 4,
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "var(--foreground)",
                    fontSize: "1.125rem",
                    mb: 1,
                  }}
                >
                  Revenue Overview
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--muted-foreground)",
                    fontSize: "0.875rem",
                  }}
                >
                  Monthly revenue for the last 6 months
                </Typography>
              </Box>

              <Box
                sx={{
                  height: 280,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--muted)",
                  borderRadius: "8px",
                  border: "2px dashed var(--border)",
                }}
              >
                <Typography variant="body1" sx={{ color: "var(--muted-foreground)" }}>
                  Chart placeholder - Add your favorite chart library
                </Typography>
              </Box>
            </Card>

            <Card
              sx={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                p: 4,
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "var(--foreground)",
                    fontSize: "1.125rem",
                    mb: 1,
                  }}
                >
                  Top Products
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--muted-foreground)",
                    fontSize: "0.875rem",
                  }}
                >
                  Best selling products this week
                </Typography>
              </Box>

              <Stack spacing={3}>
                {[
                  { name: "Product A", sales: "$1,234", percentage: 45 },
                  { name: "Product B", sales: "$892", percentage: 30 },
                  { name: "Product C", sales: "$654", percentage: 25 },
                ].map((product, index) => (
                  <Box key={index}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "var(--foreground)",
                          fontSize: "0.875rem",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--muted-foreground)",
                          fontSize: "0.875rem",
                        }}
                      >
                        {product.sales}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: 6,
                        backgroundColor: "var(--muted)",
                        borderRadius: "3px",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: `${product.percentage}%`,
                          height: "100%",
                          backgroundColor: "var(--primary)",
                          borderRadius: "3px",
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Box>

          {/* Recent Activity Table */}
          <Card
            sx={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              p: 4,
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "var(--foreground)",
                  fontSize: "1.125rem",
                  mb: 1,
                }}
              >
                Recent Orders
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--muted-foreground)",
                  fontSize: "0.875rem",
                }}
              >
                Latest orders from your customers
              </Typography>
            </Box>

            <Box
              sx={{
                p: 6,
                backgroundColor: "var(--muted)",
                borderRadius: "8px",
                textAlign: "center",
                border: "2px dashed var(--border)",
              }}
            >
              <Typography variant="body1" sx={{ color: "var(--muted-foreground)" }}>
                Data table placeholder - Add your preferred table component
              </Typography>
            </Box>
          </Card>
        </Stack>
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
