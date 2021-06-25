import { Box, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tabs from "@components/Tabs";
import YoutubeVideo from "@components/YoutubeVideo";
import Header from "@components/Header";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Box as="main" pt="48px">
          <Switch>
            <Route exact path="/" component={Tabs} />
            <Route path="/youtube/:id" component={YoutubeVideo} />
          </Switch>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
