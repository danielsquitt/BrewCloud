import React, {useState, useContext} from 'react'
import {makeStyles, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {DeviceContext} from './../../../context/DeviceProvider'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

const DeviceListHeaderItem = ({item, index, setIndex}) => {

    const classes = useStyles();

    const {deviceList} = useContext(DeviceContext)

    const [open, setOpen] = useState(true)

    const handleClick = ()=>{
        setOpen((_open) => {
            return !_open
        })
    }

    const getindex = () => {
        return index
    }

    return (
        <React.Fragment>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={item.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        item.elements.map((item)=>{
                            return( 
                                <ListItem 
                                    button
                                    key={item} 
                                    className={classes.nested}
                                    selected={getindex() === item}
                                    onClick={() => setIndex(item)}
                                >
                                    <ListItemText primary={deviceList[item]?.alias} />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Collapse>
        </React.Fragment>
    )
}

export default DeviceListHeaderItem
