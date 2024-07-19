import React from 'react';
import { CButton, CCard, CCardBody, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return (
    <CCard className="p-4">
      <CCardBody>
        <CForm onSubmit={handleLogin}>
          <h1>Login</h1>
          <p className="text-body-secondary">Sign In to your account</p>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput
              placeholder="Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CInputGroup>
          <CRow>
            <CCol xs={6}>
              <CButton type="submit" color="primary" className="px-4">
                Login
              </CButton>
            </CCol>
            <CCol xs={6} className="text-right">
              <CButton color="link" className="px-0">
                Forgot password?
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default LoginForm;
