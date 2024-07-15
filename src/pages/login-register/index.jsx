import React, { useState } from 'react';

import { Slide, ToastContainer, toast } from 'react-toastify';

import AuthService from '../../services/auth-service';

import 'react-toastify/dist/ReactToastify.css';
import './login-register.css';
import FormBox from '../../components/login-register/from-box';

const LoginRegisterPage = () => {
  const [action, setAction] = useState('');
  const authService = new AuthService();

  const registerLink = () => {
    setAction(' active');
  };

  const loginLink = () => {
    setAction('');
  };

  const handleLogin = async (username, password) => {
    const requestModel = { username, password };
    const response = await authService.login(requestModel);
      if (response.isLogin) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
  };

  const handleRegister = async (username, email, password) => {
    const requestModel = { username, email, password };
    const response = await authService.register(requestModel);
    if (response.isRegister) {
      toast.success(response.message);
      loginLink();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <div className={`wrapper${action}`}>
        <FormBox isRegister={false} onLinkClick={registerLink} onSubmit={handleLogin} />
        <FormBox isRegister={true} onLinkClick={loginLink} onSubmit={handleRegister} />
      </div>
      <ToastContainer
        position="bottom-right"
        theme="light"
        closeOnClick
        transition={Slide}
        autoClose={2500}
        pauseOnHover={false}
      />
    </>
  );
};

export default LoginRegisterPage;
