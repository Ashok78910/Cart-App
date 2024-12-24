import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import "../styles/Category.css";
import CloseIcon from "@mui/icons-material/Close";

const CategoryList = ({ categories, onCategorySelect }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [search, setSearch] = useState("");
  const [searchedCategory, setSearchedCategory] = useState([]);

  // Handles the click event on a category to toggle its collapse state
  const handleCategoryClick = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  // Handles the selection of a subcategory and calls the parent callback function
  const handleSubcategorySelect = (category, subcategory) => {
    setSelectedSubcategory({
      categoryId: category.id,
      subcategoryId: subcategory.id,
    });
    onCategorySelect(category, subcategory);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    const flatSubcategories = categories.flatMap(
      (category) => category.subcategories
    );
    const mainCategory = flatSubcategories.find((subcategory) =>
      subcategory.name.toLowerCase().includes(searchValue)
    );

    if (mainCategory) {
      const category = categories.find((category) =>
        category.subcategories.includes(mainCategory)
      );
      setSearchedCategory({
        category,
        subcategory: mainCategory,
      });
      setOpenCategory(category);
    } else {
      setSearchedCategory(null);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setOpenCategory(null);
    setSearchedCategory(null);
  };

  return (
    <Box className='category-box'>
      <Typography variant='h6' className='category-title'>
        Categories
      </Typography>

      <TextField
        type='text'
        onChange={handleSearch}
        value={search}
        placeholder='Search Category'
        InputProps={{
          endAdornment: search && (
            <InputAdornment position='end'>
              <IconButton onClick={clearSearch} edge='end'>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />

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
                  const isSelected =
                    selectedSubcategory?.categoryId === category.id &&
                    selectedSubcategory?.subcategoryId === subcategory.id;
                  const isSearched =
                    searchedCategory?.subcategory?.id === subcategory.id;
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
                        backgroundColor: isSearched ? "#f0f0f0" : "none",
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
