import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const SortSelector = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: Relevence
      </MenuButton>
      <MenuList>
        <MenuItem> Date Added </MenuItem>
        <MenuItem> Name </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
