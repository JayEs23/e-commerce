import React, { useState, useEffect } from "react";
import api from "@/utils/api"; // Make sure this import is correct
import productsData from "../../../public/products.json";

const ProductApi = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (products) return;
      try {
        // alert("uwee");
        const response = await api.get("product/all_products/");
        const data = await response.data;
        console.log("products", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [products]);

  // Helper function to filter featured products
  // const getFeaturedProducts = async () => {
  //   try {
  //     const response = await api.get('product/all_products/');
  //     const data = await response.data;
  //     return data;
  //   } catch (error) {
  //     console.error('Error fetching featured products:', error);
  //     return [];
  //   }
  // };

  const getFeaturedProducts = () => {
    let result = productsData.filter((product) => product.featured);
    return result;
  };
  const getProductBySlug = (slug) => {
    return productsData.find((product) => product.slug === slug);
  };

  // Helper function to get all products
  const getAllProducts = async () => {
    try {
      const response = await api.get("product/all_products/");
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
  };

  // const getProductById = async (id) => {
  //   try {
  //     const response = await api.get(`product/${id}/`);
  //     const data = await response.data;
  //     return data;
  //   } catch (error) {
  //     console.error('Error fetching product by ID:', error);
  //     return null;
  //   }
  // };

  const getProductById = (id) => {
    let foundProduct = null;
    productsData.forEach((product) => {
      if (product.id === parseInt(id)) {
        foundProduct = product;
      }
    });
    return foundProduct;
  };
  return {
    getFeaturedProducts,
    getAllProducts,
    getProductById,
  };
};

export default ProductApi;
