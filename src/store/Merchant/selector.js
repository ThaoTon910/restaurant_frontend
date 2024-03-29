import { createSelector } from "reselect";


export const merchantSelector = state => state.merchant;
export const merchantIsLoading = createSelector(
    merchantSelector,
    (merchant) => merchant.loading
)

export const getMerchantId = createSelector(
    merchantSelector,
    (merchant) => merchant.id
)