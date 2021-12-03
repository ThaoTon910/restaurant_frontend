import React, { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  LinearProgress,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import OrderInfo from "components/CheckOut/OrderInfo";
// import CreditCardInput from "react-credit-card-input";
import { useDispatch, useSelector } from "react-redux";
import { getCardInfo, getOrderId } from "store/Order/selector";
import {
  setCardInfo,
  setClientSecret,
  submitOrder,
  submitCashPaidOrder,
} from "store/Order/reducer";
// import { paymentIntent } from "store/Order/api";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CardField from "components/CheckOut/CardField";
import { StripeCardElementChangeEvent, StripeError } from "@stripe/stripe-js";
// import { ConsoleLogger } from "@aws-amplify/core";
import { useState } from "react";

const MyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
  margin-top: 15px;
  margin-bottom: 30px;
`;

const FormContainer = styled.div`
  width: 60%;
  padding-right: 30px;
`;

const SubmitButton = styled(Button)`
  padding: 10px;
`;

const MyText = styled.p`
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 20px;
`;

function Payment({ onFinished }) {
  const stripe = useStripe();
  const element = useElements();
  const [loading, setLoading] = useState(false);
  const [isPayByCash, setPayByCash] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const currentOrderId = useSelector(getOrderId);
  const cardInfo = useSelector(getCardInfo);
  const dispatch = useDispatch();
  const { handleSubmit, control, setError, clearErrors } = useForm({
    defaultValues: cardInfo,
  });
  const [value, setValue] = React.useState("credit");

  useEffect(() => {
    dispatch(submitOrder()).then((result) =>
      setClientSecret(result.payload.payment.clientSecret)
    );
  }, []);

  const handleChange = (event) => {
    if (event.target.value === "cash") {
      setPayByCash(true);
    } else {
      setPayByCash(false);
    }
    setValue(event.target.value);
  };

  const onSubmit = async (data) => {
    // console.log("setPayByCash", isPayByCash);

    if (isPayByCash) {
      dispatch(submitCashPaidOrder(currentOrderId)).then(() => onFinished());
    } else {
      setLoading(true);
      const cardElement = element.getElement(CardElement);
      if (cardElement) {
        const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });
        if (payload.error) {
          // console.log("Error", payload.error);
        } else {
          // console.log("Success", payload);
          onFinished();
        }
      }
    }
    setLoading(false);
  };

  const clearErrorsBeforeChange = (changeHandler) => (e) => {
    clearErrors();
    changeHandler(e);
  };

  return (
    <Box>
      <form>
        <MyContainer>
          <FormContainer>
            <RadioGroup value={value} onChange={handleChange}>
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="Paypal"
              />
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              <FormControlLabel
                value="credit"
                control={<Radio />}
                label="Credit/Debit card"
              />
            </RadioGroup>
            {value === "paypal" && (
              <Box>
                <MyText>
                  You will be redirected to PayPal to authorize payment, once
                  you return you will be able to complete the order.
                </MyText>
              </Box>
            )}
            {value === "cash" && (
              <Box>
                <MyText>
                  Please make the payment at the counter / cashier to finish
                  this order!. Your order will be hold for you in next 6 hours!
                </MyText>
              </Box>
            )}
            {value === "credit" && (
              <div>
                <CardField />
              </div>
            )}
          </FormContainer>

          <OrderInfo editable="false"></OrderInfo>
        </MyContainer>

        <Divider variant="middle" />

        {loading ? (
          <LinearProgress color="secondary" />
        ) : (
          <SubmitButton
            onClick={handleSubmit(onSubmit)}
            color="primary"
            fullWidth
            variant="contained"
          >
            {isPayByCash ? "Make Payement At Cashier" : "Confirm Payment"}
          </SubmitButton>
        )}
      </form>
    </Box>
  );
}

export default Payment;
