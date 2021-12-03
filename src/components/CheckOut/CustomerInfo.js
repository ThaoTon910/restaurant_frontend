import { Box, Button, Divider, TextField } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import OrderInfo from "components/CheckOut/OrderInfo";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerInfo } from "store/Order/selector";
import { setCustomerInfo } from "store/Order/reducer";
import React from "react";
import "react-phone-input-2/lib/material.css";
// import { useEffect } from "react";

const MyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  // margin-top: 15px;
  // margin-bottom: 30px;
  max-width: 700px;
`;

const InfoTextField = styled(TextField)`
  margin-bottom: 20px !important;
`;

const FormContainer = styled.div`
  width: 50%;
`;

const SubmitButton = styled(Button)`
  padding: 10px;
`;

function CustomerInfo({ onFinished }) {
  const customer = useSelector(getCustomerInfo);
  const { handleSubmit, control, setError, clearErrors } = useForm({
    defaultValues: customer,
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(setCustomerInfo(data));
    onFinished();
  };

  return (
    <Box>
      {/* <Box bgcolor="primary.main"> */}
      <form>
        <MyContainer>
          <FormContainer>
            <Controller
              control={control}
              rules={{ required: true }}
              name="firstname"
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { invalid, isTouched },
              }) => {
                return (
                  <InfoTextField
                    fullWidth
                    variant="outlined"
                    error={invalid}
                    helperText={invalid && "Field is required"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    innerRef={ref}
                    label="First name"
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="surname"
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { invalid, isTouched },
              }) => {
                return (
                  <InfoTextField
                    fullWidth
                    variant="outlined"
                    error={invalid}
                    helperText={invalid && "Field is required"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    innerRef={ref}
                    label="Surname"
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              }}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { invalid, isTouched, error },
              }) => {
                let errorText = "";
                if (error?.type === "required") {
                  errorText = "Email is required.";
                } else if (error?.type === "pattern") {
                  errorText = "Email is invalid.";
                }
                return (
                  <InfoTextField
                    fullWidth
                    variant="outlined"
                    error={invalid}
                    helperText={invalid && errorText}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    label="email"
                    innerRef={ref}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="phone"
              rules={{
                required: true,
                validate: (value) => {
                  if (value.match(/12345/)) {
                    return "Invalid value: " + value;
                  } else if (value.match(/1234/)) {
                    return false;
                  } else {
                    return true;
                  }
                },
              }}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { invalid, isTouched, error },
              }) => {
                return (
                  <PhoneInput
                    country={"us"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    isValid={!invalid}
                  />
                );
              }}
            />
          </FormContainer>

          <OrderInfo editable="true"></OrderInfo>
        </MyContainer>

        <Divider variant="middle" />
        <SubmitButton
          onClick={handleSubmit(onSubmit)}
          color="primary"
          fullWidth
          variant="contained"
        >
          {" "}
          Next{" "}
        </SubmitButton>
      </form>
    </Box>
  );
}

export default CustomerInfo;
