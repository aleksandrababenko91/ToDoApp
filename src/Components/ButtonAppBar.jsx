import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ButtonAppBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  console.log("added commit");
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar >
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            ToDoApp
          </Typography>
          <Menu
            id="nav-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}><Link to="/">Home</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to="/projects">Projects</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to="/contact">Contact</Link></MenuItem>
          </Menu>
          {/* You can style these buttons as needed */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ButtonAppBar;
