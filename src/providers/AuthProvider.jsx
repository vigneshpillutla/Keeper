import UserAuth from 'api/auth.js';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sessionData, setSessionData] = useState({
    loading: true,
    isLoggedIn: false
  });

  const modifySessionData = (data) => {
    setSessionData((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    if (!user) {
      modifySessionData({ isLoggedIn: false });
      return;
    }
    modifySessionData({ isLoggedIn: true });
  }, [user]);

  const getUser = async () => {
    modifySessionData({ loading: true });
    const response = await UserAuth.getUser();

    if (response.ok) {
      const res = await response.json();
      setUser(res.user);
    }
    modifySessionData({ loading: false });
  };

  const login = async (credentials) => {
    try {
      const response = await UserAuth.login(credentials);

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        toast.success('Welcome Back!!');
      } else {
        toast.error(data.msg);
      }
    } catch (e) {
      toast.error('Unable to login! Try again later.');
    }
  };

  const signUp = async (credentials) => {
    try {
      const response = await UserAuth.signUp(credentials);

      const data = await response.json();
      const message = data.msg;
      if (response.ok) {
        setUser(data.user);

        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (e) {
      toast.error('Unable to sign up! Try again later.');
    }
  };

  const logout = async () => {
    const response = await UserAuth.logout();
    if (response.ok) {
      setUser(null);
      modifySessionData({ loading: false });
      toast.success('Sad to see you leave :(');
      return;
    }

    toast.error('Unable to logout! Hang around a bit longer :)');
  };

  const value = {
    user,
    sessionData,
    getUser,
    login,
    logout,
    signUp
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
