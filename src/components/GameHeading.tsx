import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const heading = (): string => {
    const platform = gameQuery.platform?.name ?? "";
    const genre = gameQuery.genre?.name ?? "";

    return `${genre} ${platform} Games`;
  };

  return <Heading as="h1">{heading()}</Heading>;
};

export default GameHeading;
