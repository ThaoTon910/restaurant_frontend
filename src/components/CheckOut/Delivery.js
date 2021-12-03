import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import styled from "styled-components";
import OrderInfo from "components/CheckOut/OrderInfo";
// import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setPickupTime, setPickupTimeOption } from "store/Order/reducer";
import { getPickupTime, getPickupTimeOption } from "store/Order/selector";
// import { getMerchant } from "store/Merchant/reducer";
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

const DeliverySelector = styled(FormControl)`
  width: 100%;
`;

const MyText = styled.p`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
`;

function Delivery({ onFinished }) {
  const dispatch = useDispatch();
  const merchant = useSelector(merchantSelector);
  const [deliveryOption, setDeliveryOption] = useState("Pickup");
  const storePickupTimeOption = useSelector(getPickupTimeOption);
  const [pickUpTimeOption, setFormPickUpTimeOption] = useState(
    storePickupTimeOption
  );
  const storePickupTime = useSelector(getPickupTime);
  const earliestTime = moment().add(30, "minutes").format().slice(0, 16);
  const [pickupTime, setFormPickupTime] = useState(earliestTime);
  const [pickupTimeError, setPickupTimeError] = useState("");

  const validatePickupTime = (pickupTime) => {
    return moment(pickupTime).isAfter(
      moment(earliestTime).subtract(1, "minutes"),
      "minute"
    );
  };

  const onSubmit = () => {
    const pickupTimeIsValid = validatePickupTime(pickupTime);
    if (pickupTimeIsValid) {
      dispatch(setPickupTime(pickupTime));
      onFinished();
    }
  };

  useEffect(() => {
    if (storePickupTime && validatePickupTime(storePickupTime)) {
      setFormPickupTime(storePickupTime);
    }
  }, []);

  useEffect(() => {
    const pickupTimeIsValid = validatePickupTime(pickupTime);
    if (pickupTimeIsValid) {
      setPickupTimeError("");
    } else {
      setPickupTimeError("Invalid Pickup Time");
    }
  }, [pickupTime]);

  useEffect(() => {
    if (pickUpTimeOption === "now") {
      setFormPickupTime(earliestTime);
    }
    dispatch(setPickupTimeOption(pickUpTimeOption));
  }, [pickUpTimeOption]);

  return (
    <Box>
      <MyContainer>
        <FormContainer>
          <DeliverySelector>
            <InputLabel>Delivery option</InputLabel>
            <Select
              value={deliveryOption}
              onChange={(event) => {
                setDeliveryOption(event.target.value);
              }}
            >
              <MenuItem value="Pickup">Pickup</MenuItem>
              <MenuItem value="Doordash">DoorDash</MenuItem>
              <MenuItem value="Grubhub">Grubhub</MenuItem>
              <MenuItem value="Ubereats">Ubereats</MenuItem>
            </Select>
          </DeliverySelector>
          {deliveryOption === "Pickup" && (
            <Box>
              <p>Pickup at</p>
              <MyText>{merchant.name}</MyText>
              <MyText>{merchant.address}</MyText>
              <MyText>{merchant.phone}</MyText>
              <RadioGroup
                value={pickUpTimeOption}
                onChange={(event) => {
                  setFormPickUpTimeOption(event.target.value);
                }}
              >
                <FormControlLabel
                  value="now"
                  control={<Radio />}
                  label="As soon as possible"
                />
                <FormControlLabel
                  value="later"
                  control={<Radio />}
                  label="Schedule for later"
                />
              </RadioGroup>

              {pickUpTimeOption === "later" && (
                <Box>
                  <TextField
                    label="Pickup time"
                    type="datetime-local"
                    error={pickupTimeError !== ""}
                    helperText={pickupTimeError !== "" && "Invalid pickup time"}
                    value={pickupTime}
                    onChange={(event) => setFormPickupTime(event.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              )}
              {(pickUpTimeOption === "now" || pickUpTimeOption === "later") && (
                <Box>
                  <MyText>Your order will be ready</MyText>
                  <MyText>{moment(pickupTime).calendar()}</MyText>
                  <MyText>
                    Customers pick up orders inside the restaurant.
                  </MyText>
                </Box>
              )}
            </Box>
          )}

          {["Doordash", "Grubhub", "Ubereats"].includes(deliveryOption) && (
            <Box>
              <MyText>
                <br />
                <h2>This option is coming soon !</h2>
              </MyText>
            </Box>
          )}
        </FormContainer>

        <OrderInfo editable="false"></OrderInfo>
      </MyContainer>

      <Divider variant="middle" />
      <SubmitButton
        onClick={onSubmit}
        color="primary"
        fullWidth
        variant="contained"
      >
        {" "}
        Next{" "}
      </SubmitButton>
    </Box>
  );
}

export default Delivery;
