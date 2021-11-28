import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getOrderItemInfo } from "store/Order/selector";
import { changeQuantity, removeOrderItem } from "store/Order/reducer";
import React from "react";
import AWSImage from "components/Menu/AWSItemImage";

const OrderItemImage = styled(AWSImage)`
  height: 50px;
  width: 50px;
  margin-right: 10px;
  margin-top: 10px;
  object-fit: cover;
  border: 1mm ridge lightgrey;
  border-radius: 0.41rem;
`;

const QuantityPicker = styled(TextField)`
  width: 80px;
`;

function OrderItem(props) {
  const { order, editable } = props;
  const dispatch = useDispatch();
  const totalPrice =
    (order.itemPrice +
      order.addons.reduce((sum, addon) => sum + addon.price, 0)) *
    order.quantity;
  const handleQuantityChange = (event) => {
    if (event.target.value > 0 && event.target.value !== order.quantity) {
      dispatch(
        changeQuantity({
          orderKey: order.orderKey,
          quantity: event.target.value,
        })
      );
    }
  };

  const handleDelete = () => {
    dispatch(removeOrderItem({ orderKey: order.orderKey }));
  };

  return (
    <ListItem alignItems="flex-start">
      <OrderItemImage src={order.imageUrl} alt="" />
      <div>
        <ListItemText
          primary={
            <Typography variant="body1" color="textPrimary">
              {order.itemName} - ${totalPrice.toFixed(2)}
            </Typography>
          }
          secondary={
            <React.Fragment>
              {order.addons.map((addon) => (
                <Typography variant="body2" color="textSecondary">
                  - {addon.name}
                </Typography>
              ))}
              {order.specialInstruction && (
                <Typography variant="body2" color="textSecondary">
                  ** {order.specialInstruction}
                </Typography>
              )}
            </React.Fragment>
          }
        />

        <Box
          display={editable ? "flex" : "none"}
          alignItems="stretch"
          justifyContent="space-between"
        >
          <QuantityPicker
            type="number"
            variant="outlined"
            size="small"
            value={order.quantity}
            onChange={handleQuantityChange}
          />
          <Button
            disableRipple
            size="small"
            color="secondary"
            onClick={handleDelete}
          >
            Remove
          </Button>
        </Box>
      </div>
    </ListItem>
  );
}

function Order(props) {
  const orderItems = useSelector(getOrderItemInfo);
  const { editable } = props;

  return (
    <List dense>
      {orderItems.map((order) => (
        <OrderItem order={order} editable={editable} />
      ))}
    </List>
  );
}

export default Order;
