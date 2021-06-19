import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import YoutubeTab from "./YoutubeTab";
import ImagesTab from "./ImagesTab";
import NewsTab from "./NewsTab";

const index = () => {
  return (
    <Tabs isFitted isLazy variant="enclosed">
      <TabList>
        <Tab>유튜브</Tab>
        <Tab>이미지</Tab>
        <Tab>뉴스</Tab>
      </TabList>

      <TabPanels>
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
