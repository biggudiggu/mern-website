import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  VStack,
  Icon,
  Button,
  Input,
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogActionTrigger,
} from "../components/ui/dialog";
import React from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { toaster } from "../components/ui/toaster";
import { useProductStore } from "../store/product";
import { IoCreateOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

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
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);

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
        description: "Product updated successfully",
        status: "success",
        type: "success",
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      transition={"all 0.3s"}
      overflow={"hidden"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${parseFloat(product.price).toFixed(2)}
        </Text>

        <HStack gap={2}>
          <DialogRoot>
            <DialogTrigger>
              <Button>
                <Icon fontSize={18}>
                  <IoCreateOutline />
                </Icon>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Product</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <VStack>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    bg={useColorModeValue("gray.100", "gray.700")}
                    value={updatedProduct.name}
                    onChange={(e) => {
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      });
                    }}
                  ></Input>
                  <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    min="0"
                    bg={useColorModeValue("gray.100", "gray.700")}
                    value={updatedProduct.price}
                    onChange={(e) => {
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: parseFloat(e.target.value) || 0,
                      });
                    }}
                  ></Input>
                  <Input
                    placeholder="Image URL"
                    name="image"
                    bg={useColorModeValue("gray.100", "gray.700")}
                    value={updatedProduct.image}
                    onChange={(e) => {
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      });
                    }}
                  ></Input>
                </VStack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger>
                  <Button bg={"cyan.600"}>Close</Button>
                </DialogActionTrigger>
                <DialogActionTrigger>
                  <Button
                    onClick={() =>
                      handleUpdateProduct(product._id, updatedProduct)
                    }
                  >
                    Update
                  </Button>
                </DialogActionTrigger>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>

          <Button onClick={() => handleDeleteProduct(product._id)}>
            <Icon fontSize={18}>
              <MdDeleteForever />
            </Icon>
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
