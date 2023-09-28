import api from "@/utils/api";

// fetch products
const getProducts = async (pageNo) => {
  try {
    const response = await api.get(
      `/product/all_products?page=${pageNo}&page_size=24`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// fetch products by id
const getProductById = async (productId) => {
  try {
    const response = await api.get(`/product/${productId}`);
    console.log("klsdklsdkldlklk", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// fetch products by filter
const getProductsByFilter = async (filter) => {
  try {
    const response = await api.get(`/product/all_products/?${filter}`);
    console.log("klsdklsdkldlklk", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const productService = {
  getProducts,
  getProductById,
  getProductsByFilter,
};

export default productService;
