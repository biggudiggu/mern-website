import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product.js";
import { toaster } from "../components/ui/toaster";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        type: "error",
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
        type: "success",
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW={"md"}>
      <VStack gap={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack gap={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              bg={useColorModeValue("gray.100", "gray.700")}
            ></Input>
            <Input
              placeholder="Price"
              name="price"
              type={"number"}
              min="0"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              bg={useColorModeValue("gray.100", "gray.700")}
            ></Input>
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              bg={useColorModeValue("gray.100", "gray.700")}
            ></Input>
            <Button colorPalette={"cyan"} onClick={handleAddProduct} w={"full"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
