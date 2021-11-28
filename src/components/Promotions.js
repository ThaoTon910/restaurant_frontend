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

const PreviewImage = styled(AWSImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
`;

function Promotions(props) {
  const promos = useSelector(promotionSelector);
  //const isLoading = useSelector(promotionIsLoading);

  // console.log("PROMOS:", promos);
  // const imageUrl = "https://tinyurl.com/2p9yx76m";
  return (
    <Box minHeight="100vh" flexDirection="column" display="flex">
      <Navbar />
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        color="text.primary"
      >
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
      </Box>
      <Footer />
    </Box>
  );
}

export default Promotions;
