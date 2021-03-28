import React, {useEffect, useState} from 'react'
import {Grid} from '@material-ui/core';

  
import DeviceList from './DeviceList';
import DeviceCardSelector from './DeviceCardSelector';

const DeviceAdmin = (props) => {

    const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0)

    useEffect(() => {
        console.log(props);
        const idx = props.match.params?.idx
        props.setSelectedIndex(2)
        setSelectedDeviceIndex(() => {return idx ? idx : 0 })
        
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
