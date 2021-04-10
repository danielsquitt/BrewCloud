import React, {useContext} from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles, ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core";
import { NavLink } from 'react-router-dom'

import {AuthContext} from './../../../context/AuthProvider'

const useStyles = makeStyles(theme => ({
    icon: {
        color: 'white',
      }
}))

const SidebarMenu = ({selectedIndex}) => {

    const classes = useStyles()

    const {permissions} = useContext(AuthContext)

    return (
        <List component="nav">
            <ListItem button key={'dashboard'} component={NavLink} to='/' selected={selectedIndex === 1}>
                <ListItemIcon className={classes.icon} >
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button key={'device'} component={NavLink} to='/device-admin' selected={selectedIndex === 2}>
                <ListItemIcon className={classes.icon} >
                    <PhonelinkSetupIcon />
                </ListItemIcon>
                <ListItemText primary="Device admin" />
            </ListItem>
            { 
                permissions?.manageUsers ? (
                    <ListItem button key={'device'} component={NavLink} to='/user-admin' selected={selectedIndex === 3}>
                        <ListItemIcon className={classes.icon} >
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users admin" />
                    </ListItem>
                ) : (null)
            }
        </List>
    )
}

export default SidebarMenu
