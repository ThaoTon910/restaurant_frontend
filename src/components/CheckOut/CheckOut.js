import {
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import Navbar from "components/Navbar";
import CustomerInfo from "components/CheckOut/CustomerInfo";
import Delivery from "components/CheckOut/Delivery";
import Payments from "components/CheckOut/Payment";
import ReviewSubmit from "components/CheckOut/ReviewSubmit";
import Receipt from "components/CheckOut/Receipt";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { orderIsEmpty } from "store/Order/selector";
import { resetOrder } from "store/Order/reducer";

const stripePromise = loadStripe(
  "pk_test_51Jno9iJtWODUig1GQTrVSLriYSeOdgTh1wrAxt8suv95JuJu1LUDCjpv3Lp6kpWZlAP2dW2NPBPi8MemvYxzhG8J00sVV0Dwcj"
);

const MainContainer = styled.div`
  display: flex;
  padding: 4rem;
  margin: 2rem 3rem;
  align-items: stretch;
  flex-grow: 1 1 auto;
  flex-direction: column;
  align-items: center;
  @media (max-width: 720px) {
    width: 300p;
  }
`;

const MainBox = styled(Box)`
  min-width: 450px;
  max-width: 45vw;
`;

const StyledCard = styled(Card)`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const StyledTabs = styled((props) => {
  return <Tabs {...props} classes={{ indicator: "indicator" }}></Tabs>;
})`
  background-color: rgb(245, 245, 245);
  box-shadow: 0.3em 0.3em 0.5em rgba(0, 0, 0, 0.2);
  && .indicator {
    background-color: #1f6ff7;
  }
`;

const StyledTab = styled(Tab)`
  font-weight: bold;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function CheckOut() {
  const history = useHistory();
  const steps = [
    "1. Your information",
    "2. Delivery options",
    "3. Confirm Information",
    "4. Payment",
    "5. Receipt",
  ];
  const emptyCart = useSelector(orderIsEmpty);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  if (emptyCart) {
    history.push("/menu");
  }

  const onCheckoutFinished = () => {
    dispatch(resetOrder());
    history.push("/orders");
  };

  return (
    <React.Fragment>
      <Box minHeight="100vh" flexDirection="column" display="flex">
        <Navbar />
        <MainContainer>
          <MainBox>
            <Box marginBottom="0.5rem" marginTop="0.5rem">
              <Typography variant="h3" align="center">
                Check out
              </Typography>
            </Box>
            <StyledCard>
              <StyledTabs
                value={currentStep}
                onChange={(e, newStep) => {
                  setCurrentStep(newStep);
                }}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                {steps.map((step, index) => (
                  <StyledTab
                    disabled={
                      index > currentStep || (currentStep === 4 && index !== 4)
                    }
                    label={step}
                  />
                ))}
              </StyledTabs>

              <CardContent>
                <Elements stripe={stripePromise}>
                  <TabPanel value={currentStep} index={0}>
                    <CustomerInfo onFinished={() => setCurrentStep(1)} />
                  </TabPanel>
                  <TabPanel value={currentStep} index={1}>
                    <Delivery onFinished={() => setCurrentStep(2)} />
                  </TabPanel>
                  <TabPanel value={currentStep} index={2}>
                    <ReviewSubmit onFinished={() => setCurrentStep(3)} />
                  </TabPanel>
                  <TabPanel value={currentStep} index={3}>
                    <Payments onFinished={() => setCurrentStep(4)} />
                  </TabPanel>
                  <TabPanel value={currentStep} index={4}>
                    <Receipt onFinished={onCheckoutFinished} />
                  </TabPanel>
                </Elements>
              </CardContent>
            </StyledCard>
          </MainBox>
        </MainContainer>
      </Box>
    </React.Fragment>
  );
}

export default CheckOut;
