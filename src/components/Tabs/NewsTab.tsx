import { SimpleGrid } from "@chakra-ui/react";
import NewsListItem from "./../NewsListItem";

const NewsTab = () => {
  return (
    <SimpleGrid>
      <NewsListItem />
      <NewsListItem />
      <NewsListItem />
      <NewsListItem />
      <NewsListItem />
      <NewsListItem />
      <NewsListItem />
      <NewsListItem />
    </SimpleGrid>
  );
};

export default NewsTab;
