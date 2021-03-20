import React, {useEffect, useState, useContext} from 'react'
import {makeStyles, Paper, Grid, Card, CardHeader, Divider, CardContent, List, ListItem, ListItemText, ListItemIcon, ListSubheader } from '@material-ui/core';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Brightness1Icon from '@material-ui/icons/Brightness1';

import {DeviceContext} from './../../../context/DeviceProvider'
import DeviceList from './DeviceList';
import DeviceCardBase from './DeviceCardBase';
import DeviceCardThreeLedTest from './DeviceCardThreeLedTest';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
  }));

const DeviceAdmin = ({setSelectedIndex}) => {

    const classes = useStyles();

    const {deviceList} = useContext(DeviceContext)
    const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);
 
    useEffect(() => {
        setSelectedIndex(2)
      }, [])
      
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={8} xl={9}>
                <DeviceCardBase index={selectedDeviceIndex}>
                    <DeviceCardThreeLedTest edit/>
                </DeviceCardBase>
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
                <DeviceList index={selectedDeviceIndex} setIndex={setSelectedDeviceIndex} />
            </Grid>
        </Grid>
    )
}

export default DeviceAdmin
