import { CircularProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { merchantIsLoading, merchantSelector } from "store/Merchant/selector";
import styled from "styled-components";
import moment from "moment";

const FooterContainer = styled.div`
    height: 20vh;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: rgb(42, 65, 44);
    align-items: center
`

const HoursContainer = styled.div`
    height: 95%;
    flex-grow: 1;
    text-align: center;
    color: white;
`;
const ContactContainer = styled.div`
    height: 95%;
    flex-grow: 1;
    text-align: center;
    color: white;
`
const CopyrightContainer = styled.div`
    height: 95%;
    display: flex;
    flex-grow: 2;
    align-items: flex-end;    
    justify-content: center;
    color: white;
`

function Footer() {
    const isLoading = useSelector(merchantIsLoading);
    const merchant = useSelector(merchantSelector);
    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <FooterContainer>
            <ContactContainer>
            <Typography variant="h6" gutterBottom>
                    Contact us
                </Typography>
                <Typography variant="body1">
                    {merchant.name}
                </Typography>
                <Typography variant="body1">
                    {merchant.phone}
                </Typography>
                <Typography variant="body1">
                    {merchant.address}
                </Typography>
            </ContactContainer>

            <CopyrightContainer>
                <Typography variant="body1" gutterBottom>
                   {merchant.name} | Copyright 2021 All rights reserved
                </Typography>
            </CopyrightContainer>

            <HoursContainer>
                <Typography variant="h6" gutterBottom>
                    HOURS
                </Typography>
                {merchant.hours.map(hour => 
                    (
                    <Typography variant="body1">
                        {hour.day} : {moment(hour.start, "HH:mm:ss").format("LT")} - {moment(hour.end, "HH:mm:ss").format("LT")}
                    </Typography>
                    )
                )}
               
            </HoursContainer>
        </FooterContainer>
    );
}

export default Footer;