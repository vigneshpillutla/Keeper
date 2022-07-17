import React, { useState } from 'react';
import { useAuth } from 'providers/AuthProvider';
import { Form, PeekPassword } from './Form';
import { Navigate } from 'react-router-dom';

function Login(props) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const auth = useAuth();
  const { sessionData } = auth;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    auth.login(formData);
  };

  function changeFormData(event) {
    const { value: newValue, name } = event.target;
    if (Object.keys(formData).includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue
      }));
      return;
    }

    throw new Error(`Trying to change an invalid input field - ${name}`);
  }

  if (sessionData.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <Form type="login" onSubmit={handleFormSubmit}>
      <input
        name="email"
        onChange={changeFormData}
        type="email"
        placeholder="Email"
        value={formData.email}
        required
      />
      <PeekPassword onChange={changeFormData} value={formData.password} />
    </Form>
  );
}

export default Login;
