import { useAuth } from 'providers/AuthProvider';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';

const AppRefactor = () => {
  const auth = useAuth();
  useEffect(() => {
    auth.getUser();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default AppRefactor;
