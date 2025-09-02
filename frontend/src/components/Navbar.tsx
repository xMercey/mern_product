import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        {/* Brand */}
        <Text
          fontSize={{ base: "32px", sm: "28px", md: "36px" }}
          fontWeight="extrabold"
          textAlign="center"
          color="pink.400"
        >
          <Link to="/">Shop your Product</Link>
        </Text>

        {/* Button */}
        <HStack alignItems="center">
            <Link to="/create">
            <Button colorScheme="pink" size="lg" rounded="2xl">
                <PlusSquareIcon size={36} /> {/* Icon-Größe in px */}
            </Button>
          </Link>
        <Button>

        </Button>
        </HStack>
      </Flex>
    </Container>
  );
}
