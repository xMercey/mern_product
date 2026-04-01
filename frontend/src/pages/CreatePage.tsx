import { useColorModeValue } from "@/components/color-mode";
import { createProduct } from "@/components/productApi";
import {Container,VStack,Heading,Box,Input,Button,Text} from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";

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
  const button = useColorModeValue("teal.600", "teal.300");

  const [imageError, setImageError] = useState(false);

  async function handleAddProduct() {
    try {
        await createProduct(newProduct);
        toaster.create({
          title: "Produkt erstellt",
          description: "Das Produkt wurde erfolgreich gespeichert.",
          type: "success",
        });

        setNewProduct({ name: "", price: "", image: "" });
        setImageError(false);
      } catch (error) {
        setImageError(true);
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
              onChange={(e) => {
                setNewProduct({ ...newProduct, image: e.target.value });
                setImageError(false);
              }}
            />

            {newProduct.image && (
              <Box w="full">
                <Text mb={2} color={subText} fontSize="sm">
                  Vorschau
                </Text>

                {!imageError ? (
                  <Box
                    overflow="hidden"
                    rounded="xl"
                    border="1px solid"
                    borderColor={borderColor}
                    bg={inputBg}
                  >
                    <img
                      src={newProduct.image}
                      alt="Produkt Vorschau"
                      style={{
                        width: "100%",
                        height: "260px",
                        objectFit: "cover",
                        display: "block",
                      }}
                      onError={() => setImageError(true)}
                    />
                  </Box>
                ) : (
                  <Text color="red.400" fontSize="sm">
                    Bild konnte nicht geladen werden.
                  </Text>
                )}
              </Box>
            )}

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