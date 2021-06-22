import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import YoutubeTab from "./YoutubeTab";
import ImagesTab from "./ImagesTab";
import NewsTab from "./NewsTab";

const index = () => {
  return (
    <Tabs isFitted isLazy variant="enclosed-colored">
      <TabList pos="fixed" w="100%" zIndex={100}>
        <Tab
          _selected={{
            bg: "#fff",
            borderTopColor: "",
            borderColor: "inherit",
            borderBottomColor: "transparent",
          }}
        >
          유튜브
        </Tab>
        <Tab
          _selected={{
            bg: "#fff",
            borderTopColor: "",
            borderColor: "inherit",
            borderBottomColor: "transparent",
          }}
        >
          이미지
        </Tab>
        <Tab
          _selected={{
            bg: "#fff",
            borderTopColor: "",
            borderColor: "inherit",
            borderBottomColor: "transparent",
          }}
        >
          뉴스
        </Tab>
      </TabList>

      <TabPanels pt="42px">
        <TabPanel p={0}>
          <YoutubeTab />
        </TabPanel>
        <TabPanel p={0}>
          <ImagesTab />
        </TabPanel>
        <TabPanel p={0}>
          <NewsTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default index;
