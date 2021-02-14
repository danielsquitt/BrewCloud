
// LIBRARIS
import React, {useEffect, useState} from 'react'
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"

// FILES
import Pool from '../UserPool';

export const AuthContext = React.createContext()

const AuthProvider = (props) => {

    // Athentification state
    const [state, setState] = useState({logged: false, newPasswordRequired: false, loading: false})
    
    // Cognito objects
    const [session, setSession] = useState(false)
    const [user, setUser] = useState(false)
    
    // User data
    const [UserInfo, setUserInfo] = useState(false)

    // REFRESH TOKEN
    //----------------------------------------------------------------------------------
    useEffect(() => {
        if (state.logged) {
            console.log('Esta psando por aqui')
            const interval = session.accessToken.getExpiration()-session.accessToken.getIssuedAt()-15
            const id = setInterval(() => {
                refresh()
                .then()
            }, interval*1000)

            return () => clearInterval(id)
        }
    }, [state.logged])
    
    // REFRESH
    //----------------------------------------------------------------------------------
    const refresh = async() => {
        return await new Promise((resolve, reject) => {
            if (user){
                user.refreshSession(session.refreshToken, (err, session_new) =>{
                    if(err){
                        reject(err)
                    }else{
                        setSession({session_new})
                        resolve(session_new)
                    }
                })
            }else{
                reject('User not set')
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
            
            var _user = new CognitoUser({ Username, Pool })    
            _user.authenticateUser(new AuthenticationDetails({ Username, Password }), {
                onSuccess: data => {
                    setSession(data)
                    setUser(_user)
                    const {'cognito:username':username, name, family_name, email, sub, auth_time} = data.idToken.decodePayload()
                    setUserInfo({username, name, family_name, email, sub, auth_time})
                    resolve(data)
                },
                onFailure: err => {
                    reject(err)
                },
                newPasswordRequired: (userAttributes, requiredAttributes) => {
                    setUser(_user)
                    resolve({userAttributes, requiredAttributes})
                }
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
            setSession(false)
            setUser(false)
        }
    }
    
    // UPDATE USER PASSWORD
    const updateUserPassword = async(Password, NewPassword, attributes) => {
        return await new Promise((resolve, reject) => {
            if (Password !== NewPassword){
                reject("Password doesn't match:", Password, NewPassword )
            }else{
                delete attributes.email_verified
                user.completeNewPasswordChallenge(NewPassword, attributes, {
                    onSuccess: (result) => {
                        authenticate(user.username, NewPassword)
                        .then((data) => {
                            resolve(data)
                        })
                        .catch((err) => {
                            reject(err)
                        })
                        resolve(result)
                      },
                      onFailure: (err) => {
                        reject(err)
                      }
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