import { Box, Button, CloseButton, Dialog, Heading, HStack, IconButton, Image, Portal, Text } from "@chakra-ui/react";
import { useColorModeValue } from "./color-mode";
import { EditIcon, Trash } from "lucide-react";
import { deleteProduct } from "./productApi";
import { Toaster, toaster } from "@/components/ui/toaster";


export function ProductCard({product, onDelete}: {product: any; onDelete: (id: string) => void;}) {
    const text = useColorModeValue("gray.600", "gray.400");

    async function handleDeleteProduct() {
        try {
            await deleteProduct(product._id);
            onDelete(product._id)
            toaster.create({
                title: "Produkt gelöscht",
                description: `${product.name} wurde gelöscht.`,
                type: "success",
              });
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : "Produkt konnte nicht gelöscht werden.";
          
            toaster.create({
              title: "Fehler",
              description: message,
              type: "error",
            });
          }
    }

    return (
        <>
        <Toaster />
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{transform: "translateY(-5px)", shadow: "xl"}}
        >
            <Image src={product.image} alt= {product.name} h={52} w={"full"} objectFit={"cover"}/>
            
            <Box p={5}>
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
                

                <Dialog.Root placement="center" motionPreset="slide-in-bottom">
                    <Dialog.Trigger asChild>
                        <IconButton 
                        aria-label="Produkt löschen" 
                        bg="red.500"
                        color="white"
                        _hover={{ bg: "red.600" }}
                        >
                            <Trash />
                        </IconButton>  
                    </Dialog.Trigger>

                    <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content maxW="xl" mx={4} rounded="2xl">
                        <Dialog.Header>
                            <Dialog.Title>Produkt löschen</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text>
                                Möchtest du <b>{product.name}</b> wirklich löschen?
                            </Text>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Abbrechen</Button>
                            </Dialog.ActionTrigger>

                            <Button 
                            colorPalette={"red"}
                                onClick={handleDeleteProduct}>
                            Löschen
                            </Button>

                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="md" />
                        </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
                </HStack>
            </Box>
        </Box>
        </>
    );
}