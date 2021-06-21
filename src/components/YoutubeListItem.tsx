import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { VFC } from "react";
import { Link } from "react-router-dom";

type Props = {
  time: string;
  title: string;
  video: string;
  thumbnail: string;
};

const YoutubeListItem: VFC<Props> = ({ time, title, video, thumbnail }) => {
  return (
    <Link
      to={{
        pathname: `youtube/${video}`,
        state: { title },
      }}
    >
      <HStack
        spacing={4}
        p={4}
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
        _hover={{
          background: `gray.200`,
        }}
      >
        <Box minW="80px">
          <Image
            boxSize="80px"
            objectFit="contain"
            alt="youtube thumbnail"
            src={thumbnail}
            fallbackSrc="https://via.placeholder.com/150"
          />
        </Box>

        <Box flex={1} overflow="hidden">
          <Text fontSize="md" noOfLines={2}>
            {title}
          </Text>
        </Box>
      </HStack>
    </Link>
  );
};

export default YoutubeListItem;
