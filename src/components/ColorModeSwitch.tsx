import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  // The useColorMode hook returns an object with two properties: colorMode and toggleColorMode.
  // This hook is defined in @chakra-ui/react.
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        isChecked={colorMode === "dark"} // if colorMode is dark, then isChecked is true
        onChange={() => toggleColorMode()}
        colorScheme="green"
      ></Switch>
      <Text>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
