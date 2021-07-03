import {
  Flex,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { HamburgerIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useRef } from "react";

const Header = () => {
  const location = useLocation();
  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerBtnRef = useRef(null);

  return (
    <Flex
      pos="fixed"
      w="100%"
      zIndex={100}
      p={3}
      bg="purple.600"
      color="#fff"
      justify="space-between"
      align="center"
    >
      <ArrowBackIcon
        onClick={() => history.push("/")}
        opacity={location.pathname !== "/" ? "1" : "0"}
      />

      <Link to="/">영웅시대</Link>

      <Box ref={drawerBtnRef} onClick={onOpen}>
        <HamburgerIcon />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={drawerBtnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="#fff" />
          <DrawerHeader bg="purple.600" color="#fff">
            안내
          </DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={4} divider={<StackDivider />}>
              <Text>공지사항</Text>
              <Text>공유하기</Text>
              <Text>보관함</Text>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Header;
