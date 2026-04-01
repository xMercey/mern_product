import { Box, Button, CloseButton, Dialog, Heading, HStack, IconButton, Image, Input, Portal, Text } from "@chakra-ui/react";
import { useColorModeValue } from "./color-mode";
import { EditIcon, Trash } from "lucide-react";
import { deleteProduct, updateProduct } from "./productApi";
import { Toaster,toaster } from "@/components/ui/toaster";
import { useState } from "react";


export function ProductCard({product, onDelete, onUpdate}: {product: any; onDelete: (id: string) => void; onUpdate: (updatedProduct: any) => void;}) {
    const text = useColorModeValue("gray.600", "gray.400");
    const buttonBg = useColorModeValue("teal.500", "teal.400");
    const buttonBgHover = useColorModeValue("teal.600", "teal.500");
    const [editName, setEditName] = useState(product.name);
    const [editPrice, setEditPrice] = useState(product.price);
    const [editImage, setEditImage] = useState(product.image);

    function handleOpenEdit() {
        setEditName(product.name);
        setEditPrice(String(product.price));
        setEditImage(product.image);
      }
    
      async function handleUpdateProduct() {
        try {
          const updatedProduct = await updateProduct(product._id, {
            name: editName,
            price: editPrice,
            image: editImage,
          });
    
          onUpdate(updatedProduct);
    
          toaster.create({
            title: "Produkt bearbeitet",
            description: `${editName} wurde aktualisiert.`,
            type: "success",
          });
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Produkt konnte nicht bearbeitet werden.";
    
          toaster.create({
            title: "Fehler",
            description: message,
            type: "error",
          });
        }
      }

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
                    {product.price}€
                </Text>

                <HStack>

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                    <IconButton aria-label="Produkt bearbeiten" 
                        bg={buttonBg}
                        color="white"
                        _hover={{ bg: buttonBgHover }}
                        onClick={handleOpenEdit}>
                        <EditIcon />
                    </IconButton>
                    </Dialog.Trigger>

                    <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content maxW="xl" mx={4} rounded="2xl">
                        <Dialog.Header>
                            <Dialog.Title>Produkt bearbeiten</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Text mb={2}>Name</Text>
                            <Input
                            mb={4}
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            />

                            <Text mb={2}>Preis</Text>
                            <Input
                            mb={4}
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            />

                            <Text mb={2}>Bild URL</Text>
                            <Input
                            value={editImage}
                            onChange={(e) => setEditImage(e.target.value)}
                            />
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Abbrechen</Button>
                            </Dialog.ActionTrigger>

                            <Dialog.ActionTrigger asChild>
                            <Button colorPalette="green" onClick={handleUpdateProduct}>
                                Speichern
                            </Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="md" />
                        </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>


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