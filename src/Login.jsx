import React, { useState } from 'react';
import logo from './logo/Login.png';
import { Link } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider';
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
    <div className="login-page">
      <form className="login-form" onSubmit={handleFormSubmit}>
        <img src={logo} alt="user" className="userLogo" />
        {/* <h1>Login</h1> */}
        <input
          name="email"
          onChange={changeFormData}
          type="email"
          placeholder="Email"
          value={formData.email}
          required
        />
        <input
          name="password"
          onChange={changeFormData}
          type="password"
          placeholder="Password"
          minLength="3"
          value={formData.password}
          required
        />
        <button type="submit">Login</button>
        {/* <p className={`login-alert ${invalidLogin}`}>*Invalid username or password</p> */}
        <Link to="/signup">
          <p>Don't have an account? Sign up</p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
