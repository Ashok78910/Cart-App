import React, { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import Navbar from "./components/NavBar";
import CategoryList from "./components/CategoryList";
import ItemGrid from "./components/ItemGrid";
import Cart from "./components/Cart";
import categoriesData from "./utils/categoriesData";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

//function to handle category select
  const handleCategorySelect = (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

//function to add items into the cart
  const handleAddToCart = (item, category, subcategory) => {
    const isItemInCart = cartItems.some(
      (cartItem) =>
        cartItem.category.id === category.id &&
        cartItem.subcategory.id === subcategory.id &&
        cartItem.id === item.id
    );

    if (!isItemInCart) {
      setCartItems((prevItems) => [
        ...prevItems,
        { ...item, category, subcategory },
      ]);
    }
  };

//function to remove items from the cart
  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

//handle toggle modal
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen); 
  };

  return (
    <>
      <Navbar cartCount={cartItems.length} onCartClick={handleCartToggle} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <CategoryList
              categories={categoriesData}
              onCategorySelect={handleCategorySelect}
            />
          </Grid>

          {/* Item Grid */}
          <Grid item xs={12} md={8}>
            {selectedSubcategory ? (
              <ItemGrid
                subcategory={selectedSubcategory}
                category={selectedCategory} 
                cartItems={cartItems} 
                onAddToCart={handleAddToCart}
              />
            ) : (
              <Typography variant="h6" align="center">
                Select a category to view items.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Cart Modal */}
      <Cart cartItems={cartItems} onRemoveItem={handleRemoveItem} isOpen={isCartOpen} onClose={handleCartToggle} />
    </>
  );
};

export default App;
