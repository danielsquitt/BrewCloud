import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Switch, 
  Route,
} from 'react-router-dom'

import Profile from './userProfile/Profile';
import Dashboard from './dashboard/Dashboard';

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
}));

const ContentMain = () => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path='/profile' component={Profile}/>
              <Route path='/' component={Dashboard}/>
            </Switch>
        </main>
    )
}

export default ContentMain
