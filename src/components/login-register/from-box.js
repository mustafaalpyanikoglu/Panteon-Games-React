import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaLock, FaUser, FaEnvelope } from 'react-icons/fa';

import InputBox from './input-box';
import RememberForgot from './remember-forgot';
import appMessages from '../../constants/app-messages';
import RegisterValidation from '../../utils/register-validation';

const FormBox = ({ isRegister, onLinkClick, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationResult;

    if (isRegister) {
      validationResult = RegisterValidation.validateRegisterForm(username, email, password);
      if (validationResult.valid) {
        await onSubmit(username, email, password);
        toast.success(appMessages.REGISTER_SUCCESSFUL);
      } else {
        toast.error(validationResult.message);
      }
    } else {
      onSubmit(username, password);
    }
  };

  return (
    <div className={`form-box ${isRegister ? 'register' : 'login'}`}>
      <form onSubmit={handleSubmit}>
        <h1>{isRegister ? 'Registration' : 'Login'}</h1>
        <InputBox
          type="text"
          placeholder="Username"
          icon={FaUser}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {isRegister && (
          <InputBox
            type="email"
            placeholder="Email"
            icon={FaEnvelope}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <InputBox
          type="password"
          placeholder="Password"
          icon={FaLock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <RememberForgot
          isRegister={isRegister}
          rememberLabel={isRegister ? 'I agree to the terms & conditions' : 'Remember me'}
        />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        <div className="register-link">
          <p>
            {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
            <a href="#" onClick={onLinkClick}>{isRegister ? 'Login' : 'Register'}</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default FormBox;
