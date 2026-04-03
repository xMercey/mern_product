import { Moon, SquarePlus, Sun, Store, ShoppingCart } from "lucide-react";
import {Box,Button,Container,Flex,HStack,Icon,Text} from "@chakra-ui/react";
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
    >
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={4}>
        <Flex
          align="center"
          justify="space-between"
          gap={4}
        >
          {/* Logo */}
          <Link to="/">
            <HStack gap={3}>
              <Icon as={Store} boxSize={8} color={brandColor} />
              <Text 
                fontSize={{ base: "32px", sm: "28px", md: "36px" }} 
                fontWeight="extrabold" 
                textAlign="center" 
                color={brandColor}>
                Produkte entdecken
              </Text>
            </HStack>
          </Link>

          {/* Buttons */}
          <HStack gap={4}>
          <Link to="/">
          <Box position="relative">
            <Button
              size="lg"
              rounded="2xl"
              boxShadow="md"
              variant="outline"
            >
              <ShoppingCart size={22} />
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
                size="lg"       
                rounded="2xl"
                boxShadow="md"
              >
                <SquarePlus size={24} /> 
              </Button>
            </Link>

            <Button
              onClick={toggleColorMode}
              size="lg"         
              variant="outline"
              rounded="2xl"
            >
              {colorMode === "light" ? (
                <Moon size={22} />
              ) : (
                <Sun size={22} />
              )}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}