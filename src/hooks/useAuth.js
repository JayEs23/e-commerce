import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import Cookies from "js-cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const logout = useCallback(() => {
    Cookies.remove('authToken');
    setIsAuthenticated(false);
    setUserProfile(null);
  }, []); // No dependencies for logout


  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await api.get('authentication/user_profile/');
      setUserProfile(response?.data);
      Cookies.set("profile", response?.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      if (error?.response?.data?.details === "Invalid token.") {
        logout();
      }else{
        setIsAuthenticated(false);
        logout();
      }
    }
  }, [logout]); // Include logout as a dependency

  

  useEffect(() => {
    const checkAuthStatus = () => {
      const storedAuthToken = Cookies.get('authToken');
      if (storedAuthToken) {
        setIsAuthenticated(true);
        fetchUserProfile();
      }
    };

    checkAuthStatus();
  }, []); // Include fetchUserProfile as a dependency

  const login = (token) => {
    Cookies.set('authToken', token);
    setIsAuthenticated(true);
    fetchUserProfile();
  };

  return { isAuthenticated, userProfile, login, logout, fetchUserProfile };
};

export default useAuth;
