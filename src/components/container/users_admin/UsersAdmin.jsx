import React, {useEffect, useState} from 'react'
import {Grid} from '@material-ui/core';
import UserDetail from './UserDetail';
import UserList from './UserList';



const UsersAdmin = (props) => {

    const [currentUserIdx, setCurrentUserIdx] = useState(-1)

    useEffect(() => {
        props.setSelectedIndex(3)
    }) 

    useEffect(() => {
        const idx = props.match?.params?.idx
        setCurrentUserIdx(() => {return idx ? idx : -1 })
    }, [props])

    const setIndex = (idx) => {
        props.history.push(`/user-admin/${idx}`)
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={8} xl={9}>
            {currentUserIdx >= 0 ? (
                    <UserDetail index= {currentUserIdx}/>
                ) : (null)}
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
                <UserList index={currentUserIdx} setIndex={setIndex} />
            </Grid>
        </Grid>
    )
}

export default UsersAdmin
