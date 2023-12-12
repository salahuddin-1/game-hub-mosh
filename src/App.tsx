import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";

function App() {
  // {useState<Genre | null>(null)} it can be null or Genre, instead of
  // Genre? it's a union type
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`, // wider than 1024px
      }}
      // for {templateColumns} The base is set to 1fr, which means on mobile we'll not divide the space
      // and whole body will be at 100% width
      // On desktop, we'll divide the space into 2 sections, i.e. 200px and 1fr
      // 1st section will have fixed width of 200px and 2nd section will take the rest of the space
      templateColumns={{
        base: "1fr", // 1fr = 1 fraction
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar></NavBar>
      </GridItem>

      {/* Show this component only if the width is >= lg (wider than 1024px) */}
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList onSelectedGenre={(genre) => setSelectedGenre(genre)} />
        </GridItem>
      </Show>

      <GridItem area="main">
        <GameGrid selectedGenre={selectedGenre} />
      </GridItem>
    </Grid>
  );
}

export default App;
