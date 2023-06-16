import React from 'react';
import PropTypes from 'prop-types';

function SmallButton({ button, handleOnClick, disabled = false, dataTestId, content }) {
  const button1 = (
    <button
      type="button"
      data-testid={ dataTestId }
      onClick={ () => handleOnClick() }
      disabled={ disabled }
      className="font-semibold h-12 w-32 text-lg rounded-md transition
      bg-default_dark_accent text-default_white opacity-80 duration-300
      hover:opacity-100 disabled:bg-default_light_gray
      disabled:text-default_dark_gray disabled:hover:border-none disabled:opacity-100"
    >
      {content}
    </button>);

  const button2 = (
    <button
      type="button"
      data-testid={ dataTestId }
      onClick={ () => handleOnClick() }
      disabled={ disabled }
      className="transition ease-linear duration-150
      font-semibold h-12 w-32 text-lg rounded-md bg-default_white
      text-default_dark_accent hover:bg-default_white hover:text-default_dark_accent
      hover:border-2 hover:border-default_dark_accent
      disabled:bg-default_light_gray disabled:text-default_dark_gray"
    >
      {content}
    </button>);

  return button === 1 ? button1 : button2;
}

SmallButton.propTypes = {
  button: PropTypes.number,
  handleOnClick: PropTypes.func,
  dataTestId: PropTypes.string,
  disabled: PropTypes.bool,
  content: PropTypes.string,
}.isRequired;

export default SmallButton;
