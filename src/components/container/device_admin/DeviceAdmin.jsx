import React, {useEffect, useState} from 'react'
import {makeStyles, Grid} from '@material-ui/core';

import {useParams} from "react-router-dom";
  
import DeviceList from './DeviceList';
import DeviceCardSelector from './DeviceCardSelector';

const DeviceAdmin = (props) => {

    const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(1);

    
 
    useEffect(() => {
        const idx = props.match.params?.idx
        console.log(props);
        props.setSelectedIndex(2)
        if (idx) {
            console.log('From pros', idx);
            setSelectedDeviceIndex(idx)
        } else {
            console.log('Default');
            setSelectedDeviceIndex(1)
        }
        
      }, [])
      
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={8} xl={9}>
                <DeviceCardSelector index={selectedDeviceIndex}/>
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
                <DeviceList index={selectedDeviceIndex} setIndex={setSelectedDeviceIndex} />
            </Grid>
        </Grid>
    )
}

export default DeviceAdmin
