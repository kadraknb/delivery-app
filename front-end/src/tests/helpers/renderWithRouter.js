import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

const renderWithRouter = (component, path = '/') => {
  const history = createMemoryHistory({ initialEntries: [path] });

  return ({
    ...render(<Router>{component}</Router>), history,
  });
};
export default renderWithRouter;
