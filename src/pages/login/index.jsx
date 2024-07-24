import React, { useState } from 'react';
import { CCardGroup, CCol, CContainer, CRow } from '@coreui/react';
import { toast, } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import LoginForm from '../../components/login/login-form';
import SignUpCard from '../../components/login/sign-up-card';
import AuthService from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authService = new AuthService();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const requestModel = { username, password };
    console.log('requestModel:', requestModel);
    const response = await authService.login(requestModel);
    if (response.isLogin) {
      toast.success(response.message);
      setTimeout(() => {
        navigate('/configuration');
      }, 700);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <LoginForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
              />
              <SignUpCard />
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default LoginPage;
