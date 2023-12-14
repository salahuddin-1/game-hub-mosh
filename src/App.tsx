import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

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
        <NavBar
          onSearch={(searchText) => {
            setGameQuery({ ...gameQuery, searchText: searchText });
          }}
        ></NavBar>
      </GridItem>

      {/* Show this component only if the width is >= lg (wider than 1024px) */}
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelectedGenre={(genre) =>
              setGameQuery({ ...gameQuery, genre: genre })
            }
          />
        </GridItem>
      </Show>

      <GridItem area="main">
        <Box paddingLeft="10px" marginBottom="20px" marginTop="20px">
          <GameHeading
            genre={gameQuery.genre?.name ?? ""}
            platform={gameQuery.platform?.name ?? ""}
          />
        </Box>

        <HStack spacing={5} paddingLeft="10px" marginBottom={5}>
          <PlatformSelector
            selectedPlatform={gameQuery.platform}
            onSelectedPlatform={(platform) => {
              setGameQuery({ ...gameQuery, platform: platform });
            }}
          />

          <SortSelector
            sortOrder={gameQuery.sortOrder}
            onSelectedSortOrder={(order) => {
              setGameQuery({ ...gameQuery, sortOrder: order });
            }}
          />
        </HStack>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
