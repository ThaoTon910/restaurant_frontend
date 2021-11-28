import React, { useState } from "react";
import { Box, Button, Link } from "@material-ui/core";
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
import { fetchReceiptUrl, submitOrder } from "store/Order/reducer";
// import { StripeCardElementChangeEvent, StripeError } from "@stripe/stripe-js";
// import { useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";

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

function Receipt({ onFinished }) {
  const dispatch = useDispatch();

  const customerInfo = useSelector(getCustomerInfo);
  const receiptUrl = useSelector(getReceiptUrl);
  const clientSecret = useSelector(getClientSecret);
  const pickupTimeStr = useSelector(getPickupTime);
  const order = useSelector(orderSelector);

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
            Pho 28 <br />
            2569 King Road <br />
            Suite C9 <br />
            San Jose, California 95122 United States <br /> <br />
            Your order will be ready <br />
            {moment(pickupTimeStr).calendar()} <br />
            Pickup instructions <br />
            Customers pick up orders inside the restaurant. <br />
          </p>

          <br />
          <Link href={receiptUrl} rel="noopener noreferrer" target="_blank">
            <Button variant="contained" disabled={receiptUrl === ""}>
              View receipt
            </Button>
          </Link>
        </FormContainer>

        <OrderInfo></OrderInfo>
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
