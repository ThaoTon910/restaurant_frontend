import React, { useEffect } from "react";
import { Box, List, Input } from "@material-ui/core";
import styled from "styled-components";
import FoodMenuItem from "components/Menu/MenuItem";
import FoodItemModal from "components/Menu/FoodItemModal";
import CategoryPicker from "components/Menu/CategoryPicker";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredItems, isLoading } from "store/FoodMenu/selector";
import Cart from "components/Menu/Cart";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const MainContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-grow: 1;
  margin: 5vh 10vw;
  align-items: stretch;
  flex-direction: row;
`;

const MiddleContainer = styled.div`
  height: 75vh;
  display: flex;
  flex-grow: 1;
  margin-left: 10px;
  margin-right: 10px;
  flex-direction: column;
`;

const MenuListContainer = styled.div`
  flex-grow: 1;
  overflow: scroll;
  margin-top: 1rem;
  padding: 0 1rem;
`;
const SearchBar = styled(Input)`
  border-radius: 1.5rem;
  flex-basis: 1rem;
  border: 2px solid grey;
  padding: 0.5rem;
  font-size: 25px;
`;

const CartContainer = styled.div`
  border: 2px solid grey;
  border-radius: 1rem;

  height: 75vh;
  flex-basis: 350px;
`;

function Menu() {
  const foodMenuItems = useSelector(getFilteredItems);
  const showLoading = useSelector(isLoading);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <FoodItemModal />

      <Box minHeight="100vh" flexDirection="column" display="flex">
        <Navbar />
        <MainContainer>
          <CategoryPicker />

          <MiddleContainer>
            <SearchBar
              label="Search"
              variant="filled"
              fullWidth
              disableUnderline
            />
            <MenuListContainer>
              {showLoading && <h1>LOADING</h1>}
              <List>
                {foodMenuItems.map((item) => (
                  <FoodMenuItem key={item.id} item={item} />
                ))}
              </List>
            </MenuListContainer>
          </MiddleContainer>

          <CartContainer>
            <Cart />
          </CartContainer>
        </MainContainer>
        <Footer />
      </Box>
    </React.Fragment>
  );
}

export default Menu;
