import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Switch, 
  Route,
} from 'react-router-dom'
import clsx from 'clsx';

import Profile from './userProfile/Profile';
import Dashboard from './dashboard/Dashboard';
import DeviceAdmin from './device_admin/DeviceAdmin';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: theme.spacing(9),
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
}));

const ContentMain = ({open, setSelectedIndex}) => {
    const classes = useStyles();

    return (
        <main 
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.toolbar} />
          <Switch>
            <Route path='/profile'>
              <Profile setSelectedIndex={setSelectedIndex}/>
            </Route>
            <Route path='/device-admin'>
              <DeviceAdmin setSelectedIndex={setSelectedIndex}/>
            </Route>
            <Route path='/'>
              <Dashboard setSelectedIndex={setSelectedIndex}/>
            </Route>
          </Switch>
        </main>
    )
}

export default ContentMain
