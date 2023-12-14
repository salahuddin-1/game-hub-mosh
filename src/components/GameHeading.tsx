import { Heading } from "@chakra-ui/react";

interface Props {
  genre: string;
  platform: string;
}

const GameHeading = ({ platform, genre }: Props) => {
  return (
    <Heading fontSize={60}>
      {platform} {genre} Games
    </Heading>
  );
};

export default GameHeading;
