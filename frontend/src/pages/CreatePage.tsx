import { useColorModeValue } from "@/components/color-mode";
import { createProduct } from "@/components/productApi";
import {Container,VStack,Heading,Box,Input,Button,Text} from "@chakra-ui/react";
import { useState } from "react";

export function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const cardBg = useColorModeValue("white", "#111827");
  const pageText = useColorModeValue("gray.800", "white");
  const subText = useColorModeValue("gray.600", "gray.400");
  const inputBg = useColorModeValue("gray.50", "#0f172a");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const button = useColorModeValue("teal.600", "teal.500");

  async function handleAddProduct() {
    try {
        const data = await createProduct(newProduct);
        console.log("Success:", data);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error:", error.message);
        } else {
          console.log("Unbekannter Fehler");
        }
    }
  }

  return (
    <Container maxW="container.md" py={{ base: 10, md: 14 }}>
      <VStack gap={8}>
        <VStack gap={2}>
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            color={pageText}
            fontWeight="extrabold"
          >
            Neues Produkt erstellen
          </Heading>
          <Text textAlign="center" color={subText} fontSize="md">
            Füge hier ein neues Produkt hinzu
          </Text>
        </VStack>

        <Box
          w="full"
          bg={cardBg}
          p={{ base: 5, md: 8 }}
          rounded="2xl"
          shadow="xl"
          border="1px solid"
          borderColor={borderColor}
        >
          <VStack gap={5}>
            <Input
              placeholder="Produktname"
              name="name"
              size="lg"
              bg={inputBg}
              borderColor={borderColor}
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <Input
              placeholder="Preis"
              type="number"
              name="price"
              size="lg"
              bg={inputBg}
              borderColor={borderColor}
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <Input
              placeholder="Bild URL"
              name="image"
              size="lg"
              bg={inputBg}
              borderColor={borderColor}
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button
              bg={button}
              onClick={handleAddProduct}
              w="full"
              size="lg"
              rounded="xl"
              fontWeight="bold"
            >
              Produkt hinzufügen
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}