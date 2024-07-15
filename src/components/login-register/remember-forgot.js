import React from 'react';

const RememberForgot = ({ isRegister, rememberLabel }) => (
  <div className='remember-forgot'>
    <label>
      <input type="checkbox" name="remember" />
      {rememberLabel}
    </label>
    {!isRegister && <a href="#">Forgot password?</a>}
  </div>
);

export default RememberForgot;
