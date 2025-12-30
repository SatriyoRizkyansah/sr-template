import React, { useState } from "react";
import { AppBar, Toolbar, Box, Typography, IconButton, InputBase, Avatar, Menu, MenuItem } from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 280;

interface NavbarProps {
  title?: string;
}

const Navbar: React.FC<NavbarProps> = ({ title = "Dashboard" }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: "var(--background)",
        // borderBottom: "1px solid var(--border)",
        color: "var(--foreground)",
        top: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: "64px !important", px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" },
              color: "var(--foreground)",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              color: "var(--foreground)",
              fontSize: "1.5rem",
              letterSpacing: "-0.025em",
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              backgroundColor: "var(--muted)",
              borderRadius: "var(--radius)",
              px: 3,
              py: 1.5,
              mr: 2,
              minWidth: 320,
              border: "1px solid var(--border)",
              transition: "all var(--transition-fast)",
              "&:focus-within": {
                borderColor: "var(--primary)",
                backgroundColor: "var(--background)",
              },
            }}
          >
            <SearchIcon fontSize="small" sx={{ color: "var(--muted-foreground)", mr: 2 }} />
            <InputBase
              placeholder="Search..."
              sx={{
                flex: 1,
                color: "var(--foreground)",
                fontSize: "0.875rem",
                "& input::placeholder": {
                  color: "var(--muted-foreground)",
                  opacity: 1,
                },
              }}
            />
          </Box>

          <Avatar
            onClick={handleMenuOpen}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "var(--primary)",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "2px solid var(--border)",
              transition: "all var(--transition-fast)",
              "&:hover": {
                borderColor: "var(--primary)",
                transform: "scale(1.05)",
                boxShadow: "var(--shadow-md)",
              },
            }}
          >
            HN
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            slotProps={{
              paper: {
                sx: {
                  mt: 1.5,
                  boxShadow: "var(--shadow-lg)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  minWidth: 200,
                },
              },
            }}
          >
            <MenuItem
              disabled
              sx={{
                color: "var(--foreground)",
                py: 1.5,
                "&.Mui-disabled": {
                  opacity: 1,
                },
              }}
            >
              <Avatar sx={{ width: 28, height: 28, mr: 1.5, backgroundColor: "var(--primary)" }}>HN</Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  Harper Nelson
                </Typography>
                <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>
                  harper@example.com
                </Typography>
              </Box>
            </MenuItem>
            <Box sx={{ height: 1, backgroundColor: "var(--border)", mx: 1, my: 0.5 }} />
            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.5,
                color: "var(--foreground)",
                "&:hover": {
                  backgroundColor: "var(--accent)",
                },
              }}
            >
              <Logout sx={{ mr: 1.5, fontSize: "1.125rem" }} />
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
