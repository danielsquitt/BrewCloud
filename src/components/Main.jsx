
// LIBRARIES
import React, { useContext } from 'react'
import {
    BrowserRouter as Router, 
    Switch, 
    Route,
    Redirect,
  } from 'react-router-dom'  

// COMPONETS
import Login from './Login'
import Conteiner from './Container'

// CONTEXT
import { AuthContext } from '../context/AuthProvider'
import { EventContext } from "../context/EventProvider";

const Main = () => {

  const {state} = useContext(AuthContext)
  const {alertArray} = useContext(EventContext)

  const PrivateRoute = ({path, component, ...rest}) =>{
    if(state.logged){
        return <Route  path = {path} component = {component} {...rest} />
    }else{
        return <Redirect to="/login" {...rest} />
    }
  }

    return (
      <div>
        {alertArray}
        <Router>
            <Switch>
                <Route path='/login/:id?' component={Login}/>
                <PrivateRoute path='/' component={Conteiner}/>
            </Switch>
        </Router>
      </div>
    )
}

export default Main
