import { Badge } from "@chakra-ui/react";

interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  const getColor = (): string => {
    if (score > 75) {
      return "green";
    }

    if (score > 60) {
      return "yellow";
    }

    return "";
  };

  return (
    <Badge
      fontSize="14px"
      paddingX={2}
      borderRadius="4px"
      colorScheme={getColor()}
    >
      {score}
    </Badge>
  );
};

export default CriticScore;
