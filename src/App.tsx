import { Button, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "main aside"`, // wider than 1024px
      }}
    >
      <GridItem area="nav">
        <NavBar></NavBar>
      </GridItem>

      {/* Show this component only if the width is >= lg (wider than 1024px) */}
      <Show above="lg">
        <GridItem area="aside">Aside</GridItem>
      </Show>

      <GridItem area="main">Main</GridItem>
    </Grid>
  );
}

export default App;
