import React, { Component } from "react";

const FormFileSelector = props => {
  const {
    placeholder = "",
    required = false,
    maxLength,
    disabled = false,
    name,
    type,
    autoFocus,
    id,
    accept
  } = props;

  const attrs = {
    placeholder,
    maxLength,
    required,
    disabled,
    name,
    type,
    autoFocus,
    accept,
    id
  };

  const handleChange = event => {
    const target = event.target;
    props.onChangeCallback(target.name, target.files[0], target.files);
  };

  return (
    <input {...attrs} className={props.className} onChange={handleChange} />
  );
};

export default FormFileSelector;
