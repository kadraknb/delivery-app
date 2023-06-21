import React from 'react';

import Provider from './context';
import Router from './Router';

function App() {
  return (
    <Provider>
      <div className="App select-none">
        <Router />
      </div>
    </Provider>
  );
}

export default App;
