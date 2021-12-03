import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box, List, Input, Button } from "@material-ui/core";
import styled from "styled-components";
import FoodMenuItem from "components/Menu/MenuItem";
import FoodItemModal from "components/Menu/FoodItemModal";
import CategoryPickerMobile from "components/Menu/CategoryPickerMobile";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryMenu } from "store/FoodMenu/reducer";

import {
  getFilteredItems,
  isLoading,
  getCategories,
  isCategoryMenuShow,
  getAllItems,
} from "store/FoodMenu/selector";
import { orderIsEmpty } from "store/Order/selector";
import Cart from "components/Menu/Cart";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const MyBox = styled(Box)`
  minheight: 100vh;
  margin-top: 5rem;
  flexdirection: column;
  display: flex;
  align-item: center;
  height: auto;
`;
const MainContainer = styled.div`
  display: stretch;
  padding: 1rem 1rem;
  flex-grow: 1;
  margin: auto;
  align-items: center;
  vertical-align: sub;

  flex-direction: column;
  // flex: 0 1 100vw;
  justify-content: center;
  min-width: 100%;
  // background-color: red;
`;

const CheckOutContainer = styled.div`
  // border: 3px solid brown;
  display: flex;
  flex: 0 1 40vw;
  overflow: scroll;
  margin-top: 1rem;
  padding: 0 1rem;
  border-radius: 1rem;
  margin: auto;
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
const CheckOutButton = styled(Button)`
  background-color: rgb(221, 187, 74);
  border-radius: 10px;
  display: none;
  @media (max-width: 1100px) {
    display: block;
  }
  &:hover {
    background-color: rgb(255, 195, 0);
    font-size: 150%;
  }
`;

function MenuMobile() {
  const history = useHistory();
  const foodMenuItems = useSelector(getFilteredItems);
  const showLoading = useSelector(isLoading);
  const CategoryMenuShow = useSelector(isCategoryMenuShow);
  const cartIsEmpty = useSelector(orderIsEmpty);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategoryMenu(true));
  }, []);

  return (
    <React.Fragment>
      {/* <FoodItemModal /> */}

      <MyBox>
        <Navbar />

        <MainContainer>
          {/* <SearchBar
            label="Search"
            variant="filled"
            fullWidth
            disableUnderline
          /> */}

          {cartIsEmpty ? (
            <> </>
          ) : (
            <CheckOutContainer>
              <CheckOutButton
                variant="contained"
                fullWidth
                onClick={() => {
                  history.push("/checkout");
                }}
              >
                Checkout
              </CheckOutButton>
            </CheckOutContainer>
          )}

          <MenuListContainer>
            {showLoading && <h1>LOADING....</h1>}
            {CategoryMenuShow ? <CategoryPickerMobile /> : <></>}

            <FoodItemModal />
            {CategoryMenuShow ? (
              <></>
            ) : (
              <List>
                {foodMenuItems.map((item) => (
                  <FoodMenuItem key={item.id} item={item} />
                ))}
              </List>
            )}
          </MenuListContainer>
        </MainContainer>
        {/* <Footer /> */}
      </MyBox>
    </React.Fragment>
  );
}

export default MenuMobile;
