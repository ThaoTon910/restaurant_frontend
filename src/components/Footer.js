import { CircularProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { merchantIsLoading, merchantSelector } from "store/Merchant/selector";
import styled from "styled-components";
import moment from "moment";
import { isMobile } from "react-device-detect";

const FooterContainer = styled.div`
  height: 30vh;
  padding: 10px;
  display: flex;
  background-color: rgb(42, 65, 44);
  align-items: center;
  min-width: 620px;

  color: white;
`;

const MapContainer = styled.div`
  height: 90%;
  flex-grow: 1;
  text-align: center;
  color: white;
`;

const HoursContainer = styled.div`
  height: 90%;
  flex-grow: 1;
  text-align: center;
  color: white;
`;
const ContactContainer = styled.div`
  height: 95%;
  flex-grow: 1;
  text-align: center;
  color: white;
`;
const CopyrightContainer = styled.div`
  height: 95%;
  display: flex;
  flex-grow: 2;
  align-items: flex-end;
  justify-content: center;
  color: white;
`;

function Footer() {
  const isLoading = useSelector(merchantIsLoading);
  const merchant = useSelector(merchantSelector);
  const str = merchant.address.split(" ");
  let searchText = "%20";
  for (let i = 0; i < str.length; i++) {
    searchText += str[i] + "%20";
  }
  searchText = searchText.slice(0, searchText.length - 3);
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <FooterContainer color="inherit">
      {isMobile ? (
        <></>
      ) : (
        <ContactContainer>
          <Typography variant="h6" gutterBottom>
            Contact us
          </Typography>
          <Typography variant="body1">{merchant.name}</Typography>
          <Typography variant="body1">{merchant.phone}</Typography>
          <Typography variant="body1">{merchant.address}</Typography>
        </ContactContainer>
      )}

      <MapContainer>
        <iframe
          id="gmap_canvas"
          src={
            "https://maps.google.com/maps?q=1" +
            searchText +
            "&t=&z=13&ie=UTF8&iwloc=&output=embed"
          }
        ></iframe>

        <Typography variant="body1" gutterBottom>
          {merchant.name} | Copyright 2021 All rights reserved
        </Typography>
      </MapContainer>

      {isMobile ? (
        <h2></h2>
      ) : (
        <HoursContainer>
          <Typography variant="h6" gutterBottom>
            HOURS
          </Typography>
          {merchant.hours.map((hour) => (
            <Typography variant="body1">
              {hour.day} : {moment(hour.start, "HH:mm:ss").format("LT")} -{" "}
              {moment(hour.end, "HH:mm:ss").format("LT")}
            </Typography>
          ))}
        </HoursContainer>
      )}
    </FooterContainer>
  );
}

export default Footer;
