import { Box, Tab, Tabs } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryIndex, getCategoryNames } from "store/FoodMenu/selector";

import React from "react";
import { setCategoryIndex, setCategoryMenu } from "store/FoodMenu/reducer";

function CategoryPickerMobile() {
  const categories = useSelector(getCategoryNames);
  const categoryIndex = useSelector(getCategoryIndex);
  const dispatch = useDispatch();

  const handleCategoryChange = (e, newIndex) => {
    dispatch(setCategoryIndex(newIndex));
  };
  const hanldePicker = () => {
    return dispatch(setCategoryMenu(false));
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
          <Tab key={index} label={name} onClick={hanldePicker} />
        ))}
      </Tabs>
    </Box>
  );
}

export default CategoryPickerMobile;
