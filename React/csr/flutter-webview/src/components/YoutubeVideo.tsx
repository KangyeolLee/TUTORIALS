import { AspectRatio, Center, Heading, Divider, Box } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import YoutubeTab from "@components/Tabs/YoutubeTab";
import { useEffect, useState, useRef } from "react";

const YoutubeVideo = () => {
  const location = useLocation<{ title: string }>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(0);

  const { title } = location.state;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (iframeRef?.current) {
      setIframeHeight(iframeRef.current.offsetHeight);
    }
  }, [iframeRef]);

  return (
    <>
      <AspectRatio
        ratio={16 / 9}
        pos="fixed"
        w="100%"
        zIndex={100}
        ref={iframeRef}
      >
        <iframe
          title="YouTube video player"
          src={`https://www.youtube.com/embed/${id}`}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </AspectRatio>

      <Center
        p={2}
        bg="gray.200"
        pos="fixed"
        w="100%"
        zIndex={100}
        mt={iframeHeight}
      >
        play_bar
      </Center>

      <Box pt={iframeHeight + 40}>
        <Heading as="h6" size="sm" p={3}>
          {title}
        </Heading>

        <Divider />

        <YoutubeTab />
      </Box>
    </>
  );
};

export default YoutubeVideo;
