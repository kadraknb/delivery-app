import React from 'react';
import PropTypes from 'prop-types';

function DefaultDropDown({ title,
  dataTestId,
  value,
  valuesArray,
  setState }) {
  const createOptions = () => valuesArray.map((item, index) => (
    <option key={ item.name + index } value={ item.id }>
      {item.name}
    </option>
  ));

  return (
    <label htmlFor={ dataTestId } className="flex flex-col gap-1">
      <span className="text-[20px]">{title}</span>
      <select
        className="border-2 text-lg border-default_dark_gray rounded-[5px]
        py-2 px-4 w-[200px] h-12 focus:outline-default_dark_accent"
        id={ dataTestId }
        value={ value }
        data-testid={ dataTestId }
        multiple={ false }
        onChange={ ({ target }) => {
          setState(target.value);
        } }
      >
        { createOptions() }
      </select>
    </label>
  );
}

DefaultDropDown.propTypes = {
  title: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
}.isRequired;

export default DefaultDropDown;
