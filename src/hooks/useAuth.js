import { useState, useEffect } from 'react';
import api from '../utils/api';
import Cookies from "js-cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      const storedAuthToken = Cookies.get('authToken');
      if (storedAuthToken) {
        setIsAuthenticated(true);
        fetchUserProfile();
      }
    };

    checkAuthStatus();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('authentication/user_profile/');
      setUserProfile(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = (token) => {
    Cookies.set('authToken', token);
    setIsAuthenticated(true);
    fetchUserProfile();
  };

  const logout = () => {
    Cookies.remove('authToken');
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  return { isAuthenticated, userProfile, login, logout, fetchUserProfile };
};

export default useAuth;