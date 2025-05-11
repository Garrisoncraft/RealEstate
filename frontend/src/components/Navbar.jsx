import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'beige' }}>
      <Toolbar className="max-w-7xl mx-auto w-full flex justify-between">
        {/* Left: Logo and Typography */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ color: 'brown', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none' }}
          >
            CraftSpace
          </Typography>
        </Box>

        {/* Middle: Navigation Links - hidden on small screens */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, flexGrow: 2, justifyContent: 'center' }}>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ color: 'brown', fontWeight: '600', textTransform: 'none' }}
          >
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/add-property"
            color="inherit"
            sx={{ color: 'brown', fontWeight: '600', textTransform: 'none' }}
          >
            Add Property
          </Button>
        </Box>

        {/* Right: Buttons - hidden on small screens */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, flexGrow: 1, justifyContent: 'flex-end' }}>
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              variant="outlined"
              sx={{ color: 'brown', borderColor: 'brown', borderRadius: '9999px', px: 3, py: 0.5, textTransform: 'none' }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                sx={{ color: 'brown', borderColor: 'brown', borderRadius: '9999px', px: 3, py: 0.5, textTransform: 'none' }}
              >
                Log In
              </Button>
              <Button
                component={RouterLink}
                to="/signup"
                variant="contained"
                sx={{
                  bgcolor: 'brown',
                  borderRadius: '9999px',
                  px: 4,
                  py: 0.5,
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'darkbrown' },
                }}
              >
                Join now
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <MenuIcon sx={{ color: 'brown' }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem component={RouterLink} to="/" onClick={handleMenuClose}>Home</MenuItem>
            <MenuItem component={RouterLink} to="/add-property" onClick={handleMenuClose}>Add Property</MenuItem>
            {isLoggedIn ? (
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
            ) : ([
                <MenuItem key="login" component={RouterLink} to="/login" onClick={handleMenuClose}>Log In</MenuItem>,
                <MenuItem key="signup" component={RouterLink} to="/signup" onClick={handleMenuClose}>Join now</MenuItem>
              ])}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
