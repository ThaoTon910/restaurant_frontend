import {
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import Navbar from "../Navbar";
import FindATable from "./FindTable";
import ReserCustomerInfo from "./CustomerInfo";
import { useState } from "react";

const StyledCard = styled(Card)`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const StyledTabs = styled((props) => {
  return <Tabs {...props} classes={{ indicator: "indicator" }}></Tabs>;
})`
  background-color: rgb(245, 245, 245);
  box-shadow: 0.3em 0.3em 0.5em rgba(0, 0, 0, 0.2);
  padding-right: 30%;
  && .indicator {
    background-color: #1f6ff7;
  }
`;

const StyledTab = styled(Tab)`
  font-weight: bold;
`;

function Reservation() {
  const steps = ["1. Find a table", "2. Your details"];

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Box minHeight="100vh" flexDirection="column" display="flex">
      <Navbar />
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="space-around"
        color="text.primary"
        paddingTop="5vh"
      >
        <Box minWidth="630px" maxWidth="35vw">
          <Box marginBottom="20px">
            <Typography variant="h3">Booking at Pho28</Typography>
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
              {steps.map((step) => (
                <StyledTab label={step} />
              ))}
            </StyledTabs>
            <CardContent>
              {currentStep === 0 ? (
                <FindATable onFinished={() => setCurrentStep(1)} />
              ) : (
                <ReserCustomerInfo />
              )}
            </CardContent>
          </StyledCard>
        </Box>
      </Box>
    </Box>
  );
}

export default Reservation;
