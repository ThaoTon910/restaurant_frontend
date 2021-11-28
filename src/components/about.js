import { Box, ListSubheader, GridList, GridListTile } from "@material-ui/core";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";
import Cart from "./Menu/Cart";

const MyH2 = styled.h2`
  font-family: "Lucida Handwriting", cursive;
  margin: 10px;
  font-size: 60px;
  padding: 15px 20px;
  border-radius: 10px;
  color: #ff3399;
  font-weight: 400;
`;
const AboutText = styled.p`
  color: navy;
  text-indent: 20px;
  text-transform: uppercase;
  font-size: 20px;
`;
const MyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  margin-top: 15px;
  margin-bottom: 30px;
`;

function About() {
  return (
    <Box minHeight="100vh" flexDirection="column" display="flex">
      <Navbar />
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        color="text.primary"
        align-items="stretch"
      >
        <MyDiv>
          <MyH2> Welcome to Pho 28 Website </MyH2>
          <AboutText>
            THIS ECOMMERCE WEBSITE WAS BUILT AND DEVELOPED AS A SENJOR PROJECT
            AT SAN JOSE UNIVERSITY, FALL 2021.
            <h2> Group members:</h2>
            <ul>
              <li> Yong Gui Huang (CMPE)</li>
              <li> Quang Nguyen (SE) </li>
              <li> Thao Ton (CMPE)</li>
              <li> Hoang Tran (CMPE)</li>
            </ul>
          </AboutText>
        </MyDiv>
      </Box>

      <Footer />
    </Box>
  );
}

export default About;
