import React, { useState } from 'react';
import { CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import RegisterForm from '../../components/register/register-form';
import AuthService from '../../services/auth-service';
import { PASSWORD_DO_NOT_MATCH } from '../../constants/app-messages';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const authService = new AuthService();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      toast.error(PASSWORD_DO_NOT_MATCH);
      return;
    }
    const requestModel = { username, email, password };
    const response = await authService.register(requestModel);
    if (response.isRegister) {
      toast.success(response.message);
      setTimeout(() => {
        navigate('/login');
      }, 700);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <RegisterForm
                  username={username}
                  setUsername={setUsername}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  repeatPassword={repeatPassword}
                  setRepeatPassword={setRepeatPassword}
                  handleRegister={handleRegister}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default RegisterPage;
