import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  promotionSelector,
  promotionIsLoading,
} from "store/Promotion/selector";
import { useDispatch, useSelector } from "react-redux";
import AWSImage from "components/Menu/AWSItemImage";
import styled from "styled-components";
import moment from "moment";

const MyContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-width: 600px;
`;

function Promotions(props) {
  const promos = useSelector(promotionSelector);

  return (
    <Box minHeight="100vh" flexDirection="column" display="flex">
      <Navbar />
      {/* <Box
        flexGrow={1}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        color="text.primary"
      > */}
      <MyContainer>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            object-fit="cover"
            component="img"
            alt="Pho 28 Active Promotion"
            width="400"
            height="500"
            image={promos.promotions[0].imageUrl}
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              {promos.promotions[0].description} .
            </Typography>
            <Typography gutterBottom variant="h7">
              USE THIS CODE TO GET A BIG DISCOUNT AND ENJOY YOUR FOOD!
            </Typography>

            <Typography variant="button" display="block" variant="h2">
              {promos.promotions[0].promoCode}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              (Start:
              {moment(promos.promotions[0].startDate).format("MM/DD/YYYY")} to
              {moment(promos.promotions[0].endDate).format("MM/DD/YYYY")}
            </Typography>
          </CardContent>
        </Card>
      </MyContainer>
      <Footer />
    </Box>
  );
}

export default Promotions;
