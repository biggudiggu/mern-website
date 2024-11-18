import React from "react";
import {
  Container,
  Flex,
  Text,
  Link,
  HStack,
  Icon,
  Button,
} from "@chakra-ui/react";
import { CiSquarePlus } from "react-icons/ci";
import { ColorModeButton } from "../components/ui/color-mode";

const Navbar = () => {
  return (
    <Container maxWidth={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: 22, sm: 28 }}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          <Link href="/">PRODUCT STORE</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link href="/create">
            <Button
              variant="ghost"
              height={{ base: 22, sm: 30 }}
              width={{ base: 22, sm: 30 }}
            >
              <Icon fontSize={{ base: 22, sm: 30 }}>
                <CiSquarePlus />
              </Icon>
            </Button>
          </Link>
          <ColorModeButton></ColorModeButton>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
