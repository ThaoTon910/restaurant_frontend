import React, { useState } from "react";
import { Box, Button, Divider, TextField } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import OrderInfo from "components/CheckOut/OrderInfo";
import {
  getCardInfo,
  getClientSecret,
  getCustomerInfo,
  getPickupTime,
} from "store/Order/selector";
import { submitPromoCode, setPromoCode } from "store/Order/reducer";
import { merchantSelector } from "store/Merchant/selector";

const MyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
  margin-top: 15px;
  margin-bottom: 30px;
`;

const FormContainer = styled.div`
  width: 50%;
  padding-right: 30px;
`;

const SubmitButton = styled(Button)`
  padding: 10px;
`;

function ReviewSubmit({ onFinished }) {
  const dispatch = useDispatch();
  const customerInfo = useSelector(getCustomerInfo);
  const pickupTimeStr = useSelector(getPickupTime);
  const cardElement = useSelector(getCardInfo);
  const clientSecret = useSelector(getClientSecret);

  const merchant = useSelector(merchantSelector);
  const onSubmitClicked = async () => {
    if (onFinished) {
      onFinished();
    }
  };
  const onSubmitPromoCode = async () => {
    dispatch(submitPromoCode());
  };
  return (
    <Box>
      <h1>{clientSecret}</h1>
      <MyContainer>
        <FormContainer>
          <p>Your details:</p>
          <p>
            {customerInfo.email} <br />
            {`${customerInfo.firstname} ${customerInfo.surname}`} <br />
            {customerInfo.phone} <br />
            Order updates will be sent by text message
          </p>
          <p>
            Delivery option: <br />
            Pickup at: <br />
            {merchant.name} <br />
            {merchant.address} <br />
            Your order will be ready <br />
            {moment(pickupTimeStr).calendar()} <br />
            Pickup instructions <br />
            Customers pick up orders inside the restaurant. <br />
          </p>
          <br />
          <Divider />
          <br />
          Coupon code:
          <Box>
            <TextField
              id="couponCode"
              label="Enter the coupon code"
              onChange={(event) => dispatch(setPromoCode(event.target.value))}
              variant="outlined"
            />
            <SubmitButton
              onClick={onSubmitPromoCode}
              color="secondary"
              variant="contained"
            >
              Apply Code
            </SubmitButton>
          </Box>
        </FormContainer>

        <OrderInfo></OrderInfo>
      </MyContainer>

      <SubmitButton
        onClick={onSubmitClicked}
        color="primary"
        fullWidth
        variant="contained"
      >
        Place your Order
      </SubmitButton>
    </Box>
  );
}

export default ReviewSubmit;
