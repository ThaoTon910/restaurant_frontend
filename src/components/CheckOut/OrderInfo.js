import { Divider, List } from "@material-ui/core";
import styled from "styled-components";
import Order from "components/Menu/Order";
import { PriceDisplay } from "components/Menu/Cart";

const OrderContainer = styled.div`
  width: 40%;
  align-items: stretch;
  padding-left: 30px;
`;

const OrderList = styled(List)`
  height: 300px;
  overflow: scroll;
`;
function OrderInfo({ onFinished }) {
  return (
    <OrderContainer>
      <p>
        ORDER SUMMARY
        <OrderList>
          <Order editable={false} />
        </OrderList>
      </p>
      <Divider></Divider>
      <PriceDisplay />
    </OrderContainer>
  );
}

export default OrderInfo;
