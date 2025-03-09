import React from 'react';

function RegisterInput({ placeholder, id, name, type, required, onChange }) {
  return (
    <input
      placeholder={placeholder}
      id={id}
      name={name}
      type={type}
      className="rl-input"
      required={required}
      onChange={onChange}
    />
  );
}

export default RegisterInput;
