import React from 'react';

function TFAInput({ placeholder, id, name, type, required, onChange, value }) {
  return (
    <input
      placeholder={placeholder}
      id={id}
      name={name}
      type={type}
      className="rl-input"
      required={required}
      onChange={onChange}
      value={value}
    />
  );
}

export default TFAInput;
