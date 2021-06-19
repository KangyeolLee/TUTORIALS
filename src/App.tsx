import { Center, ChakraProvider } from "@chakra-ui/react";
import Tabs from "@components/Tabs";

function App() {
  return (
    <ChakraProvider>
      <Center p={3} bg="purple.600" color="#fff">
        영웅시대
      </Center>
      <Tabs />
    </ChakraProvider>
  );
}

export default App;
