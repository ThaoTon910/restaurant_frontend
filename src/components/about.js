import { Box, ListSubheader, GridList, GridListTile } from "@material-ui/core";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";
import Cart from "./Menu/Cart";
import { isMobile } from "react-device-detect";

const MyH2 = styled.h2`
  text-align: center;
  font-family: "Lucida Handwriting", cursive;
  margin: 20px;
  font-size: 60px;
  padding: 1rem 2rem;
  color: #ff3399;
  font-weight: 400;
`;
const AboutText = styled.p`
  text-align: center;
  color: navy;
  text-indent: 20px;
  text-transform: uppercase;
  font-size: 20px;
`;
const MyDiv = styled.div`
  display: inline-block;
  flex-direction: column;
  align-items: stretch;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;
const UlNoBullet = styled.ul`
  list-style-type: none;
  padding-left: 0px;
`;

function About() {
  return (
    <Box
      minHeight="100vh"
      flexDirection="column"
      display="stetch"
      margin="auto"
      align-items="center"
    >
      <Navbar />
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        padding="1rem 2rem"
      >
        <MyDiv>
          <MyH2> Welcome to Pho 28 Website </MyH2>
          <AboutText>
            THIS ECOMMERCE WEBSITE WAS BUILT AND DEVELOPED AS A SENJOR PROJECT
            AT SAN JOSE UNIVERSITY, FALL 2021.
            <h2> Group members:</h2>
            <UlNoBullet text-align="center">
              <li> Yong Gui Huang (CMPE)</li>
              <li> Quang Nguyen (SE) </li>
              <li> Thao Ton (CMPE)</li>
              <li> Hoang Tran (CMPE)</li>
            </UlNoBullet>
          </AboutText>
        </MyDiv>
      </Box>
      {isMobile ? <></> : <Footer />}
    </Box>
  );
}

export default About;
