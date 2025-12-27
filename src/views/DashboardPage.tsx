import React from "react";
import { Container, Typography, Card, CardContent, Box, Button, AppBar, Toolbar, Stack, Paper } from "@mui/material";
import { Dashboard as DashboardIcon, Assessment, People, Settings, TrendingUp, AttachMoney, ShoppingCart, Notifications } from "@mui/icons-material";
import { ThemeToggle } from "../components/ThemeToggle";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const stats = [
    { title: "Total Revenue", value: "$45,231", change: "+20.1%", icon: AttachMoney, color: "success.main" },
    { title: "Total Orders", value: "1,234", change: "+12.5%", icon: ShoppingCart, color: "primary.main" },
    { title: "Total Users", value: "8,462", change: "+5.2%", icon: People, color: "info.main" },
    { title: "Growth", value: "32.4%", change: "+8.1%", icon: TrendingUp, color: "warning.main" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      {/* Header */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <ThemeToggle />
          <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl">
        <Stack spacing={4}>
          {/* Welcome Section */}
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Welcome Back! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's what's happening with your business today.
            </Typography>
          </Box>

          {/* Stats Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
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
                    height: "100%",
                    boxShadow: "var(--shadow-md)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "var(--shadow-lg)",
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: "var(--radius-md)",
                          backgroundColor: stat.color,
                          color: "white",
                          display: "flex",
                          mr: 2,
                        }}
                      >
                        <Icon />
                      </Box>
                      <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                        {stat.change}
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>

          {/* Quick Actions */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
              gap: 3,
            }}
          >
            <Paper sx={{ p: 3, boxShadow: "var(--shadow-md)" }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Recent Activity
              </Typography>
              <Box sx={{ mt: 3 }}>
                {[1, 2, 3, 4].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      py: 2,
                      borderBottom: item !== 4 ? "1px solid var(--border)" : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          backgroundColor: "var(--muted)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                        }}
                      >
                        <Assessment fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Activity Item {item}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item} hours ago
                        </Typography>
                      </Box>
                    </Box>
                    <Button size="small" variant="outlined">
                      View
                    </Button>
                  </Box>
                ))}
              </Box>
            </Paper>

            <Stack spacing={3}>
              <Paper sx={{ p: 3, boxShadow: "var(--shadow-md)" }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Quick Actions
                </Typography>
                <Stack spacing={2} sx={{ mt: 3 }}>
                  <Button variant="contained" fullWidth startIcon={<People />} sx={{ justifyContent: "flex-start" }}>
                    Manage Users
                  </Button>
                  <Button variant="outlined" fullWidth startIcon={<Assessment />} sx={{ justifyContent: "flex-start" }}>
                    View Reports
                  </Button>
                  <Button variant="outlined" fullWidth startIcon={<Settings />} sx={{ justifyContent: "flex-start" }}>
                    Settings
                  </Button>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, boxShadow: "var(--shadow-md)" }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Notifications
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {[1, 2, 3].map((item) => (
                    <Box
                      key={item}
                      sx={{
                        py: 1.5,
                        borderBottom: item !== 3 ? "1px solid var(--border)" : "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Notifications fontSize="small" sx={{ mr: 1.5, color: "primary.main" }} />
                      <Typography variant="body2">Notification {item}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default DashboardPage;
