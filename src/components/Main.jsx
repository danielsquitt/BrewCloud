
// LIBRARIES
import React, {useContext, useEffect} from 'react'
import {
    BrowserRouter as Router, 
    Switch, 
    Route,
    Redirect,
  } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

// COMPONETS
import Login from './Login'
import Conteiner from './Container'

// CONTEXT
import {AuthContext} from '../context/AuthProvider'

// OTHERS
import theme from './../themeConfig' ;


const Main = () => {

  const {state} = useContext(AuthContext)

  const PrivateRoute = ({path, component, ...rest}) =>{
    if(state.logged){
        return <Route  path = {path} component = {component} {...rest} />
    }else{
        return <Redirect to="/login" {...rest} />
    }
  }

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <PrivateRoute path='/' component={Conteiner}/>
                </Switch>
            </Router>
        </ThemeProvider>
    )
}

export default Main
