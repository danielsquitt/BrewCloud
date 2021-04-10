import React, {useContext, useEffect} from 'react'

import {API, Auth} from '../Amplify';
import {CompanyContext } from './../context/CompanyProvider'

export const UserContext = React.createContext()

const UserProvider = (props) => {

    const {info} = useContext(CompanyContext)

    useEffect(() => {
        //console.log('Info:',info);
        if(info.name && false){
            const func = async()=>{
                listUsers()
                .then((userlist)=>{
                    //console.log('userlist',userlist);
                    userlist.forEach(async(element) => {
                        //console.log('Element', element);
                        await getUser(element.Username)
                    })
                })
            }
            func()
        }
    }, [info])

    const listUsers = async() => {
        return await new Promise(async(resolve, reject) => {
            let apiName = 'AdminQueries';
            let path = '/listUsersInGroup';
            let headers= {
                    'Content-Type' : 'application/json',
                    Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                } 

            const listAdmin = API.get(apiName, path, {queryStringParameters: {"groupname": `${info.name}Admin`}, headers})
            const listProd = API.get(apiName, path, {queryStringParameters: {"groupname": `${info.name}Prod`}, headers})
            const listViwer = API.get(apiName, path, {queryStringParameters: {"groupname": `${info.name}Viwer`}, headers})
            
            const userList = []

            Promise.allSettled([listAdmin, listProd, listViwer])
            .then(values =>{
                //console.log(values)
                values.forEach(usergroupList => {
                    //console.log('usergroupList', usergroupList);
                    if (usergroupList.status === "fulfilled") {
                        usergroupList.value.Users.forEach(user => {
                            //console.log('user', user);
                            const _user = user
                            delete _user.Attributes
                            userList.push(_user)
                        });
                    }
                });
                //console.log(userList);
                resolve(userList)
            })
        })
    }

    const getUser = async(username) => {
        return await new Promise(async(resolve, reject) => {
            let apiName = 'AdminQueries';
            let path = '/getUser';
            let headers= {
                    'Content-Type' : 'application/json',
                    Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                } 
            API.get(apiName, path, {queryStringParameters: {"username": username}, headers})
            .then(user => {
                console.log('User', user);
                const _user = {...user}
                delete _user.UserAttributes
                user.UserAttributes.forEach(element => {
                    _user[element.Name] = element.Value
                });
                console.log('User', _user);
                resolve(_user)
            })
            .catch(error => {
                console.log(error.response)
                reject(error)
            })
        })
    }

    return (
        <UserContext.Provider value={{listUsers, getUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider
