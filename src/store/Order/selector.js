import { createSelector } from "@reduxjs/toolkit";
import { getAllItemDict, getAllAddonDict } from "store/FoodMenu/selector";
import { getMerchantId } from "store/Merchant/selector";
import creditCardType from "credit-card-type";

export const orderSelector = (state) => state.order;

export const getOrderItems = createSelector(
  orderSelector,
  (order) => order.items
);

export const getOrderId = createSelector(orderSelector, (order) => order.id);

export const getReceiptUrl = createSelector(
  orderSelector,
  (order) => order.receiptUrl
);

export const orderNeedsReset = createSelector(
  getOrderItems,
  getAllItemDict,
  getAllAddonDict,
  (orderDict, itemDict, addonDict) => {
    let needReset = false;
    Object.entries(orderDict).forEach(([orderKey, order]) => {
      const { itemId, addonIds } = order;
      if (!itemDict[itemId]) {
        needReset = true;
      }
      for (const id of addonIds) {
        if (!addonDict[id]) {
          needReset = true;
        }
      }
    });
    return needReset;
  }
);

export const getOrderItemInfo = createSelector(
  getOrderItems,
  getAllItemDict,
  getAllAddonDict,
  (orderDict, itemDict, addonDict) => {
    return Object.entries(orderDict)
      .filter(([orderKey, order]) => {
        const { itemId, addonIds } = order;
        if (!itemDict[itemId]) {
          return false;
        }

        for (const id of addonIds) {
          if (!addonDict[id]) {
            return false;
          }
        }
        return true;
      })
      .map(([orderKey, order]) => {
        const { itemId, addonIds, quantity, specialInstruction } = order;
        const foundItem = itemDict[itemId];
        const foundAddons = addonIds.map((id) => {
          return {
            id,
            name: addonDict[id].name,
            price: addonDict[id].price,
          };
        });

        return {
          orderKey: orderKey,
          itemId: foundItem.id,
          itemName: foundItem.name,
          itemPrice: foundItem.price,
          quantity: quantity,
          addons: foundAddons,
          specialInstruction,
        };
      });
  }
);

export const getSubtotal = createSelector(getOrderItemInfo, (orders) =>
  orders.reduce((sum, order) => {
    const pricePerItem =
      order.itemPrice +
      order.addons.reduce((sum, addon) => sum + addon.price, 0);
    return sum + pricePerItem * order.quantity;
  }, 0)
);

export const getTipMultiplier = createSelector(
  orderSelector,
  (orders) => orders.tipMultiplier
);

export const getTip = createSelector(
  getTipMultiplier,
  getSubtotal,
  (tipMultiplier, subtotal) => tipMultiplier * subtotal
);

export const getTaxMultiplier = createSelector(
  orderSelector,
  (order) => order.taxMultiplier
);

export const getTax = createSelector(
  getTaxMultiplier,
  getSubtotal,
  (taxMultiplier, subtotal) => subtotal * taxMultiplier
);
export const getPercentOff = createSelector(
  orderSelector,
  (order) => order.percent_off
);

export const getDiscount = createSelector(
  getPercentOff,
  getSubtotal,
  (percent_off, subtotal) => subtotal * percent_off
);

export const getTotal = createSelector(
  getSubtotal,
  getTip,
  getTax,
  getDiscount,

  (subtotalAmount, tipAmount, taxAmount, discountAmount) =>
    subtotalAmount + tipAmount + taxAmount - discountAmount
);

export const orderIsEmpty = createSelector(
  getOrderItems,
  (orderItem) => Object.keys(orderItem).length === 0
);

export const getCustomerInfo = createSelector(
  orderSelector,
  (order) => order.customerInfo
);

export const getPaymentInfo = createSelector(
  orderSelector,
  (order) => order.paymentInfo
);

export const getCardInfo = createSelector(
  getPaymentInfo,
  (paymentInfo) => paymentInfo.cardInfo
);

export const getClientSecret = createSelector(
  getPaymentInfo,
  (paymentInfo) => paymentInfo.clientSecret
);

export const getCreditCardText = createSelector(getCardInfo, (cardInfo) => {
  const { cardNum, expiry } = cardInfo;
  const cardMatches = creditCardType(cardNum.replace(/\s/g, ""));
  const cardType =
    cardMatches.length > 0 ? cardMatches[0].niceType : "Credit card";
  const secondaryText =
    cardMatches.length > 0
      ? ` ending in ${cardNum.split(" ").pop()} (Exp. ${expiry})`
      : "";
  return cardType + secondaryText;
});
export const getDeliveryInfo = createSelector(
  orderSelector,
  (order) => order.delivery
);

export const getPickupTime = createSelector(
  orderSelector,
  (order) => order.delivery.pickup.time
);

export const getPickupTimeOption = createSelector(
  orderSelector,
  (order) => order.delivery.pickup.option
);

export const getPromocode = createSelector(
  orderSelector,
  (order) => order.promoCode
);

export const getOrderData = createSelector(
  getCustomerInfo,
  getOrderItemInfo,
  getTipMultiplier,
  getTaxMultiplier,
  getDeliveryInfo,
  getPaymentInfo,
  getMerchantId,
  getPromocode,
  (
    customerInfo,
    orderItemInfo,
    tipMultiplier,
    taxMultiplier,
    deliveryInfo,
    paymentInfo,
    merchantId,
    promoCode
  ) => {
    const orderItems = orderItemInfo.map((itemInfo) => {
      return {
        menuItemId: itemInfo.itemId,
        addOns: itemInfo.addons.map((addonInfo) => addonInfo.id),
        quantity: itemInfo.quantity,
        specialInstruction: itemInfo.specialInstruction,
      };
    });
    const customer = {
      firstName: customerInfo.firstname,
      email: customerInfo.email,
      phone: customerInfo.phone,
      lastName: customerInfo.surname,
    };
    if (customerInfo.id !== "") {
      customer.id = customerInfo.id;
    }

    const delivery = {
      deliveryFee: 0,
      info: {
        deliveryType: "pickup",
        time: deliveryInfo.pickup.time,
        merchantId: merchantId,
      },
    };

    return {
      customer,
      delivery,
      items: orderItems,
      tipMultiplier,
      taxMultiplier,
      promoCode,
    };
  }
);
