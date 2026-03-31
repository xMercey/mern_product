import { useColorModeValue } from "@/components/color-mode";
import { createProduct } from "@/components/productApi";
import {Container,VStack,Heading,Box,Input,Button,Text} from "@chakra-ui/react";
import { useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";

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
        await createProduct(newProduct);
        toaster.create({
          title: "Produkt erstellt",
          description: "Das Produkt wurde erfolgreich gespeichert.",
          type: "success",
        });
    } catch (error) {
        toaster.create({
          title: "Fehler",
          description: "Das Produkt konnte nicht gespeichert werden.",
          type: "error",         
        })
    }
    setNewProduct({name: "", price: "", image: ""});
  };

  return (
    <>  
    <Toaster />
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
    </>
  );
}