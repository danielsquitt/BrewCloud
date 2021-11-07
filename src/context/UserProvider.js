import React, {useContext, useEffect, useState} from 'react'

import {API, Auth} from '../Amplify';
import {CompanyContext} from './../context/CompanyProvider'
import {AuthContext} from './../context/AuthProvider'

export const UserContext = React.createContext()

const UserProvider = (props) => {

    const {info: companyInfo} = useContext(CompanyContext)
    const {permissions} = useContext(AuthContext)
    const [userList, setuserList] = useState([])

    useEffect(() => {
        //console.log('Info:',info);
        if(companyInfo.name && permissions?.manageUsers){
            const func = async()=>{
                listUsers()
                .then((userlist)=>{
                    return Promise.all(userlist.map((element) => {
                       return getUser(element.Username)
                    }))
                })
                .then((userlist)=>{
                    //console.log('userlist', userlist);
                    setuserList(userlist)
                })
            }
            func()
        }
    }, [companyInfo]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const func = async()=>{
            let apiName = 'apirest';
            let path = '/users';
            let headers= {
                    'Content-Type' : 'application/json',
                    Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                } 

            API.get(apiName, path, {headers})
            .then(result => console.log(result))
            .catch(err => console.log(err))
        }
        func()
    }, [])

    const listUsers = async() => {
        return await new Promise(async(resolve, reject) => {
            let apiName = 'AdminQueries';
            let path = '/listUsersInGroup';
            let headers= {
                    'Content-Type' : 'application/json',
                    Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                } 

            const listAdmin = API.get(apiName, path, {queryStringParameters: {"groupname": `${companyInfo.name}Admin`}, headers})
            const listProd = API.get(apiName, path, {queryStringParameters: {"groupname": `${companyInfo.name}Prod`}, headers})
            const listViwer = API.get(apiName, path, {queryStringParameters: {"groupname": `${companyInfo.name}Viwer`}, headers})
            
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
                let groups = []
                result[1].value.Groups.forEach(element => {
                    //console.log(element);
                    groups.push(element.GroupName)
                    if (element.GroupName.search(companyInfo.name) >= 0){
                        if (element.GroupName.search('Prod') > 0) _user['AccessGroup'] = 'Production'
                        if (element.GroupName.search('Admin') > 0) _user['AccessGroup'] = 'Administrator'
                        if (element.GroupName.search('Viwer') > 0) _user['AccessGroup'] = 'Viwer'
                    }
                })
                _user['GropusName'] = groups
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

    const changeUserGroup = async(idx, accesLevel) => {
        return await new Promise(async(resolve, reject) => {
            const apiName = 'AdminQueries';
            const pathRemove = '/removeUserFromGroup';
            const pathAdd = '/addUserToGroup'
            const headers= {
                    'Content-Type' : 'application/json',
                    Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                } 
            const currentGroupName = getUserGroup(idx);
            const newGroupName = getNewUserGroup(accesLevel);
            console.log(currentGroupName, newGroupName);
            const remove = API.post(apiName, pathRemove, {body: {"username": userList[idx].Username, groupname: currentGroupName}, headers})
            const add = API.post(apiName, pathAdd, {body: {"username": userList[idx].Username, groupname: newGroupName}, headers})
            Promise.allSettled([remove, add])
            .then(result => {
                //console.log(result);

                if(result[0].status === "rejected") reject(result[0].reason.response)
                if(result[1].status === "rejected") reject(result[1].reason.response)

                setuserList((list) => {
                    return list.map((user, index) =>{   
                        if (index === parseInt(idx)){
                            user.GropusName[user.GropusName.indexOf(currentGroupName)] = newGroupName
                            user.AccessGroup = accesLevel

                            return user
                        }
                        //console.log(user);
                        return user
                    })
                })


                resolve(result)
            })
        })    
    }

    const getUserGroup = (idx) => {
        return userList[idx].GropusName.find(element => {
            return element.search(companyInfo.name) >= 0
        })
    }

    const getNewUserGroup = (accesLevel) => {
        var userGroup = companyInfo.name
        switch (accesLevel) {
            case 'Production':
                userGroup = userGroup +'Prod'
                break;
            case 'Administrator':
                userGroup =userGroup +'Admin'
                break;
            default:
                userGroup =userGroup +'Viwer'
                break;
        }
        return userGroup
    }


    return (
        <UserContext.Provider value={{userList, setUserState, changeUserGroup}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider
