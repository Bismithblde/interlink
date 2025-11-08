import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';

const API_URL = Platform.select({
  android: "http://172.24.59.166:8000",
  ios: "http://172.24.59.166:8000",
  default: "http://172.24.59.166:8000",
});

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  fetchUserProfile: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const userId = await AsyncStorage.getItem('user_id');
      
      console.log('Token:', token ? 'exists' : 'missing');
      console.log('User ID:', userId);
      
      if (!token || !userId) {
        console.log('No token or userId found in storage');
        setLoading(false);
        return;
      }

      console.log('Fetching profile from:', `${API_URL}/api/v1/users/${userId}/profile`);
      
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/users/${userId}/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 10000
          }
        );

        console.log('Profile response:', response.data);
        setUser(response.data);
      } catch (profileError: any) {
        // If profile not found (404), decode user info from token
        if (profileError.response?.status === 404) {
          console.log('Profile not found (404), creating basic user from token');
          // Decode JWT to get email (basic decode, not verification)
          const tokenParts = token.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log('Token payload:', payload);
            setUser({
              id: userId,
              email: payload.email || 'No email',
            });
          }
        } else if (profileError.response?.status === 401 || profileError.response?.status === 403) {
          // Token is invalid or expired, clear storage
          console.log('Token invalid or expired, clearing storage');
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('user_id');
          setUser(null);
        } else if (profileError.response?.status === 400) {
          // Backend error (like "User not allowed"), clear storage
          console.log('Backend error (400), clearing old storage');
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('user_id');
          setUser(null);
        } else {
          // For other errors, just log them
          console.error('Profile fetch error:', profileError.response?.data);
        }
      }
    } catch (error: any) {
      console.error('Failed to fetch user profile:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserProfile, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
