import { Image, ImageProps } from "@chakra-ui/react";
import grin from "../assets/grin_face_emoji.png";
import horns from "../assets/horns_emoji.png";
import heart from "../assets/heart_emoji.png";

interface Props {
  rating: number;
}

const Emoji = ({ rating }: Props) => {
  if (rating < 3) {
    return null;
  }

  const emojiMap: { [key: number]: ImageProps } = {
    3: {
      src: grin,
      alt: "meh",
    },
    4: {
      src: horns,
      alt: "recommended",
    },
    5: {
      src: heart,
      alt: "exceptional",
    },
  };

  return <Image marginTop={5} {...emojiMap[rating]} boxSize="25px"></Image>;
};

export default Emoji;
