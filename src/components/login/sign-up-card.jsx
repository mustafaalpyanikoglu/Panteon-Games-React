import React from 'react';
import { Link } from 'react-router-dom';
import { CButton, CCard, CCardBody } from '@coreui/react';

const SignUpCard = () => {
  return (
    <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
      <CCardBody className="text-center">
        <div>
          <h2>Sign up</h2>
          <p>
            Don't have an account? Please create one.
          </p>
          <Link to="/register">
            <CButton color="primary" className="mt-3" active tabIndex={-1}>
              Register Now!
            </CButton>
          </Link>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default SignUpCard;
