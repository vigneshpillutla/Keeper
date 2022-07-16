import React, { useState } from 'react';
import { useAuth } from 'providers/AuthProvider';
import { Form, PeekPassword } from './Form';

function Login(props) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const auth = useAuth();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    auth.login(formData);
  };

  function changeFormData(event) {
    const { value: newValue, name } = event.target;
    setFormData((prevValue) => {
      if (name === 'email') {
        return {
          ...prevValue,
          email: newValue
        };
      } else {
        return {
          ...prevValue,
          password: newValue
        };
      }
    });
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
