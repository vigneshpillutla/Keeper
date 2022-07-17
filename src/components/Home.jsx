import Header from 'components/Header';
import { useAuth } from 'providers/AuthProvider';
import React from 'react';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const auth = useAuth();
  const { sessionData } = auth;

  if (!sessionData.loading && !sessionData.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;
