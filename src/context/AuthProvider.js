
// LIBRARIS
import React, {useEffect, useState } from 'react'
//import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"
import {Auth} from '../Amplify';

// FILES
import Pool from '../UserPool';

export const AuthContext = React.createContext()



const AuthProvider = (props) => {

    

    // Athentification state
    const [state, setState] = useState({logged: false, newPasswordRequired: false, loading: false})
    
    // Cognito objects
    const [user, setUser] = useState(false)
    
    // User data
    const [UserInfo, setUserInfo] = useState(false)

    // REFRESH TOKEN
    //----------------------------------------------------------------------------------
    useEffect(() => {
        if (state.logged) {
            const interval = user.signInUserSession.accessToken.payload.exp-15 //session.accessToken.getExpiration()-session.accessToken.getIssuedAt()-15
            const id = setInterval(() => {
                //refresh()
                //.then()
            }, interval*1000)

            return () => clearInterval(id)
        }
    }, [state.logged])
    
    // REFRESH
    //----------------------------------------------------------------------------------
    const refresh = async() => {
        return await new Promise((resolve, reject) => {
            if (user){
                Auth.currentSession()
                    .then(data => resolve(data))
                    .catch(err => reject(err))
            }
       })
    }

    // LOGIN
    //----------------------------------------------------------------------------------
    const login = async(Username, Password) => {
        return await new Promise((resolve, reject) => {
            setState({logged: false, loading: true})
            authenticate(Username, Password)
            .then((result) => {
                if(result.requiredAttributes){
                    setState({logged: false, newPasswordRequired: true, loading: false})
                }else{
                    setState({logged: true, newPasswordRequired: false, loading: false})
                }
                resolve(result)
            })
            .catch((err) => {
                setState({logged: false, newPasswordRequired: false, loading: false})
                reject(err)
            })
        })
    }
    
    // AUTHENTICATE
    //----------------------------------------------------------------------------------

    const authenticate = async(Username, Password) => {
        return await new Promise((resolve, reject) => {
            Auth.signIn(Username, Password)
            .then((_user) => {
                if (_user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    setUser(_user)
                    const userAttributes = _user.challengeParam.userAttributes
                    const requiredAttributes = _user.challengeParam.requiredAttributes
                    resolve({userAttributes, requiredAttributes})
                } else {
                    setUser(_user)
                    const info = { 
                        username: _user.username, 
                        name: _user.attributes.name, 
                        family_name: _user.attributes.family_name, 
                        email: _user.attributes.email, 
                        sub: _user.attributes.sub}
                    setUserInfo(info)
                    resolve(_user)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
    }

    
    // LOG OUT
    //----------------------------------------------------------------------------------
    const logout = () => {
        const user = Pool.getCurrentUser()
        if (user){
            user.signOut()
            setState({logged: false, loading: false, message: ''})
            setUser(false)
        }
    }
    
    // UPDATE USER PASSWORD
    const updateUserPassword = async(Password, NewPassword, attributes) => {
        return await new Promise(async(resolve, reject) => {
            if (Password !== NewPassword){
                reject("Password doesn't match:", Password, NewPassword )
            }else{
                Auth.completeNewPassword(
                        user,
                        NewPassword, 
                        attributes
                )
                .then((_user) => {
                        setUser(_user)
                        const info = { 
                            username: _user.username, 
                            name: _user.attributes.name, 
                            family_name: _user.attributes.family_name, 
                            email: _user.attributes.email, 
                            sub: _user.attributes.sub}
                        console.log(info);
                        setUserInfo(info)
                        setState({logged: true, newPasswordRequired: false, loading: false})
                        resolve(_user)
                })   
                .catch((err) => {
                    reject(err)
                })
            }
        })    
    }

    // GET ATRIBUTES
    //----------------------------------------------------------------------------------
    const getUserAtributes = async() => {
        return await new Promise((resolve, reject) => {
            user.getUserAttributes(function(err, attributes) {
                if(err){
                    reject(err)
                }
                const results = {}
                for (let attribute of attributes){
                    const {Name, Value} = attribute
                    results[Name] = Value
                }
                resolve(results)
            })
        })
    }
    
    // RETRURN
    //----------------------------------------------------------------------------------
    return (
        <AuthContext.Provider value={{state, UserInfo, login, updateUserPassword, logout, getUserAtributes}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider