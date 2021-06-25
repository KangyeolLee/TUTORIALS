import { Image, GridItem } from "@chakra-ui/react";
import { VFC } from "react";

type Props = {
  src: string;
};

const ImageListItem: VFC<Props> = ({ src }) => {
  return (
    <GridItem>
      <Image
        fallbackSrc="https://via.placeholder.com/150"
        src={src}
        alt="youngung-image"
        objectFit="cover"
        boxSize="100%"
      />
    </GridItem>
  );
};

export default ImageListItem;
