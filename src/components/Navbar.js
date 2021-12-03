import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography, Menu, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import styled from "styled-components";
import { setCategoryMenu } from "store/FoodMenu/reducer";
import {
  userLoggedIn,
  getUserName,
  getUser,
  authSelector,
} from "../store/auth/selector";
import { isMobile } from "react-device-detect";

const StyledAppBar = styled(AppBar)`
  background-color: rgb(42, 65, 44);
  color: white;
  width: 100%;
`;

const Title = styled(Typography)`
  margin: 0.5rem;
  font-size: 2.5rem;
  font-family: Copperplate, fantasy, monospace;
  @media (max-width: 500px) {
    color: #ff3399;
    font-size: 1.2rem;
    margin-left: 0;
    margin-right: 0;
  }
`;

const myH3 = styled.h3`
  margin: 0.5rem;
  font-weight: 400;
  font-family: Copperplate, fantasy, monospace;
  @media (max-width: 500px) {
    font-size: 0.5px;
  }
`;
const MyButton = styled(Button)`
//padding: 0.5rem 2rem;
transition: background 500ms ease;
width: 20%
@media (min-width: 720px) {
  font-size: 0.5rem;}
&:hover {
    background-color: #FF9933;
    font-size: 110%;   
`;
const MyButtonReservation = styled(Button)`
  //padding: 0.5rem 2rem;
  transition: background 500ms ease;
  @media (max-width: 720px) {
    display: none;
  }
`;
const MyButtonAbout = styled(Button)`
  //padding: 0.5rem 2rem;
  transition: background 500ms ease;
`;

const MenuGroup = styled.div`
  flex-grow: 1;
  width: 70%;
  @media (max-width: 500px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

function Navbar() {
  const history = useHistory();
  const userIsLoggedIn = useSelector(userLoggedIn);
  const username = useSelector(getUserName);
  const dispatch = useDispatch();
  let userSection;
  if (!userIsLoggedIn) {
    userSection = (
      <React.Fragment>
        <Button color="inherit" onClick={() => history.push("/login")}>
          <h5>Login / Register</h5>
        </Button>
      </React.Fragment>
    );
  } else {
    userSection = (
      <React.Fragment>
        <Button color="inherit" onClick={() => history.push("/orders")}>
          <h5>Hello, {username}!</h5>
        </Button>

        <AmplifySignOut />
      </React.Fragment>
    );
  }

  const handleMenu = () => {
    dispatch(setCategoryMenu(true));
    history.replace("/menumobile");
  };

  return (
    <StyledAppBar color="inherit">
      <Toolbar>
        <Title
          variant="h4"
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/")}
        >
          Pho28
        </Title>

        <MenuGroup>
          {isMobile ? (
            <MyButton color="inherit" onClick={handleMenu}>
              <myH3>Menu</myH3>{" "}
            </MyButton>
          ) : (
            <MyButton color="inherit" onClick={() => history.push("/menu")}>
              <myH3>Menu</myH3>{" "}
            </MyButton>
          )}

          <MyButton color="inherit" onClick={() => history.push("/Promotions")}>
            <myH3>Promos</myH3>
          </MyButton>
          <MyButtonReservation
            color="inherit"
            onClick={() => history.push("/reservation")}
          >
            <myH3>Reservation</myH3>
          </MyButtonReservation>
          <MyButtonAbout color="inherit" onClick={() => history.push("/about")}>
            <myH3>About</myH3>
          </MyButtonAbout>
        </MenuGroup>

        {userSection}
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;

// const MorePopup = () => {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <React.Fragment>
//       <MyButton color="inherit" onClick={handleClick}>
//         <h3>More</h3>
//       </MyButton>
//       <Menu
//         id="more-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>Option1</MenuItem>
//         <MenuItem onClick={handleClose}>Option2</MenuItem>
//         <MenuItem onClick={handleClose}>Option3</MenuItem>
//       </Menu>
//     </React.Fragment>
//   );
// };
