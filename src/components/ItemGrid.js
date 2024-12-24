import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ConfirmationCard from "./ConfirmationCard";

const ItemGrid = ({
  subcategory,
  onAddToCart,
  category,
  cartItems,
  openCartConfirmation,
  setOpenCartConfirmation,
}) => {
  const [item, setItem] = useState([]);

  const handleOpenModal = (item) => {
    setItem(item);
    setOpenCartConfirmation(true);
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "10px 20px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant='h5'>{subcategory.name}</Typography>
      </Box>

      <Grid container spacing={3}>
        {subcategory.items.map((item) => {
          const isItemInCart = cartItems.some(
            (cartItem) =>
              cartItem.category.id === category.id &&
              cartItem.subcategory.id === subcategory.id &&
              cartItem.id === item.id
          );

          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant='h6' sx={{ marginBottom: 2 }}>
                      {item.name}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "auto",
                    }}
                  >
                    <Button
                      variant='contained'
                      color='success'
                      onClick={() => handleOpenModal(item)}
                      disabled={isItemInCart}
                    >
                      {isItemInCart ? "Added to cart" : "Add to cart"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <ConfirmationCard
        onAddToCart={() => onAddToCart(item, category, subcategory)}
        openCartConfirmation={openCartConfirmation}
        setOpenCartConfirmation={setOpenCartConfirmation}
      />
    </Box>
  );
};

export default ItemGrid;
