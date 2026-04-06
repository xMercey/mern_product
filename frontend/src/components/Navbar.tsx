import { Moon, SquarePlus, Sun, Store, ShoppingCart } from "lucide-react";
import { Box, Button, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode, useColorModeValue } from "./color-mode";

export function Navbar({ cartCount }: { cartCount: number }) {
  const { colorMode, toggleColorMode } = useColorMode();

  const navBg = useColorModeValue("white", "#111827");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const brandColor = useColorModeValue("teal.600", "teal.300");

  return (
    <Box
      bg={navBg}
      borderBottom="1px solid"
      borderColor={borderColor}
      position="sticky"
      top="0"
      zIndex="1000"
      boxShadow="sm"
      w="100%"
    >
      <Flex
        w="100%"
        maxW="1200px"
        mx="auto"
        px={{ base: 3, sm: 4, md: 6 }}
        py={{ base: 3, md: 4 }}
        align="center"
        justify="space-between"
        gap={{ base: 2, md: 4 }}
      >
        <Link to="/" style={{ minWidth: 0, flex: 1 }}>
          <HStack gap={{ base: 2, md: 3 }} minW={0}>
            <Icon
              as={Store}
              boxSize={{ base: 5, sm: 6, md: 8 }}
              color={brandColor}
              flexShrink={0}
            />
            <Text
              fontSize={{ base: "16px", sm: "20px", md: "28px" }}
              fontWeight="extrabold"
              color={brandColor}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              Produkte entdecken
            </Text>
          </HStack>
        </Link>

        <HStack
          gap={{ base: 2, md: 4 }}
          flexShrink={0}
        >
          <Link to="/">
            <Box position="relative">
              <Button
                size={{ base: "sm", md: "lg" }}
                rounded="2xl"
                boxShadow="md"
                variant="outline"
                minW="auto"
                px={{ base: 3, md: 4 }}
              >
                <ShoppingCart size={20} />
              </Button>

              {cartCount > 0 && (
                <Box
                  position="absolute"
                  top="-6px"
                  right="-6px"
                  bg="red.500"
                  color="white"
                  fontSize="xs"
                  px={2}
                  py="1"
                  rounded="full"
                  fontWeight="bold"
                  boxShadow="md"
                >
                  {cartCount}
                </Box>
              )}
            </Box>
          </Link>

          <Link to="/create">
            <Button
              size={{ base: "sm", md: "lg" }}
              rounded="2xl"
              boxShadow="md"
              minW="auto"
              px={{ base: 3, md: 4 }}
            >
              <SquarePlus size={20} />
            </Button>
          </Link>

          <Button
            onClick={toggleColorMode}
            size={{ base: "sm", md: "lg" }}
            variant="outline"
            rounded="2xl"
            minW="auto"
            px={{ base: 3, md: 4 }}
          >
            {colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}