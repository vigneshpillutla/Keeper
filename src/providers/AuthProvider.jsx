import UserAuth from 'api/auth.js';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (credentials) => {
    try {
      const response = await UserAuth.login(credentials);

      const data = await response.json();

      if (response.ok) {
        setUser(data.userData);
        setIsLoggedIn(true);
        toast.success('Logged in successfully!');
      } else {
        toast.error(data.msg);
      }
    } catch (e) {
      toast.error('Unable to login! Try again later.');
    }
  };

  const value = {
    user,
    isLoggedIn,
    login
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
