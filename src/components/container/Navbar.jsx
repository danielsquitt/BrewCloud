import React, {useState, useContext, useEffect} from 'react'
import clsx from 'clsx';
import {AppBar, Toolbar, IconButton, makeStyles} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import CompanySelector from './componets/CompanySelector';

import { CompanyContext } from './../../context/CompanyProvider';

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
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(9),
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

    const {companyList, setActualCompany} = useContext(CompanyContext)

    const [companyValue, setCompanyValue] = useState('')
    const [list, setList] = useState([])
    const [loaded, setloaded] = useState(false)

    useEffect(() => {
        //console.log('List', companyList);
        if(companyList){
            setList(companyList.map((item, index)=>{
                return { value: index, label: item.name }
              }))
        }
    }, [companyList])

    useEffect(() => {
        if (list.length > 1){
            setloaded(true)
            setCompanyValue(list[0])
        }else{
            setloaded(false)
            setCompanyValue('')
        }
        //console.log(list);
    }, [list])

    useEffect(() => {
        if (loaded){
            setActualCompany(companyValue.value)
        }
    }, [companyValue])

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
                {
                    loaded ? (<CompanySelector items={list} value={companyValue} setValue={setCompanyValue} />) : null
                }
                
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
