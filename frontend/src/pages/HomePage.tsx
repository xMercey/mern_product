import { useColorModeValue } from "@/components/color-mode";
import {Container,VStack,Text,Link,Heading,HStack,Box, SimpleGrid, Spinner, Input, NativeSelect} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getProducts } from "@/components/productApi";
import { ProductCard } from "@/components/ProductCard";

export function HomePage() {
  const brandColor = useColorModeValue("teal.600", "teal.300");
  const text = useColorModeValue("gray.600", "gray.400");
  const cardBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const shadow = useColorModeValue("md", "dark-lg");
  const inputBg = useColorModeValue("white", "#0f172a");
  const inputColor = useColorModeValue("gray.800", "white");
  const inputBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const inputPlaceholder = useColorModeValue("gray.500", "gray.400");


  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [priceFilter, setPriceFilter] = useState("all");

  async function fetchProducts() {
    try {
        const data = await getProducts();
        setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

  useEffect(() => {
    fetchProducts();
  }, []);
  const filteredProducts = products
  .filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((product) => {
    if (priceFilter === "under100") return product.price < 100;
    if (priceFilter === "100to300") return product.price >= 100 && product.price <= 300;
    if (priceFilter === "over300") return product.price > 300;
    return true;
  })
  .sort((a, b) => {
    if (sortOption === "priceAsc") return a.price - b.price;
    if (sortOption === "priceDesc") return b.price - a.price;
    if (sortOption === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  return (
    <Container maxW="container.xl" py={{ base: 6, md: 20 }}>
      <VStack gap={10}>
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="extrabold"
          color={brandColor}
          textAlign="center"
          m={3}
        >
          Derzeitige Produkte
        </Heading>

        {loading && (
          <VStack colorPalette="teal">
            <Spinner color={brandColor} size="xl" />
            <Text m={4} fontSize={"md"} color={brandColor}>Produkte laden...</Text>
          </VStack>
        )}

        <HStack
          w="full"
          gap={4}
          flexDir={{ base: "column", md: "row" }}
          align="stretch"
        >

        <Input
          placeholder="Produkt suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg={inputBg}
          color={inputColor}
          borderColor={inputBorder}
          _placeholder={{ color: inputPlaceholder }}
        />

        <NativeSelect.Root maxW={{ base: "full", md: "220px" }}>
          <NativeSelect.Field
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            bg={inputBg}
            color={inputColor}
            borderColor={inputBorder}
          >
            <option value="all">Alle Preise</option>
            <option value="under100">Unter 100€</option>
            <option value="100to300">100€ bis 300€</option>
            <option value="over300">Über 300€</option>
          </NativeSelect.Field>
        </NativeSelect.Root>

        <NativeSelect.Root maxW={{ base: "full", md: "220px" }}>
          <NativeSelect.Field
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            bg={inputBg}
            color={inputColor}
            borderColor={inputBorder}
          >
            <option value="default">Standard</option>
            <option value="priceAsc">Preis: günstig → teuer</option>
            <option value="priceDesc">Preis: teuer → günstig</option>
            <option value="newest">Neueste</option>
          </NativeSelect.Field>
        </NativeSelect.Root>
        </HStack>

        <SimpleGrid
            columns={{
                base: 1,
                md: 2,
                lg: 3
            }}
            gap={10}
            w={"full"}
        >
        {filteredProducts.map((product) => (
            <ProductCard
            key={product._id}
            product={product}
            onDelete={(id: string) =>
                setProducts((prev) => prev.filter((p) => p._id !== id))
            }
            onUpdate={(updatedProduct: any) =>
                setProducts((prev) => prev.map((p) => p._id === updatedProduct._id ? updatedProduct : p))
            }
            />
            ))}
        </SimpleGrid>

        {!loading && filteredProducts.length === 0 && (
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