import { Box, Heading, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import { useColorModeValue } from "./color-mode";
import { DeleteIcon, EditIcon } from "lucide-react";
import { deleteProduct } from "./productApi";


export function ProductCard({product, onDelete}: {product: any; onDelete: (id: string) => void;}) {
    const text = useColorModeValue("gray.600", "gray.400");

    async function handleDeleteProduct() {
        try {
            await deleteProduct(product._id);
            onDelete(product._id)
          } catch (error) {
            console.error(error);
          }
    }

    return (
        <>
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{transform: "translateY(-5px)", shadow: "xl"}}
        >
            <Image src={product.image} alt= {product.name} h={52} w={"full"} objectFit={"cover"}/>
            
            <Box p={4}>
            <Heading as={"h3"} size={"md"} mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight={"bold"} fontSize={"xl"} color={text} mb={4}>
                {product.price} Euro
            </Text>

            <HStack>
                <IconButton aria-label="Produkt bearbeiten">
                    <EditIcon/>
                </IconButton>

                <IconButton aria-label="Produkt löschen" onClick={handleDeleteProduct}>
                    <DeleteIcon/>
                </IconButton>             
            </HStack>


            </Box>
        </Box>
        </>
    );
}