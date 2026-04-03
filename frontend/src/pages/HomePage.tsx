import { useColorModeValue } from "@/components/color-mode";
import {Container,VStack,Text,Link,Heading,HStack,Box, SimpleGrid, Spinner, Input, NativeSelect, Button} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getProducts } from "@/components/productApi";
import { ProductCard } from "@/components/ProductCard";

export function HomePage({
  cart,
  addToCart,
  removeFromCart,
}: {
  cart: string[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}) {
  const brandColor = useColorModeValue("teal.600", "teal.300");
  const text = useColorModeValue("gray.600", "gray.400");
  const cardBg = useColorModeValue("white", "#0f172a");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const shadow = useColorModeValue("md", "dark-lg");
  const inputBg = useColorModeValue("gray.50", "#1e293b");
  const inputColor = useColorModeValue("gray.800", "white");
  const inputBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const inputPlaceholder = useColorModeValue("gray.500", "gray.400");


  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [priceFilter, setPriceFilter] = useState("all");

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showCartOnly, setShowCartOnly] = useState(false);

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

  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id: string) {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  }

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
  .filter((product) => {
    if (!showFavoritesOnly) return true;
    return favorites.includes(product._id);
  })
  .filter((product) => {
    if(!showCartOnly) return true;
    return cart.includes(product._id);
  })
  .sort((a, b) => {
    if (sortOption === "priceAsc") return a.price - b.price;
    if (sortOption === "priceDesc") return b.price - a.price;
    if (sortOption === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  const totalProducts = filteredProducts.length;

  const averagePrice =
    totalProducts > 0
      ? Math.round(
          filteredProducts.reduce((sum, product) => sum + product.price, 0) /
            totalProducts
        )
      : 0;

  const cheapestProduct =
    totalProducts > 0
      ? filteredProducts.reduce((min, product) =>
          product.price < min.price ? product : min
        )
      : null;

  const mostExpensiveProduct =
    totalProducts > 0
      ? filteredProducts.reduce((max, product) =>
          product.price > max.price ? product : max
        )
      : null;

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
          p={4}
          rounded="2xl"
          bg={useColorModeValue("white", "#0f172a")}
          border="1px solid"
          borderColor={borderColor}
          shadow={shadow}
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

        <Button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          bg={showFavoritesOnly ? "red.500" : useColorModeValue("gray.200", "whiteAlpha.200")}
          color={showFavoritesOnly ? "white" : inputColor}
          _hover={{
            bg: showFavoritesOnly ? "red.600" : useColorModeValue("gray.300", "whiteAlpha.300"),
          }}
        >
          {showFavoritesOnly ? "Alle anzeigen" : "Nur Favoriten"}
        </Button>

        <Button
          onClick={() => setShowCartOnly(!showCartOnly)}
          bg={showCartOnly ? "red.500" : useColorModeValue("gray.200", "whiteAlpha.200")}
          color={showCartOnly ? "white" : inputColor}
          _hover={{
            bg: showCartOnly ? "red.600" : useColorModeValue("gray.300", "whiteAlpha.300"),
          }}
        >
          {showCartOnly ? "Alle anzeigen" : "Nur Warenkorb"}
        </Button>
        </HStack>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap={6}
            w="full"
          >
            <Box
              p={5}
              rounded="2xl"
              shadow={shadow}
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
            >
              <Text color={text} fontSize="sm">
                Produkte
              </Text>
              <Heading size="lg">{totalProducts}</Heading>
            </Box>

            <Box
              p={5}
              rounded="2xl"
              shadow={shadow}
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
            >
              <Text color={text} fontSize="sm">
                Ø Preis
              </Text>
              <Heading size="lg">{averagePrice}€</Heading>
            </Box>

            <Box
              p={5}
              rounded="2xl"
              shadow={shadow}
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
            >
              <HStack justify="space-between" align="start">
                <Box>
                  <Text color={text} fontSize="sm" mb={1}>
                    Günstigstes
                  </Text>
                  <Heading size="md" color="green.500">
                    {cheapestProduct ? `${cheapestProduct.price}€` : "-"}
                  </Heading>
                </Box>

                <Box
                  w="1px"
                  h="40px"
                  bg={useColorModeValue("gray.200", "whiteAlpha.300")}
                />

                <Box textAlign="right">
                  <Text color={text} fontSize="sm" mb={1}>
                    Teuerstes
                  </Text>
                  <Heading size="md" color="red.400">
                    {mostExpensiveProduct ? `${mostExpensiveProduct.price}€` : "-"}
                  </Heading>
                </Box>
              </HStack>
            </Box>
          </SimpleGrid>

          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 3 }}
            gap={8}
            w="full"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={(id: string) =>
                  setProducts((prev) => prev.filter((p) => p._id !== id))
                }
                onUpdate={(updatedProduct: any) =>
                  setProducts((prev) =>
                    prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
                  )
                }
                onToggleFavorite={(id: string) => toggleFavorite(id)}
                isFavorite={favorites.includes(product._id)}
                onAddToCart={(id: string) => addToCart(id)}
                onRemoveFromCart={(id: string) => removeFromCart(id)}
                isInCart={cart.includes(product._id)}
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