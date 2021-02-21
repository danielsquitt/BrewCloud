import React, {useContext} from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme , Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Box , Avatar, Typography, Grid } from "@material-ui/core";
import { MoveToInbox as InboxIcon, 
         Mail as MailIcon,
         ChevronLeft as ChevronLeftIcon,
         ChevronRight as ChevronRightIcon  } from '@material-ui/icons';
import {purple} from '@material-ui/core/colors';
import { CompanyContext } from './../../context/CompanyProvider';

//import logo from "./../../img/Logo.png";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
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
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
      },
      avatar: {
        boxShadow: theme.shadows[3],
      },
      typography: {
        fontSize: 16,
      },
}))

const SideBar = (props) => {

    const {open, onClose, onOpen} = props

    const classes = useStyles()
    const theme = useTheme();

    const {info} = useContext(CompanyContext)

    return (
        <Drawer 
          variant="permanent"
          className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
          })}
          classes={{
          paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
          }),
          }}
          onClose={()=>{onClose()}}
        >
          <List>
            <ListItem className={clsx(classes.root)} >
              <ListItemIcon>
                <Avatar alt="Logo" src={info.faviIconUrl} className={classes.avatar} />
              </ListItemIcon>
              <ListItemText primary={<Typography variant="overline" className={classes.typography}>{info.name}</Typography>}/>
            </ListItem>
          </List>
          <Divider/>
          <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
          ))}
          </List>
        <Divider />
        </Drawer>
    )
}

export default SideBar
