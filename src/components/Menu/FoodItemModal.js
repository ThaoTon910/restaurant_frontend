import {
  Box,
  Grid,
  GridList,
  GridListTile,
  FormControl,
  Modal,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Typography,
  FormLabel,
  Divider,
  FormGroup,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  itemIsDisplayed,
  getDisplayedItem,
  getDisplayedItemAddons,
} from "store/FoodMenu/selector";
import { hideItem } from "store/FoodMenu/reducer";
import React, { useEffect, useState } from "react";
import { addOrder } from "store/Order/reducer";
import { Storage } from "aws-amplify";
import AWSImage from "components/Menu/AWSItemImage";

const MyModal = styled(Modal)`
  margin: auto;
  width: 70vw;
  min-width: 600px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: stretch;
  padding: 2rem;
  height: 100%;
  overflow: scroll;
`;

const LeftContainer = styled.div`
  width: 60%;
`;

const RightContainer = styled.div`
  width: 35%;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 600px;
  border: 1px solid rgb(205, 205, 205);
  border-radius: 25px;
`;

const GalleryList = styled(GridList)`
  margin: 10px;
  max-height: 580px;
`;
const QuantityPicker = styled(TextField)`
  width: 4rem;
`;

const OrderButton = styled(Button)`
  margin-left: 1rem !important;
`;

const PreviewContainer = styled.div`
  display: block;
  padding-bottom: 100%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
`;

const PreviewImage = styled(AWSImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
`;

const DisplayedImage = styled(AWSImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function AddonPicker(props) {
  const { addonGroup, onAddonChange } = props;
  const [pickedAddons, setPickedAddons] = useState({});
  const isRequired = addonGroup.minQuantity === 1;
  const pickOneOnly = addonGroup.maxQuantity === 1;
  useEffect(() => {
    if (isRequired && addonGroup.addons.length > 0) {
      setPickedAddons({
        [addonGroup.addons[0].id]: true,
      });
    }
  }, []);

  useEffect(() => {
    onAddonChange(
      Object.keys(pickedAddons).filter((addonId) => pickedAddons[addonId])
    );
  }, [pickedAddons]);

  const handleChange = (event) => {
    if (pickOneOnly) {
      setPickedAddons({ [event.target.value]: true });
    } else {
      setPickedAddons({
        ...pickedAddons,
        [event.target.name]: event.target.checked,
      });
    }
  };

  const getAddonLabel = (addon) =>
    `${addon.name} ${addon.price !== 0 ? `(+$${addon.price})` : ""}`;

  if (!pickOneOnly) {
    return (
      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">{addonGroup.name}</FormLabel>
        <FormGroup>
          {addonGroup.addons.map((addon) => (
            <FormControlLabel
              control={<Checkbox name={addon.id} onChange={handleChange} />}
              label={getAddonLabel(addon)}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  } else {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{addonGroup.name}</FormLabel>
        <RadioGroup
          defaultValue={
            isRequired && addonGroup.addons.length > 0
              ? addonGroup.addons[0].id
              : ""
          }
        >
          {addonGroup.addons.map((addon) => (
            <FormControlLabel
              control={<Radio />}
              onChange={handleChange}
              value={addon.id}
              label={getAddonLabel(addon)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
}

function FoodItemModal() {
  const modalOpen = useSelector(itemIsDisplayed);
  const item = useSelector(getDisplayedItem);
  const addonGroups = useSelector(getDisplayedItemAddons);
  const dispatch = useDispatch();
  const [quantity, updateQuantity] = useState(1);
  const [specialInstruction, setSpecialInstruction] = useState("");
  const [pickedAddons, setPickedAddons] = useState({});

  useEffect(() => {
    setPickedAddons({});
    setSpecialInstruction("");
  }, [item]);

  const handleOrder = () => {
    const addons = Object.values(pickedAddons).flat();
    dispatch(addOrder({ item, quantity, addons, specialInstruction }));
    dispatch(hideItem());
  };

  const handleClose = () => dispatch(hideItem());

  const handleAddonChange = (groupId) => (addons) => {
    setPickedAddons({
      ...pickedAddons,
      [groupId]: addons,
    });
  };

  if (!item) {
    return <></>;
  }

  return (
    <MyModal
      BackdropProps={{ invisible: true }}
      open={modalOpen}
      onClose={handleClose}
    >
      <MainContainer>
        <LeftContainer>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="stretch"
          >
            <Grid item xs={2}>
              <GalleryList cellHeight="auto" cols={1}>
                <GridListTile>
                  <PreviewContainer>
                    <PreviewImage src={item.imageUrl} alt="" />
                  </PreviewContainer>
                </GridListTile>
              </GalleryList>
            </Grid>

            <Grid item xs={9}>
              <ImageContainer>
                <DisplayedImage src={item.imageUrl} alt="" />
              </ImageContainer>
            </Grid>
          </Grid>
        </LeftContainer>

        <RightContainer>
          <Typography variant="h4">{item && item.name}</Typography>
          <Typography variant="h5" gutterBottom>
            ${item && item.price}
          </Typography>
          {addonGroups.map((group) => (
            <Box marginY="30px">
              <AddonPicker
                addonGroup={group}
                onAddonChange={handleAddonChange(group.id)}
              />
            </Box>
          ))}

          <TextField
            label="Special instructions"
            onChange={(event) => setSpecialInstruction(event.target.value)}
            multiline
            rows={2}
            variant="outlined"
          />
          <Box marginY="20px" display="flex" alignItems="stretch">
            <QuantityPicker
              label="Count"
              value={quantity}
              InputLabelProps={{
                shrink: true,
              }}
              type="number"
              defaultValue={1}
              variant="outlined"
              onChange={(event) => updateQuantity(parseInt(event.target.value))}
            />
            <OrderButton
              variant="contained"
              onClick={handleOrder}
              color="primary"
            >
              Add to cart
            </OrderButton>
          </Box>
          <Box height="150px" />
        </RightContainer>
      </MainContainer>
    </MyModal>
  );
}

export default FoodItemModal;
