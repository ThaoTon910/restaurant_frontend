import { createSelector } from "reselect";

export const promotionSelector = (state) => state.promotion;
export const promotionIsLoading = createSelector(
  promotionSelector,
  (promotion) => promotion.loading
);
