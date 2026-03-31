import { useColorModeValue } from "@/components/color-mode";
import {Container,VStack,Text,Link,Heading,HStack,Box, SimpleGrid} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getProducts } from "@/components/productApi";
import { ProductCard } from "@/components/ProductCard";

export function HomePage() {
  const brandColor = useColorModeValue("teal.600", "teal.300");
  const text = useColorModeValue("gray.600", "gray.400");
  const cardBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const shadow = useColorModeValue("md", "dark-lg");

  const [products, setProducts] = useState<any[]>([]);

  async function fetchProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxW="container.xl" py={{ base: 16, md: 24 }}>
      <VStack gap={10}>
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="extrabold"
          color={brandColor}
          textAlign="center"
        >
          Derzeitige Produkte
        </Heading>

        <SimpleGrid
            columns={{
                base: 1,
                md: 2,
                lg: 3
            }}
            gap={10}
            w={"full"}
        >
            {products.map((product) =>(
                <ProductCard key={product._id} product={product}/>
            ))}
        </SimpleGrid>

        {products.length === 0 && (
                    <Box
                    w="full"
                    maxW="3xl"
                    bg={cardBg}
                    border="1px solid"
                    borderColor={borderColor}
                    rounded="2xl"
                    shadow={shadow}
                    px={{ base: 6, md: 10 }}
                    py={{ base: 8, md: 10 }}
                  >
                    <VStack gap={4}>
                      <Text
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="semibold"
                        color={text}
                        textAlign="center"
                      >
                        Noch keine Produkte vorhanden
                      </Text>
          
                      <HStack gap={2} justify="center" flexWrap="wrap">
                        <Text color={text}>Starte jetzt mit deinem ersten Eintrag.</Text>
          
                        <Link
                          href="/create"
                          color={brandColor}
                          fontWeight="bold"
                          _hover={{
                            textDecoration: "underline",
                          }}
                        >
                          Produkt hinzufügen
                        </Link>
                      </HStack>
                    </VStack>
                  </Box>
        )}
      </VStack>
    </Container>
  );
}