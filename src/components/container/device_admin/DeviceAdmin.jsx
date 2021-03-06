import React, {useEffect, useState} from 'react'
import {Grid} from '@material-ui/core';

  
import DeviceList from './DeviceList';
import DeviceCardSelector from './DeviceCardSelector';

const DeviceAdmin = (props) => {

    const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(-1)

    useEffect(() => {
        props.setSelectedIndex(2)
      }) 

      useEffect(() => {
        const idx = props.match?.params?.idx
        setSelectedDeviceIndex(() => {return idx ? idx : -1 })
      }, [props])

      const setIndex = (idx) => {
        props.history.push(`/device-admin/${idx}`)
      }
      
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={8} xl={9}>
              {selectedDeviceIndex >= 0 ? (
                <DeviceCardSelector index={selectedDeviceIndex}/>
              ) : (null)}                
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
                <DeviceList index={selectedDeviceIndex} setIndex={setIndex} />
            </Grid>
        </Grid>
    )
}

export default DeviceAdmin
