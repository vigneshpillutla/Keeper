import React, { useState } from 'react';
import logo from 'logo/Login.png';
import { Link } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { Form, PeekPassword } from './Form';
import styles from 'stylesheets/Login.module.css'

function Login(props) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword,setShowPassword] = useState(false);
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
        <PeekPassword onChange={changeFormData} value={formData.password}/>
    </Form>
    // <div className={`${styles["login-page"]}`}>
    //   <form className={`${styles["login-form"]}`} onSubmit={handleFormSubmit}>
    //     <img src={logo} alt="user" className={`${styles["userLogo"]}`} />
    //     <h1>Login</h1>
    //     <div className={`${styles['input-fields']}`}>
    //       <input
    //       name="email"
    //       onChange={changeFormData}
    //       type="email"
    //       placeholder="Email"
    //       value={formData.email}
    //       required
    //     />
    //     <input
    //       name="password"
    //       onChange={changeFormData}
    //       type={showPassword ? "text" : "password"}
    //       placeholder="Password"
    //       minLength="8"
    //       value={formData.password}
    //       required
    //     />
    //     <FontAwesomeIcon icon={showPassword ? faEyeSlash:faEye} className={`${styles["input-icon"]}`} onClick={toggleShowPassword}/>
    //     </div>
    //     <button type="submit">Login</button>
        
    //     <Link to="/signup">
    //       <p>Don't have an account? Sign up</p>
    //     </Link>
    //   </form>
    // </div>
  );
}

export default Login;
