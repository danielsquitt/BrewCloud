import React, {useEffect, useState, useContext} from 'react'
import {makeStyles, Paper, Grid, Card, CardHeader, Divider, CardContent, List, ListItem, ListItemText, ListItemIcon, ListSubheader, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {DeviceContext} from './../../../context/DeviceProvider'
import { TrendingUpRounded } from '@material-ui/icons';

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

    const {deviceList, deviceByType} = useContext(DeviceContext)

    const [open, setOpen] = useState(false)

    const handleClick = (index)=>{
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
                <ListItemText primary={item} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        deviceByType[item].map((item)=>{
                            return( 
                                <ListItem 
                                    button
                                    key={item} 
                                    className={classes.nested}
                                    selected={getindex() === item}
                                    onClick={() => setIndex(item)}
                                >
                                    <ListItemText primary={deviceList[item].alias} />
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
