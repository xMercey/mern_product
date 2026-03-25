import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router"
import { CreatePage } from "./pages/CreatePage"
import { Navbar } from "./components/Navbar"
import { HomePage } from "./pages/HomePage"
import { useColorModeValue } from "./components/color-mode"


function App() {


  return (
    <>
        <Box minH="100vh" bg={useColorModeValue("gray.100" , "#0f172a")} transition="background 0.2s ease">
          <Navbar />
          <Box maxW="1200px" mx="auto" px={{ base: 4, md: 6 }} py={8}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
            </Routes>
          </Box>
        </Box>

    </>
  )
}

export default App
