import React from 'react'
import clsx from 'clsx';
import { makeStyles, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import { MoveToInbox as InboxIcon, 
         Mail as MailIcon} from '@material-ui/icons';
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarUser from "./sidebar/SidebarUser";
import SidebarMenu from './sidebar/SidebarMenu';

//import logo from "./../../img/Logo.png";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        color:'white',
        backgroundColor: '#343A40'
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(9),
      }
}))

const SideBar = (props) => {

    const {open, onClose} = props

    const classes = useStyles()
    return (
        <Drawer 
          variant="permanent"
          classes={{
          paper: clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
          }),
          }}
          onClose={()=>{onClose()}}
        >
          <SidebarHeader/>
          <Divider/>
          <SidebarUser selectedIndex={props.selectedIndex}/>
          <Divider/>
          <SidebarMenu selectedIndex={props.selectedIndex}/>
        <Divider />
        </Drawer>
    )
}

export default SideBar
