import { createSelector } from "@reduxjs/toolkit";

export const foodMenuSelector = (state) => state.foodMenu;

export const getAddonGroups = createSelector(
  foodMenuSelector,
  (foodMenu) => foodMenu.addonGroups
);
export const getAllAddons = createSelector(getAddonGroups, (addonGroups) =>
  addonGroups.map((group) => group.addons).flat()
);

export const getAllAddonDict = createSelector(getAllAddons, (addon) =>
  addon.reduce((dict, addon) => {
    return { ...dict, [addon.id]: addon };
  }, {})
);

export const isLoading = createSelector(
  foodMenuSelector,
  (foodMenu) => foodMenu.loading
);

export const isCategoryMenuShow = createSelector(
  foodMenuSelector,
  (foodMenu) => foodMenu.showCategory
);

export const getCategories = createSelector(
  foodMenuSelector,
  (foodMenu) => foodMenu.categories
);

export const getCategoryNames = createSelector(foodMenuSelector, (foodMenu) =>
  foodMenu.categories.map((cat) => cat.name)
);

export const getFeaturedItems = createSelector(getCategories, (categories) => {
  if (categories.length > 1) {
    return categories[1].menuItems;
  }
  if (categories.length === 1) {
    return categories[0].menuItems;
  } else {
    return [];
  }
});

export const getCategoryIndex = createSelector(
  foodMenuSelector,
  (foodMenu) => foodMenu.categoryIndex
);

export const getCurrCategory = createSelector(
  getCategories,
  getCategoryIndex,
  (categories, index) => {
    if (categories.length <= index || index < 0) {
      return null;
    }
    return categories[index];
  }
);

export const getAllItems = createSelector(getCategories, (categories) =>
  categories.map((category) => category.menuItems).flat()
);

export const getAllItemDict = createSelector(getAllItems, (items) =>
  items.reduce((dict, item) => {
    return { ...dict, [item.id]: item };
  }, {})
);

export const getItemById = createSelector(
  getAllItemDict,
  (_, id) => id,
  (itemDict, id) => {
    console.log(itemDict);
    console.log(id);
    return itemDict[id];
  }
);

export const getFilteredItems = createSelector(
  isLoading,
  getCurrCategory,
  (loading, category) => (loading ? [] : category.menuItems)
);
// export const getAllFoodItems = createSelector(
//   isLoading,
//   getCurrCategory,
//   (loading, category) => (loading ? [] : category.menuItems)
// );

export const itemIsDisplayed = createSelector(
  foodMenuSelector,
  (foodMenu) => foodMenu.displayingItem != null
);

export const getDisplayedItem = createSelector(
  foodMenuSelector,
  (foodMenu) => foodMenu.displayingItem
);

export const getDisplayedItemAddons = createSelector(
  getDisplayedItem,
  getAddonGroups,
  (displayedItem, addonGroups) => {
    if (displayedItem == null) {
      return [];
    }
    return addonGroups.filter((group) =>
      displayedItem.addonGroupIds.includes(group.id)
    );
  }
);
