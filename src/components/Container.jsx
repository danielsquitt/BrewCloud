import React, {useEffect} from 'react'
import { 
    Route,
  } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'

// COMPONETS
import Navbar from './container/Navbar'
import Sidebar from './container/Sidebar'

// CONTEXT
import DeviceProvider from './../context/DeviceProvider';

import ContentMain from './container/ContentMain';

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
    const [selectedIndex, setSelectedIndex] = React.useState(1);

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
      <DeviceProvider>
        <Route>
            <div className={classes.root}>
                <Navbar open={open} onClose={handleDrawerClose} onOpen={handleDrawerOpen}/>
                <Sidebar open={open} onClose={handleDrawerClose} onOpen={handleDrawerOpen} selectedIndex={selectedIndex}/>
                <ContentMain open={open} setSelectedIndex={setSelectedIndex}/>
            </div>
        </Route>    
      </DeviceProvider>
    )
}

export default Container
