import React from 'react';
import PropTypes from 'prop-types';

function AccountErrorMessage({ testid, content }) {
  return (
    <section
      data-testid={ testid }
      className="text-sm text-default_dark_accent my-4"
    >
      {content}
    </section>
  );
}

AccountErrorMessage.propTypes = {
  testid: PropTypes.string,
  content: PropTypes.string,
}.isRequired;

export default AccountErrorMessage;
