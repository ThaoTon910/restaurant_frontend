import { Box, Typography, ListItem } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { displayItem } from "store/FoodMenu/reducer";
import AWSImage from "components/Menu/AWSItemImage";

const MenuItemContainer = styled(ListItem)`
  height: 200px;
  display: flex;
  align-items: stretch !important;
  border: 1px solid grey;
  border-radius: 0.5rem;
  box-shadow: inset 0 0 5px grey;
`;

const MenuItemImage = styled(AWSImage)`
  height: 160px;
  width: 160px;
  object-fit: cover;
  border: 2mm ridge lightgrey;
  border-radius: 0.5rem;
`;

function MenuItem(props) {
  const { item } = props;
  const dispatch = useDispatch();

  const myProps = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1rem",
  };

  return (
    <MenuItemContainer onClick={() => dispatch(displayItem(item))}>
      <Box {...myProps}>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">{item.name}</Typography>
          </Box>
          <Typography variant="body2">{item.description}</Typography>
        </Box>
        <Typography variant="h6">${item.price}</Typography>
      </Box>

      <Box>
        <MenuItemImage src={item.imageUrl} />
      </Box>
    </MenuItemContainer>
  );
}

export default MenuItem;
