import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import Cookies from "js-cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

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
      }
    }
  }, [logout]); // Include logout as a dependency

  const logout = useCallback(() => {
    alert("Logging out");
    Cookies.remove('authToken');
    setIsAuthenticated(false);
    setUserProfile(null);
  }, []); // No dependencies for logout

  useEffect(() => {
    const checkAuthStatus = () => {
      const storedAuthToken = Cookies.get('authToken');
      if (storedAuthToken) {
        setIsAuthenticated(true);
        fetchUserProfile();
      }
    };

    checkAuthStatus();
  }, [fetchUserProfile]); // Include fetchUserProfile as a dependency

  const login = (token) => {
    Cookies.set('authToken', token);
    setIsAuthenticated(true);
    fetchUserProfile();
  };

  return { isAuthenticated, userProfile, login, logout, fetchUserProfile };
};

export default useAuth;
