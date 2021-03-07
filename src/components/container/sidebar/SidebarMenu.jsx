import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { NavLink } from 'react-router-dom'

const SidebarMenu = () => {
    return (
        <ListItem button key={'dashboard'} component={NavLink} to='/'>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
    )
}

export default SidebarMenu
