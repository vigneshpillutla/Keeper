import { useAuth } from 'providers/AuthProvider';
import React, { useState } from 'react';
import { Form, PeekPassword } from './Form';

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
    if (Object.keys(formData).includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue
      }));
      return;
    }
    throw new Error(`Trying to change and invalid input field - ${name}`);
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
