import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import { makeStyles, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    icon: {
        color: 'white',
      }
}))

const SidebarMenu = () => {

    const classes = useStyles()

    return (
        <ListItem button key={'dashboard'} component={NavLink} to='/'>
            <ListItemIcon className={classes.icon} >
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
    )
}

export default SidebarMenu
