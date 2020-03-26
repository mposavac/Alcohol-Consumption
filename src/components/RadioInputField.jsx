import React from 'react';

export default function RadioInputField({ input, onChange, group, name }) {
  return (
    <div className="inputGroup">
      <input
        type="radio"
        name={group}
        id={name + group}
        onChange={onChange}
        checked={input === name}
        value={name}
      />
      <label htmlFor={name + group}>{name[0].toUpperCase() + name.substr(1)}</label>
    </div>
  );
}
