import React, {useEffect, useState} from 'react'
import {makeStyles, Grid} from '@material-ui/core';

import DeviceList from './DeviceList';
import DeviceCardThreeLedTest from './DeviceCardThreeLedTest';

const DeviceAdmin = ({setSelectedIndex}) => {

    const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(1);
 
    useEffect(() => {
        setSelectedIndex(2)
      }, [])
      
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={8} xl={9}>
                <DeviceCardThreeLedTest edit index={selectedDeviceIndex}/>
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
                <DeviceList index={selectedDeviceIndex} setIndex={setSelectedDeviceIndex} />
            </Grid>
        </Grid>
    )
}

export default DeviceAdmin
