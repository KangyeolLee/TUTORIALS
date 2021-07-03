import { Box, HStack, Text } from "@chakra-ui/react";

const NewsListItem = () => {
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
      <Box>네이버</Box>

      <Box>
        <Text>소제목</Text>
      </Box>
    </HStack>
  );
};

export default NewsListItem;
