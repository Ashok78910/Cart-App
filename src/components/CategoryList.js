import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import "../styles/Category.css"

const CategoryList = ({ categories, onCategorySelect }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

 // Handles the click event on a category to toggle its collapse state
  const handleCategoryClick = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

// Handles the selection of a subcategory and calls the parent callback function
  const handleSubcategorySelect = (category, subcategory) => {
    setSelectedSubcategory(subcategory);
    onCategorySelect(category, subcategory);
  };

  return (
    <Box className='category-box'>
      <Typography variant='h6' className='category-title'>
        Categories
      </Typography>

      <List>
        {categories.map((category) => (
          <React.Fragment key={category.id}>
            <ListItem
              button
              onClick={() => handleCategoryClick(category)}
              className='category-item'
            >
              <ListItemText primary={category.category} sx={{ flexGrow: 1 }} />
              <IconButton size='small'>
                {openCategory === category ? (
                  <ExpandLess sx={{ fontSize: "20px" }} />
                ) : (
                  <ExpandMore sx={{ fontSize: "20px" }} />
                )}
              </IconButton>
            </ListItem>
            <Collapse
              in={openCategory === category}
              timeout='auto'
              unmountOnExit
            >
              <List component='div' disablePadding>
                {category.subcategories?.map((subcategory) => {
                  const isSelected = selectedSubcategory?.id === subcategory.id;
                  return (
                    <ListItem
                      key={subcategory.id}
                      button
                      onClick={() =>
                        handleSubcategorySelect(category, subcategory)
                      }
                      className='subcategory-item'
                      sx={{
                        backgroundColor: isSelected ? "#f0f0f0" : "transparent",
                        fontWeight: isSelected ? "bold" : "normal",
                        color: isSelected ? "green" : "black",
                      }}
                    >
                      <ListItemText primary={subcategory.name} />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default CategoryList;
