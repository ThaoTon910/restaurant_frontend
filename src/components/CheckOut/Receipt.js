import React, { useState } from "react";
import { Box, Button, Link, Divider } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import OrderInfo from "components/CheckOut/OrderInfo";
import {
  getCustomerInfo,
  getReceiptUrl,
  getPickupTime,
  getClientSecret,
  orderSelector,
} from "store/Order/selector";
import { merchantSelector } from "store/Merchant/selector";

import { fetchReceiptUrl, submitOrder } from "store/Order/reducer";
// import { StripeCardElementChangeEvent, StripeError } from "@stripe/stripe-js";
// import { useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";

const MyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  // margin-top: 15px;
  // margin-bottom: 30px;
  max-width: 700px;
`;

const FormContainer = styled.div`
  padding-top: 0.1rem;
  margin: auto;
  margin-left: 1.5rem;
  width: 100%;
  flex-direction: column;
`;

const SubmitButton = styled(Button)`
  padding: 10px;
`;

function Receipt({ onFinished }) {
  const dispatch = useDispatch();

  const customerInfo = useSelector(getCustomerInfo);
  const receiptUrl = useSelector(getReceiptUrl);
  const clientSecret = useSelector(getClientSecret);
  const pickupTimeStr = useSelector(getPickupTime);
  const order = useSelector(orderSelector);
  const merchant = useSelector(merchantSelector);
  const today = new Date();

  const onSubmitClicked = async () => {
    if (onFinished) {
      onFinished();
    }
  };

  useEffect(() => {
    // console.log(order);
    dispatch(fetchReceiptUrl());
  }, []);

  return (
    <Box>
      <MyContainer>
        <FormContainer>
          <h2 align="center" color="brown">
            {merchant.name}{" "}
          </h2>
          <h3>
            Just wanted to say thank you for your purchase. <br /> We’re so
            lucky to have customers like you!
          </h3>
          <p>
            Name: {`${customerInfo.firstname} ${customerInfo.surname}`} <br />
            Email: {customerInfo.email} <br />
            Phone: {customerInfo.phone} <br />
            Order date:{" "}
            {today.getMonth() +
              "-" +
              today.getDate() +
              "-" +
              today.getFullYear() +
              ", at " +
              today.getHours() +
              ":" +
              today.getMinutes()}{" "}
            <br />
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
          <Divider />
          <br />
          <Link href={receiptUrl} rel="noopener noreferrer" target="_blank">
            <Button variant="contained" disabled={receiptUrl === ""}>
              View receipt
            </Button>
          </Link>
        </FormContainer>

        <OrderInfo editable="false"></OrderInfo>
      </MyContainer>

      <SubmitButton
        onClick={onSubmitClicked}
        color="primary"
        fullWidth
        variant="contained"
      >
        Finish
      </SubmitButton>
    </Box>
  );
}

export default Receipt;
