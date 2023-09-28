import api from "@/utils/api";
import Cookies from "js-cookie";

// fetch Cart
const getCart = async () => {
  if (!Cookies.get("authToken")) return;
  try {
    const response = await api.get("order/cart/");
    const data = await response.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postCartItem = async (body) => {
  if (!Cookies.get("authToken")) return;
  try {
    const response = await api.post("order/cart_items/", body);
    const data = await response.data.data[0].cart_item;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getCartItems = async () => {
  if (!Cookies.get("authToken")) return;
  try {
    const response = await api.get("order/cart_items/");
    const data = await response.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteCartItem = async (id) => {
  if (!Cookies.get("authToken")) return;
  try {
    const response = await api.delete(`order/cart_items/${id}`);
    const data = await response.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const cartService = {
  getCart,
  postCartItem,
  getCartItems,
  deleteCartItem,
};

export default cartService;
