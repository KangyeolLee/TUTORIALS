import { AspectRatio, Heading } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";

const YoutubeVideo = () => {
  const location = useLocation<{ title: string }>();

  const { title } = location.state;
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <AspectRatio ratio={16 / 9}>
        <iframe
          title="YouTube video player"
          src={`https://www.youtube.com/embed/${id}`}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </AspectRatio>

      <Heading as="h6" size="sm">
        {title}
      </Heading>
    </>
  );
};

export default YoutubeVideo;
