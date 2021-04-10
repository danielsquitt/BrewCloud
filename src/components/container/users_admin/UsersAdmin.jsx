import React, {useEffect, useContext, useState} from 'react'
import {Grid} from '@material-ui/core';
import UserDetail from './UserDetail';
import UserList from './UserList';

import { UserContext } from './../../../context/UserProvider';

const UsersAdmin = ({setSelectedIndex}) => {

    const {listUsers}  = useContext(UserContext)

    const [currentUserIdx, setCurrentUserIdx] = useState(-1)

    const [username, setUsername] = useState('')

    const [userList, setUserList] = useState([])

    useEffect(() => {
        setSelectedIndex(3)
    }) 

    useEffect(async() => {
        listUsers()
        .then((users) => {
            setUserList(users.map(element => {
                return(element)
            }))
        })
    }, [])

    useEffect(() => {
        if(currentUserIdx >= 0){
            setUsername(userList[currentUserIdx].Username)
        }
    }, [currentUserIdx])

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={8} xl={9}>
                {username !== '' ? (<UserDetail username= {username}/>) : (null)}
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
                <UserList list={userList} index={currentUserIdx} setIndex={setCurrentUserIdx} />
            </Grid>
        </Grid>
    )
}

export default UsersAdmin
