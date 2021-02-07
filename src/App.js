// LIBRARY
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles'

// COMPONENTS
import Main from './components/Main';
import AuthProvider from './context/AuthProvider';
import EventProvider from "./context/EventProvider";

//OTHERs
import theme from './themeConfig' ;

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <EventProvider>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </EventProvider>
    </ThemeProvider>
  );
}

export default App;
