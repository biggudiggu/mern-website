import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./WebComponents/Navbar";
import { useColorModeValue } from "./components/ui/color-mode";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Toaster />
      <Box bg={useColorModeValue("gray.100", "gray.900")} minH={"100vh"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>
        </Routes>
      </Box>
    </>
  );
}

export default App;
