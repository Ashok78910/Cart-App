import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = ({ cartCount, onCartClick }) => {
  return (
    <AppBar position='static' sx={{ backgroundColor: "#333" }}>
      <Container maxWidth='lg'>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "2px solid #000",
          }}
        >
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Typography
              variant='h6'
              className='title'
              sx={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Bengaluru eShopping
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <IconButton size='large' color='inherit' onClick={onCartClick}>
              <Badge
                badgeContent={cartCount}
                color='success'
                sx={{ "& .MuiBadge-dot": { top: 0, right: 0 } }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Typography variant='body1' sx={{ ml: 1 }}>
              Cart
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
