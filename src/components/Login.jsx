
// Libraries
import React, {useState, useEffect, useContext} from 'react'
import Credentials from './Login/Credentials'
import NewPassword from "./Login/NewPassword";
import {AuthContext} from "./../context/AuthProvider";

const Login = (props) => {

    const {state, login, updateUserPassword } = useContext(AuthContext)

    useEffect(() => {
        if(state.logged) props.history.push('/')

    }, [state.logged])

    if (state.newPasswordRequired){
        return(<NewPassword onSubmit={updateUserPassword}/>)
    }else{
        return(<Credentials onSubmit={login} />)
    }
}

export default Login
