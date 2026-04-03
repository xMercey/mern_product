import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router"
import { CreatePage } from "./pages/CreatePage"
import { Navbar } from "./components/Navbar"
import { HomePage } from "./pages/HomePage"
import { useColorModeValue } from "./components/color-mode"
import { useState } from "react";


function App() {
  const [cart, setCart] = useState<string[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  function addToCart(id: string) {
    setCart((prev) => {
      const nextCart = prev.includes(id) ? prev : [...prev, id];
      localStorage.setItem("cart", JSON.stringify(nextCart));
      return nextCart;
    });
  }
  
  function removeFromCart(id: string) {
    setCart((prev) => {
      const nextCart = prev.filter((item) => item !== id);
      localStorage.setItem("cart", JSON.stringify(nextCart));
      return nextCart;
    });
  }


  return (
    <>
        <Box minH="100vh" bg={useColorModeValue("gray.100" , "#0f172a")} transition="background 0.2s ease">
          <Navbar cartCount={cart.length}/>
          <Box maxW="1200px" mx="auto" px={{ base: 4, md: 6 }} py={8}>
            <Routes>
              <Route path="/" element={<HomePage cart={cart} addToCart={addToCart} removeFromCart={removeFromCart}/>} />
              <Route path="/create" element={<CreatePage />} />
            </Routes>
          </Box>
        </Box>

    </>
  )
}

export default App
