import {
  Box,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Modal,
} from "@material-ui/core";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { ConsoleLogger } from "@aws-amplify/core";

const MyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
  margin-top: 15px;
  margin-bottom: 30px;
`;

const InfoTextField = styled(TextField)`
  margin-bottom: 10px;
`;

const FormContainer = styled.div`
  width: 50%;
  padding-right: 30px;
`;
const OrderContainer = styled.div`
  width: 50%;
  align-items: stretch;
  padding-left: 30px;
`;
const CheckBoxLabel = styled((props) => (
  <FormControlLabel {...props} classes={{ label: "checkbox-label" }} />
))`
  margin-top: 20px;

  & > .checkbox-label {
    font-size: 0.8rem;
  }
`;

const SubmitButton = styled(Button)`
  padding: 10px;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ReserCustomerInfo({ onFinished }) {
  let history = useHistory();
  const customer = "";
  const { handleSubmit, control } = useForm({
    defaultValues: customer,
  });
  function handleClose() {
    history.push("/");
  }
  return (
    <Box>
      <MyContainer>
        <FormContainer>
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

          <form>
            <InfoTextField
              fullWidth
              id="outlined-basic"
              label="Add a special request"
            />

            <CheckBoxLabel
              control={<Checkbox checked name="checkedA" />}
              label="Yes, I want to get text updates and reminders about my bookings.*"
            />
            <CheckBoxLabel
              control={<Checkbox checked name="checkedB" />}
              label="This restaurant  will call me to confirm my infomation.*"
            />
          </form>
        </FormContainer>

        <OrderContainer>
          <Typography variant="h6" gutterBottom>
            Your reservation at Pho28
          </Typography>
          <Divider />
          <Box padding={2}>
            <Typography variant="body1" gutterBottom>
              Please give us your contact information. We will call you at the
              provided phone number to confirm your booking and prices.
            </Typography>
            <Divider /> <Divider /> <Divider /> <Divider />{" "}
            <Typography variant="body1" gutterBottom>
              Thank you very much for chooing our restaurant!
            </Typography>
          </Box>
        </OrderContainer>
      </MyContainer>

      <Divider variant="middle" />
      <SubmitButton
        onClick={handleClose}
        color="primary"
        fullWidth
        variant="contained"
      >
        Confirm booking
      </SubmitButton>
    </Box>
  );
}

export default ReserCustomerInfo;
