const API_BASE_URL = 'https://api.example.com'; 

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Add more API call functions for managing user-related data, orders, etc.
