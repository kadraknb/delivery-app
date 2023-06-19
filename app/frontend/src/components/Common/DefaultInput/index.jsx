import React from 'react';
import PropTypes from 'prop-types';

function DefaultInput({
  title,
  dataTestId,
  placeholder,
  value,
  type,
  size,
  disabled,
  setState }) {
  const switchObject = {
    small: `border-2 text-lg border-default_dark_gray rounded-[5px] py-2 px-4
    w-[184px] focus:outline-default_dark_accent disabled:text-default_dark_gray`,
    default: `border-2 text-lg border-default_dark_gray rounded-[5px] py-2 px-4 w-[298px]
    focus:outline-default_dark_accent disabled:text-default_dark_gray`,
    large: `border-2 text-lg border-default_dark_gray rounded-[5px] py-2 px-4
    w-[416px] focus:outline-default_dark_accent disabled:text-default_dark_gray`,
  };

  return (
    <label htmlFor={ dataTestId } className="flex flex-col gap-1">
      <span className="text-[20px]">{title}</span>
      <input
        className={ switchObject[size || 'default'] }
        placeholder={ placeholder }
        id={ dataTestId }
        value={ value }
        autoComplete="on"
        data-testid={ dataTestId }
        type={ type }
        disabled={ disabled || false }
        onChange={ ({ target }) => {
          setState(target.value);
        } }
      />
    </label>
  );
}

DefaultInput.propTypes = {
  title: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  size: PropTypes.string,
}.isRequired;

export default DefaultInput;
