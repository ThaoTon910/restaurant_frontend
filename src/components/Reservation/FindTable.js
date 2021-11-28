import { Box, Button, MenuItem, Select } from "@material-ui/core";
import styled from "styled-components";
import { useState } from "react";

const SelectRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 4;
  justify-content: center;
  margin-top: 2rem;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;

const AvailableTimeButton = styled(Button)`
  width: 22%;
`;

const StyledSelect = styled((props) => (
  <Select {...props} classes={{ root: "select-root" }}>
    {" "}
    {props.children}{" "}
  </Select>
))`
  & > .select-root {
    color: #673ab7;
    min-width: 100px;
    background: white;
    font-weight: 200;
    padding-top: 14px;
    border: 1px solid rgb(225, 225, 225);
    padding-left: 24px;
    padding-bottom: 15px;
  }
`;

function FindATable({ onFinished }) {
  const [isFindTable, setFindTable] = useState(false);
  const [reserSize, setReserSize] = useState(1);
  const [reserDay, setReserDay] = useState(1);
  const today = new Date();
  let date = [];

  const dates = [];
  for (let i = 0; i < 31; i++) {
    today.setDate(today.getDate() + 1);
    date =
      1 + today.getMonth() + "-" + today.getDate() + "-" + today.getFullYear();
    dates.push({ label: date, value: i });
  }

  const partySizes = [
    { label: "1 person", value: 1 },
    { label: "2 people", value: 2 },
    { label: "3 people", value: 3 },
    { label: "4 people", value: 4 },
    { label: "5 people", value: 5 },
    { label: "10 people", value: 6 },
    { label: "20 people", value: 6 },
    { label: "30 people", value: 6 },
  ];

  const hours = [
    { label: "10:00 AM", value: 0 },
    { label: "12:00 PM", value: 1 },
    { label: "2:00 PM", value: 2 },
    { label: "4:00 PM", value: 3 },
    { label: "6:00 PM", value: 4 },
    { label: "8:00 PM", value: 5 },
  ];

  const findAvailableTime = (event) => {
    setFindTable(true);
  };

  return (
    <Box>
      <SelectRow>
        <StyledSelect
          name="partySize"
          value={reserSize}
          onChange={(event) => {
            setReserSize(event.target.value);
          }}
          disableUnderline
        >
          {partySizes.map(({ label, value }) => {
            return <MenuItem value={value}> {label} </MenuItem>;
          })}
        </StyledSelect>

        <StyledSelect
          disableUnderline
          value={reserDay}
          onChange={(event) => {
            setReserDay(event.target.value);
          }}
        >
          {dates.map(({ label, value }) => {
            return <MenuItem value={value}> {label} </MenuItem>;
          })}
        </StyledSelect>

        {/* <StyledSelect
          disableUnderline
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={0}
          onChange={() => {}}
          label="Date"
        >
          {hours.map(({ label, value }) => {
            return <MenuItem value={value}> {label} </MenuItem>;
          })}
        </StyledSelect> */}

        <Button
          onClick={findAvailableTime}
          variant="contained"
          size="small"
          color="primary"
        >
          Find a table
        </Button>
      </SelectRow>
      {isFindTable && (
        <ButtonRow>
          {hours.map((hour) => (
            <AvailableTimeButton variant="outlined" onClick={onFinished}>
              {hour.label}
            </AvailableTimeButton>
          ))}
        </ButtonRow>
      )}
    </Box>
  );
}

export default FindATable;
