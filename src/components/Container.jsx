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
import UserProvider from './../context/UserProvider';

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

    const [open, setOpen] = React.useState(false);
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
        setOpen(false);
      };

    return (
      <DeviceProvider>
        <UserProvider>
          <Route>
              <div className={classes.root}>
                  <Navbar open={open} onClose={handleDrawerClose} onOpen={handleDrawerOpen}/>
                  <Sidebar open={open} onClose={handleDrawerClose} onOpen={handleDrawerOpen} selectedIndex={selectedIndex}/>
                  <ContentMain open={open} setSelectedIndex={setSelectedIndex}/>
              </div>
          </Route>    
        </UserProvider>
      </DeviceProvider>
    )
}

export default Container
