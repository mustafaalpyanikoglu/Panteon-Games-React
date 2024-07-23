import React from 'react';
import { CButton, CCol, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';


const RegisterForm = ({ username, setUsername, email, setEmail, password, setPassword, repeatPassword, setRepeatPassword, handleRegister }) => {
  const navigateToLogin = () => {
    window.location.href = '/login';
  };
  
  return (
    <CForm onSubmit={handleRegister}>
      <h1>Register</h1>
      <p className="text-body-secondary">Create your account</p>
      <CInputGroup className="mb-3">
        <CInputGroupText>
          <CIcon icon={cilUser} />
        </CInputGroupText>
        <CFormInput placeholder="Username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </CInputGroup>
      <CInputGroup className="mb-3">
        <CInputGroupText>@</CInputGroupText>
        <CFormInput placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </CInputGroup>
      <CInputGroup className="mb-3">
        <CInputGroupText>
          <CIcon icon={cilLockLocked} />
        </CInputGroupText>
        <CFormInput
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupText>
          <CIcon icon={cilLockLocked} />
        </CInputGroupText>
        <CFormInput
          type="password"
          placeholder="Repeat password"
          autoComplete="new-password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </CInputGroup>
      <CRow>
        <CCol xs={6}>
          <div className="d-grid">
            <CButton type="submit" color="success">Create Account</CButton>
          </div>
        </CCol>
        <CCol xs={6} className="text-right">
          <div className="d-grid">
            <CButton type='submit' color="info" className="px-0" onClick={navigateToLogin}>
              I have an account.
            </CButton>
          </div>
        </CCol>
      </CRow>
    </CForm>
  );
};

export default RegisterForm;
