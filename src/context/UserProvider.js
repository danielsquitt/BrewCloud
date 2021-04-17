import React, {useContext, useEffect, useState} from 'react'

import {API, Auth} from '../Amplify';
import {CompanyContext } from './../context/CompanyProvider'

export const UserContext = React.createContext()

const UserProvider = (props) => {

    const {info} = useContext(CompanyContext)
    const [userList, setuserList] = useState([])

    useEffect(() => {
        //console.log('Info:',info);
        if(info.name && true){
            const func = async()=>{
                listUsers()
                .then((userlist)=>{
                    return Promise.all(userlist.map((element) => {
                       return getUser(element.Username)
                    }))
                })
                .then((userlist)=>{
                    console.log('userlist', userlist);
                    setuserList(userlist)
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
            const apiName = 'AdminQueries';
            const pathUser = '/getUser';
            const pathGroup = '/listGroupsForUser'
            const headers= {
                    'Content-Type' : 'application/json',
                    Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                } 
            const user = API.get(apiName, pathUser, {queryStringParameters: {"username": username}, headers})
            const groups = API.get(apiName, pathGroup, {queryStringParameters: {"username": username}, headers})
            Promise.allSettled([user, groups])
            .then(result => {
                //console.log('result', result);
                // Check result
                if(result[0].status === "rejected") reject(result[0].reason.response)
                if(result[1].status === "rejected") reject(result[1].reason.response)

                // Get user info
                const _user = {...result[0].value}
                _user.UserAttributes.forEach(element => {
                    _user[element.Name] = element.Value
                })
                delete _user.UserAttributes

                // Get user groups
                const groups = []
                result[1].value.Groups.forEach(element => {
                    groups.push(element.GroupName)
                })
                _user['Groups'] = groups

                //console.log('User', _user)
                resolve(_user)
            })
        })
    }

    const setUserState = async(index, status)=>{
        return await new Promise(async(resolve, reject) => {
            const username = userList[index].Username
            let apiName = 'AdminQueries';
            let path = status ? '/enableUser' : '/disableUser';
            let headers= {
                    'Content-Type' : 'application/json',
                    Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                } 
            await API.post(apiName, path, {body: {"username": username}, headers})
            .then((result)=>{
                setuserList((list)=>{
                    return list.map((user, idx)=>{
                        if (idx === parseInt(index)) return {...user, Enabled: status}
                        return user
                    })
                })
                resolve(result)
            })
            .catch((error)=>{
                console.log(error);
                reject(error)
            })
        })
    }

    const changeUserGroup = async(username, newGroup) => {
        return await new Promise(async(resolve, reject) => {
            const apiName = 'AdminQueries';
            const pathRemove = '/removeUserFromGroup';
            const pathAdd = '/addUserToGroup'
            const headers= {
                    'Content-Type' : 'application/json',
                    Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                } 
            const currentGroupName = ``;
            const newGroupName = ``;
            const remove = API.post(apiName, pathRemove, {body: {"username": username}, headers})
            const add = API.post(apiName, pathAdd, {body: {"username": username}, headers})
        })    
    }


    return (
        <UserContext.Provider value={{userList, setUserState}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider
