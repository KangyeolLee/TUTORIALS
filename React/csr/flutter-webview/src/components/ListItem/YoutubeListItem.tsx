import { Box, HStack, Image, Text, Center } from "@chakra-ui/react";
import { VFC } from "react";
import { Link } from "react-router-dom";

type Props = {
  time: string;
  title: string;
  video: string;
  thumbnail: string;
  isClicked?: boolean;
};

const YoutubeListItem: VFC<Props> = ({
  time,
  title,
  video,
  thumbnail,
  isClicked,
}) => {
  return (
    <Link
      to={{
        pathname: `/youtube/${video}`,
        state: { title },
      }}
    >
      <HStack
        spacing={4}
        p={4}
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
        bg={isClicked ? "gray.200" : ""}
        _hover={{
          background: `gray.200`,
        }}
      >
        <Box pos="relative" minW="80px" maxW="80px" height="60px">
          <Image
            width="80px"
            height="60px"
            objectFit="cover"
            alt="youtube thumbnail"
            src={thumbnail}
            fallbackSrc="https://via.placeholder.com/150"
          />

          <Center
            pos="absolute"
            bottom="0"
            w="100%"
            fontSize="xs"
            color="#fff"
            bg="#111"
            opacity="0.75"
          >
            {time}
          </Center>
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
