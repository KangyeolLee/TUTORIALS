import { SimpleGrid } from "@chakra-ui/react";
import YoutubeListItem from "@components/YoutubeListItem";
import { dummyYoutube_news } from "./../../dummyData/youtubes";

const YoutubeTab = () => {
  return (
    <SimpleGrid>
      {dummyYoutube_news.map((item) => (
        <YoutubeListItem
          key={item.id}
          video={item.video}
          thumbnail={item.thumbnail}
          title={item.title}
          time={item.time}
        />
      ))}
    </SimpleGrid>
  );
};

export default YoutubeTab;
