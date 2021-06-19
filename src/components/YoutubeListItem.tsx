import { Box, HStack, Image, Text } from "@chakra-ui/react";

const YoutubeListItem = () => {
  return (
    <HStack
      spacing={5}
      id="ListItem"
      p={4}
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      _hover={{
        background: `gray.200`,
      }}
    >
      <Box minW="60px">
        <Image
          boxSize="60px"
          objectFit="cover"
          alt="youtube thumbnail"
          src="https://bit.ly/sage-adebayo"
          fallbackSrc="https://via.placeholder.com/150"
        />
      </Box>

      <Box flex={1} overflow="hidden">
        <Text fontSize="md" noOfLines={2}>
          유튜브 서브타이틀 유유튜브 서브타이틀 유유튜브 서브타이틀 유서브타이틀
          유유튜브 서브타이틀 유서브타이틀 유유튜브 서브타이틀 유zz
        </Text>
      </Box>
    </HStack>
  );
};

export default YoutubeListItem;
