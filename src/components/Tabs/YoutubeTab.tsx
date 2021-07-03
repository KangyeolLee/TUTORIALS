import { SimpleGrid, HStack, Tag, Divider } from "@chakra-ui/react";
import YoutubeListItem from "@components/ListItem/YoutubeListItem";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  dummyYoutube_news,
  dummyYoutube_songs,
  dummyYoutube_officials,
} from "@dummyData/youtubes";

const YoutubeTab = () => {
  const [category, setCategory] = useState("officials");
  const [youtubes, setYoutubes] = useState(dummyYoutube_officials);
  const { id } = useParams<{ id: string }>();

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const selected_id = (e.target as HTMLElement).id;
    setCategory(selected_id);
  };

  useEffect(() => {
    if (category === "officials") {
      setYoutubes(dummyYoutube_officials);
    } else if (category === "songs") {
      setYoutubes(dummyYoutube_songs);
    } else {
      setYoutubes(dummyYoutube_news);
    }
  }, [category]);

  return (
    <>
      <HStack onClick={clickHandler} p={2} spacing={4} justifyContent="center">
        <Tag
          bg={category === "officials" ? "purple.600" : "gray.100"}
          color={category === "officials" ? "#fff" : "#111"}
          id="officials"
        >
          #공식채널
        </Tag>
        <Tag
          bg={category === "songs" ? "purple.600" : "gray.100"}
          color={category === "songs" ? "#fff" : "#111"}
          id="songs"
        >
          #노래모음
        </Tag>
        <Tag
          bg={category === "news" ? "purple.600" : "gray.100"}
          color={category === "news" ? "#fff" : "#111"}
          id="news"
        >
          #관련소식
        </Tag>
      </HStack>

      <Divider />

      <SimpleGrid>
        {youtubes.map((item) => (
          <YoutubeListItem
            key={item.id}
            video={item.video}
            thumbnail={item.thumbnail}
            title={item.title}
            time={item.time}
            isClicked={item.id === id}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default YoutubeTab;
