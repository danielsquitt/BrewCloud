import React, {useEffect, useState, useContext}  from 'react'
import {makeStyles, Paper, Grid, Card, CardHeader, Divider, CardContent, List, ListItem, ListItemText, ListItemIcon, ListSubheader } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {DeviceContext} from './../../../context/DeviceProvider'
import DeviceListHeaderItem from './DeviceListHeaderItem';

const DeviceList = ({index, setIndex}) => {

    const {deviceList, deviceByType} = useContext(DeviceContext)

    const [open, setOpen] = useState([])

    useEffect(() => {
        setIndex(0)
    }, [])

    useEffect(() => {
        const _open = []
        Object.keys(deviceByType).map((item, index) => {
            _open.push(true)
        })
        setOpen(_open)
    }, [deviceByType])


    


    return (
        <Card elevation={3}>
            <CardHeader
                title={'Device List'}
            />
            <Divider/>
            <CardContent>
                <Paper style={{maxHeight: '600px', overflow: 'auto'}}>
                    <List>
                    {
                        deviceByType.map((item, idx) => {
                            return(
                                <DeviceListHeaderItem key= {idx} item={item} index={index} setIndex={setIndex}/>
                            )
                        })
                    }
                </List>
                </Paper>
            </CardContent>
        </Card>
        
    )
}

export default DeviceList
