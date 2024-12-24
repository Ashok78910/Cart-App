import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/Cart.css";

const Cart = ({ cartItems,setCartItems, onRemoveItem, isOpen, onClose }) => {
  const cartList = JSON.parse(localStorage.getItem("cart_item"));


  useEffect(() => {
    if (cartList) {
      setCartItems(cartList);
    }
  }, []);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle sx={{ padding: "16px 24px", position: "relative" }}>
        Cart Items
        <IconButton
          onClick={onClose}
          edge='end'
          aria-label='close'
          sx={{
            position: "absolute",
            right: 12,
            top: 8,
            zIndex: 1,
            fontSize: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box className='cart-items-container'>
          {cartItems.length > 0 ? (
            <List>
              {cartItems?.map((item, index) => (
                <ListItem key={index} className='cart-item'>
                  <ListItemText primary={item.name} />
                  <IconButton
                    onClick={() => onRemoveItem(item.id)}
                    className='cart-remove-button'
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant='body1' align='center'>
              Cart is empty.
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
