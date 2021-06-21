import { Center, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tabs from "@components/Tabs";
import YoutubeVideo from "@components/YoutubeVideo";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Center p={3} bg="purple.600" color="#fff">
          영웅시대
        </Center>

        <Switch>
          <Route exact path="/" component={Tabs} />
          <Route path="/youtube/:id" component={YoutubeVideo} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
