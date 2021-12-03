import { Divider, List } from "@material-ui/core";
import styled from "styled-components";
import Order from "components/Menu/Order";
import { PriceDisplay } from "components/Menu/Cart";

const OrderContainer = styled.div`
  // margin: auto;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // text-align: center;
`;

const OrderList = styled(List)`
  height: 30vh;
  overflow: scroll;
`;
function OrderInfo(props) {
  let isEdit = props.editable;
  return (
    <OrderContainer>
      <p>
        ORDER SUMMARY
        <Divider />
        <OrderList>
          <Order editable={isEdit} />
        </OrderList>
      </p>
      <Divider></Divider>
      <PriceDisplay />
    </OrderContainer>
  );
}

export default OrderInfo;
