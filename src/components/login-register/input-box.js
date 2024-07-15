import React from 'react';

const InputBox = ({ type, placeholder, icon: Icon, value, onChange }) => (
  <div className="input-box">
    <input type={type} placeholder={placeholder} required value={value} onChange={onChange} />
    <Icon className='icon' />
  </div>
);

export default InputBox;
