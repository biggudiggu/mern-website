import React, { useEffect } from "react";
import { Container, VStack, Text, Link, SimpleGrid } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product";
import ProductCard from "../WebComponents/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products:", products);

  return (
    <Container maxW={"6xl"} py={12}>
      <VStack gap={8}>
        <Text fontSize={30} fontWeight={"bold"} textAlign={"center"}>
          Current Products
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={useColorModeValue("gray.500", "gray.500")}
          >
            No Products found ☹️{" "}
            <Text as={"span"}>
              <Link href="/create">Create Product</Link>
            </Text>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
