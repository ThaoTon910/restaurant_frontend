import { Box, Tab, Tabs } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryIndex, getCategoryNames } from "store/FoodMenu/selector";

import React from "react";
import { setCategoryIndex } from "store/FoodMenu/reducer";

function CategoryPicker() {
  const categories = useSelector(getCategoryNames);
  const categoryIndex = useSelector(getCategoryIndex);
  const dispatch = useDispatch();

  const handleCategoryChange = (e, newIndex) => {
    dispatch(setCategoryIndex(newIndex));
  };

  return (
    <Box flexBasis="200px">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={categoryIndex}
        onChange={handleCategoryChange}
        aria-label="Vertical tabs example"
        textColor="primary"
        indicatorColor="primary"
      >
        {categories.map((name, index) => (
          <Tab key={index} label={name} />
        ))}
        <Tab key={1111} label="NO MORE" />
      </Tabs>
    </Box>
  );
}

export default CategoryPicker;
