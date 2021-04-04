import React, {useContext} from 'react'
import clsx from 'clsx';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles, List, ListItem, ListItemText, ListItemAvatar, ListItemIcon , Typography, IconButton } from "@material-ui/core";
import { NavLink } from 'react-router-dom'
import { AuthContext } from "./../../../context/AuthProvider"

//const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
      avatar: {
        boxShadow: theme.shadows[3],
      },
      typography: {
        fontSize: 14,
        color: 'white',
      },
      icon: {
        color: 'white',
      }
}))

const SidebarUser = ({selectedIndex}) => {

    const classes = useStyles()

    const { userInfo, logout} = useContext(AuthContext)

    return (
      <List component="nav">
        <ListItem className={clsx(classes.root)} component={NavLink} to='/profile' selected={selectedIndex === 0}>
          <ListItemAvatar className={classes.icon} >
            <AccountCircleIcon fontSize="large"/>
          </ListItemAvatar >
          <ListItemText primary={<Typography variant="overline" className={classes.typography}>{`${userInfo.name} ${userInfo.family_name}`}</Typography>}/>
          <ListItemIcon>
            <IconButton edge="end" aria-label="delete" onClick={()=>{logout()}}>
              <ExitToAppIcon color="secondary" fontSize="large"/>
            </IconButton>
          </ListItemIcon>
        </ListItem>
      </List>
    )
}

export default SidebarUser
