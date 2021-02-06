// LIBRARY
import React from 'react';

// COMPONENTS
import Main from './components/Main';
import AuthProvider from './context/AuthProvider';

function App(props) {
  return (
  <AuthProvider>
    <Main />
  </AuthProvider>
  );
}

export default App;
