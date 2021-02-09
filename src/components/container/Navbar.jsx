import React from 'react'
import clsx from 'clsx';
import {AppBar, Toolbar, Typography, Button, IconButton, makeStyles} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 250;

const useStyle = makeStyles(theme => ({
    hide: {
        display: 'none',
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonOpen: {

    },
    menuButtonClose: {
        marginLeft: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        //zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarOpen: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarClose: {
        marginLeft: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
    }
    
}))

const Navbar = (props) => {

    const {open, onClose, onOpen} = props

    const classes = useStyle()

    const ClickHandler = ()=>{
        if(open){
            onClose()
        } else {
            onOpen()
        }
    }

    return (
        <AppBar 
            className={clsx(classes.appBar, {
                [classes.appBarOpen]: open,
            })}
            area
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={ClickHandler}
                    edge="start"
                    className={clsx(classes.menuButton, {
                    [classes.menuButtonOpen]: open,
                    [classes.menuButtonClose]: !open,
                    })}
                >
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
