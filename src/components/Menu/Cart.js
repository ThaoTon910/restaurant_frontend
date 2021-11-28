import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Order from "components/Menu/Order";
import {
  getSubtotal,
  getTip,
  getTotal,
  getTax,
  orderIsEmpty,
  getTipMultiplier,
  getDiscount,
  getPercentOff,
  orderSelector,
} from "store/Order/selector";
import { setTip } from "store/Order/reducer";
import { useHistory } from "react-router-dom";

export function PriceDisplay() {
  const dispatch = useDispatch();
  const subtotal = useSelector(getSubtotal);
  const tipMultiplier = useSelector(getTipMultiplier);
  const tipAmount = useSelector(getTip);
  const taxAmount = useSelector(getTax);
  const discountAmount = useSelector(getDiscount);
  const total = useSelector(getTotal);
  return (
    <List dense>
      <ListItem>
        <ListItemText primary="Subtotal"></ListItemText>
        <ListItemSecondaryAction>
          ${subtotal.toFixed(2)}
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem>
        <ListItemText
          primary="Tip"
          secondary={
            <Select
              value={tipMultiplier}
              onChange={(event) => {
                dispatch(setTip(event.target.value));
              }}
            >
              <MenuItem value={0.1}> 10% </MenuItem>
              <MenuItem value={0.15}> 15% </MenuItem>
              <MenuItem value={0.2}> 20% </MenuItem>
              <MenuItem value={0.0}> No tip </MenuItem>
            </Select>
          }
        >
          {" "}
        </ListItemText>
        <ListItemSecondaryAction>
          ${tipAmount.toFixed(2)}
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem>
        <ListItemText primary="Taxes "></ListItemText>
        <ListItemSecondaryAction>
          {" "}
          ${taxAmount.toFixed(2)}
        </ListItemSecondaryAction>
      </ListItem>
      {discountAmount !== 0.0 ? (
        <ListItem>
          <ListItemText primary="Discount "></ListItemText>
          <ListItemSecondaryAction>
            {" "}
            ${discountAmount.toFixed(2)}
          </ListItemSecondaryAction>
        </ListItem>
      ) : (
        <></>
      )}

      <Divider></Divider>
      <ListItem>
        <h1>
          <ListItemText primary="Order Total"></ListItemText>
        </h1>
        <ListItemSecondaryAction> ${total.toFixed(2)}</ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

function Cart() {
  const history = useHistory();
  const cartIsEmpty = useSelector(orderIsEmpty);
  return (
    <Box
      height="70vh"
      padding="1rem"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <div>
        <b>Shopping Cart </b>
        {cartIsEmpty ? (
          <p>You don't have any items in your cart.</p>
        ) : (
          <div>
            <Box height="60vh" overflow="scroll" marginY="20px">
              <Order editable={true} /> <PriceDisplay />
              <Divider />
            </Box>
            <Divider></Divider>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                history.push("/checkout");
              }}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
}

export default Cart;
