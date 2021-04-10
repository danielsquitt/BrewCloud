// LIBRARY
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles'

// COMPONENTS
import Main from './components/Main';
import AuthProvider from './context/AuthProvider';
import EventProvider from './context/EventProvider';

//OTHERs
import theme from './themeConfig' ;
import CompanyProvider from './context/CompanyProvider';
import { CssBaseline } from '@material-ui/core';
import UserProvider from './context/UserProvider';

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <EventProvider>
          <AuthProvider>
            <CompanyProvider>
              <UserProvider>
                <Main />
              </UserProvider>
            </CompanyProvider>
          </AuthProvider>
        </EventProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
