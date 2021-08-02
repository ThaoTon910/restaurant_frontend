import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Menu, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux'
import React from "react";
import { AmplifySignOut } from '@aws-amplify/ui-react';

import styled from "styled-components";
import { logOut } from "../store/auth/reducer";
import { userLoggedIn, getUserName } from "../store/auth/selector";

const StyledAppBar = styled(AppBar)`
    background-color: rgb(42, 65, 44);
    color: white;
`

const Title = styled(Typography)`
    margin: 0.5rem;
`

const MenuGroup = styled.div`
    flex-grow: 1;
` 


const MorePopup = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
      <Button color="inherit" onClick={handleClick}>
        <h3>More</h3>
      </Button>
      <Menu
        id="more-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Option1</MenuItem>
        <MenuItem onClick={handleClose}>Option2</MenuItem>
        <MenuItem onClick={handleClose}>Option3</MenuItem>
      </Menu>
    </React.Fragment>
    )
}


function Navbar() {
    const history = useHistory();
    const userIsLoggedIn = useSelector(userLoggedIn);
    const username = useSelector(getUserName);
    let userSection;
    const dispatch = useDispatch();
    if (!userIsLoggedIn) {
        userSection = (
            <React.Fragment>
                <Button color="inherit" onClick={() => history.push('/register')}><h3>Login / Register</h3></Button>

            </React.Fragment>
        )
    } else {
        userSection = (
            <React.Fragment>
                <Button color="inherit" onClick={() => { }}><h3>Hello, {username}!</h3></Button>

                <AmplifySignOut />

            </React.Fragment>
        )
    }

    return (
        <StyledAppBar position="sticky" color="inherit">
            <Toolbar>
                <Title variant="h4" onClick={() => history.push('/')}>
                    PHO 28
                </Title>

                <MenuGroup>                    
                    <Button color="inherit" onClick={() => history.push('/menu')}><h3>Menu</h3></Button>
                    <Button color="inherit"onClick={() => history.push('/Promotions')}><h3>Promos</h3></Button>
                    <Button color="inherit"  onClick={() => history.push('/reservation')}><h3>Reservation</h3></Button>
                    <Button color="inherit"><h3>Reward</h3></Button>
                    <MorePopup />
                </MenuGroup>

                {userSection}

            </Toolbar>
        </StyledAppBar>
    );
}

export default Navbar;