import React, {useEffect} from 'react'
import {
    Switch, 
    Route,
  } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'

// COMPONETS
import Footer from './container/Footer'
import Navbar from './container/Navbar'
import Sidebar from './container/Sidebar'

import Dashboard from './container/dashboard/Dashboard'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
}));    

const Container = () => {

    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('lg'));

    const [open, setOpen] = React.useState(true);

    useEffect(() => {
      if(matches){
        setOpen(true)
      }
    }, [matches])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        console.log('Close request');
        setOpen(false);
      };

    return (
        <Route>
            <div className={classes.root}>
                <Navbar open={open} onClose={handleDrawerClose} onOpen={handleDrawerOpen}/>
                <Sidebar open={open} onClose={handleDrawerClose} onOpen={handleDrawerOpen}/>
                <Switch>
                    <Route exact path='/' component={Dashboard}/>                                           
                </Switch>
            </div>
        </Route>    
    )
}

export default Container
