import { useAuth } from 'providers/AuthProvider';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, PeekPassword } from './Form';

async function signUpUser(credentials) {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
    mode: 'cors'
  };
  return fetch('https://keep-er-api.herokuapp.com/register', requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
}

function SignUp(props) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const auth = useAuth();
  function changeFormData(event) {
    const { value: newValue, name } = event.target;
    setFormData((prevValue) => {
      if (name === 'firstName') {
        return {
          ...prevValue,
          firstName: newValue
        };
      }
      if (name === 'lastName') {
        return {
          ...prevValue,
          lastName: newValue
        };
      }
      if (name === 'email') {
        return {
          ...prevValue,
          email: newValue
        };
      }
      if (name === 'password') {
        return {
          ...prevValue,
          password: newValue
        };
      }
    });
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    auth.signUp(formData);
  };
  return (
    <Form type="signup" onSubmit={handleFormSubmit}>
      <input
        name="firstName"
        onChange={changeFormData}
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        required
      />
      <input
        name="lastName"
        onChange={changeFormData}
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        required
      />
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

export default SignUp;
