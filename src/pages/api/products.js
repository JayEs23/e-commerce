import React,{ useState, useEffect } from 'react';
import api from '@/utils/api'; // Make sure this import is correct

const ProductApi = () => {
  const [products,setProducts] = useState("null");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('product/all_products/');
        const data = await response.data;
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  // Helper function to filter featured products
  const getFeaturedProducts = async () => {
    try {
      const response = await api.get('product/all_products/');
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  };

  // Helper function to get all products
  const getAllProducts = async () => {
    try {
      const response = await api.get('product/all_products/');
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Error fetching all products:', error);
      return [];
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await api.get(`product/${id}/`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return null;
    }
  };

  return {
    getFeaturedProducts,
    getAllProducts,
    getProductById,
  };
};

export default ProductApi;
