
// LIBRARIS
import React, {useEffect, useState } from 'react'
import {Auth} from '../Amplify';

// FILES
import Pool from '../UserPool';

export const AuthContext = React.createContext()

const init_permissions = {
    editThingName: false,
    editThingShadow : false,
    manageUsers: false
}

const permissions_document = {
    Viwer: {
        editThingName: false,
        editThingShadow : false,
    },
    Prod: {
        editThingName: false,
        editThingShadow : true,
        manageUsers: false
    },
    Admin: {
        editThingName: true,
        editThingShadow : true,
        manageUsers: false
    }
}

const AuthProvider = (props) => {

    // Athentification state
    const [state, setState] = useState({logged: false, newPasswordRequired: false})
    
    // Cognito objects
    const [user, setUser] = useState(false)
    
    // User data
    const [userInfo, setUserInfo] = useState(false)

    // Access level
    const [permissions, setPermissions] = useState(init_permissions)

    // REFRESH TOKEN
    //----------------------------------------------------------------------------------
    useEffect(() => {
        if (state.logged) {
            const interval = user.signInUserSession.accessToken.payload.exp - user.signInUserSession.accessToken.payload.iat
            const id = setInterval(() => {
                refresh()
                .then()
            }, interval*1000)

            return () => clearInterval(id)
        }
    }, [state.logged]) // eslint-disable-line react-hooks/exhaustive-deps
    
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
                    setUserInfo(getUserInfo(_user))
                    setPermissions(getgetAccessLevelDocumment(_user.signInUserSession.idToken.payload['cognito:groups']))
                    Auth.currentCredentials().then((info) => {
                    console.log(`%cIdentity Id:%c${info.identityId}`, "font-size: 15px; font-weight: bold", "color:blue; font-size: 15px")})
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
            setUserInfo(false)
            setPermissions(init_permissions)
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
                        setUserInfo(getUserInfo(_user))
                        setPermissions(getgetAccessLevelDocumment(_user.signInUserSession.idToken.payload['cognito:groups']))
                        setState({logged: true, newPasswordRequired: false, loading: false})
                        resolve(_user)
                })   
                .catch((err) => {
                    reject(err)
                })
            }
        })    
    }

    // UPDATE ATRIBUTES
    //----------------------------------------------------------------------------------
    const updateAtributes = async(atributes) => {
        return await new Promise((resolve, reject) => {
            Auth.updateUserAttributes(user, atributes)
            .then(()=>{
                return Auth.userAttributes(user)
            })
            .then((result)=>{
                console.log(result);
                const _userInfo = {username: userInfo.username, group: userInfo.group}
                result.forEach((element) => {
                    _userInfo[element.Name] = element.Value
                })
                setUserInfo(_userInfo);
                resolve(result)
            })
            .catch((err) => {
                console.log();
                reject(err)
            })
        })
    }

    // CHANGE PASSWORD
    //----------------------------------------------------------------------------------
    const changePassword = async(password, new_password) => {
        console.log('Change password', password, new_password);
        return await new Promise((resolve, reject) => {
            Auth.changePassword(user,password, new_password)
            .then((result)=>{
                console.log(result);
                resolve(result)
            })
            .catch((err) => {
                console.log(err);
                reject(err)
            })
        })
    }

    const getAccessLevelString = (group) => {
        if (group.search('Prod') >= 0) return 'Production'
        if (group.search('Admin') >= 0) return 'Administrator'
        return 'Viwer'
    }

    const getgetAccessLevelDocumment = (groups) => {
        let document = init_permissions
        groups.forEach(element => {
            if (element.search('Viwer') > 0) document = permissions_document['Viwer']
            else if (element.search('Prod') > 0) document = permissions_document['Prod']
            else if (element.search('Admin') > 0) document = permissions_document['Admin']
        });
        if (groups.find(element => element === 'AdminQueriesAPI')) document['manageUsers'] = true
        else document['manageUsers'] = false
        
        return document
    }

    const getUserInfo = (_user) => {
        return ({ 
            username: _user.username, 
            name: _user.attributes.name, 
            family_name: _user.attributes.family_name, 
            email: _user.attributes.email, 
            email_verified: _user.attributes.email_verified,
            sub: _user.attributes.sub,
            group: getAccessLevelString(_user.signInUserSession.idToken.payload['cognito:groups'][0])
        })
    }
    
    // RETRURN
    //----------------------------------------------------------------------------------
    return (
        <AuthContext.Provider value={{state, userInfo, permissions, login, updateUserPassword, logout, updateAtributes, changePassword}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider