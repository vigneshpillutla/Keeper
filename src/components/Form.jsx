import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from 'stylesheets/Login.module.css';
import logo from 'logo/Login.png';

const PeekPassword = (props) => {
  const { onChange, value } = props;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <input
        name="password"
        onChange={onChange}
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        minLength="8"
        value={value}
        required
      />
      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className={`${styles['input-icon']}`}
        onClick={toggleShowPassword}
      />
    </div>
  );
};

const Form = (props) => {
  const { type, onSubmit, children } = props;

  const FormDataMapper = {
    login: {
      heading: 'Login',
      btnText: 'Login',
      switchText: "Don't have an account? Sign Up",
      redirect: '/signup'
    },
    signup: {
      heading: 'Register',
      btnText: 'Sign Up',
      switchText: 'Already have an account? Login',
      redirect: '/login'
    }
  };

  const page = FormDataMapper[type];

  return (
    <div className={`${styles['login-page']}`}>
      <form className={`${styles['login-form']}`} onSubmit={onSubmit}>
        <img src={logo} alt="user" className={`${styles['userLogo']}`} />
        <h1>{page.heading}</h1>
        <div className={`${styles['input-fields']}`}>{children}</div>
        <button type="submit">{page.btnText}</button>

        <Link to={page.redirect}>
          <p>{page.switchText}</p>
        </Link>
      </form>
    </div>
  );
};

export { Form, PeekPassword };
