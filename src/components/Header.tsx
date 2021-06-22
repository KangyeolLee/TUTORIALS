import { Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Center
      pos="fixed"
      w="100%"
      zIndex={100}
      p={3}
      bg="purple.600"
      color="#fff"
    >
      <Link to="/">영웅시대</Link>
    </Center>
  );
};

export default Header;
