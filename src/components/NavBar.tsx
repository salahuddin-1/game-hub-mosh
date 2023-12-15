import { Box, HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack padding="20px">
      {/* <Image src={logo} boxSize="50px"></Image> */}
      <Text letterSpacing={3} fontSize="large" as="b" whiteSpace="nowrap">
        R A W G
      </Text>

      <Box paddingX="30px" width="100%">
        <SearchInput onSearch={onSearch} />
      </Box>

      <ColorModeSwitch></ColorModeSwitch>
    </HStack>
  );
};

export default NavBar;
