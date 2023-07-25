import productsData from '../../../public/products.json';

// Helper function to filter featured products

// Helper function to get a product by its slug
const getProductBySlug = (slug) => {
  return productsData.find((product) => product.slug === slug);
};

// Helper function to filter featured products
const getFeaturedProducts = () => {
 let result = productsData.filter((product) => product.featured);
 console.log(result);
return result;
};

// Helper function to get all products
const getAllProducts = () => {
  return productsData;
};

const getProductById = (id) => {
  return productsData.find((product) => product.id === id);
};

export { getFeaturedProducts, getAllProducts, getProductBySlug, getProductById }; // Export all functions

