import React, {useContext, useState, useEffect} from 'react'
import {Grid} from '@material-ui/core';

import { DeviceContext } from './../../../context/DeviceProvider';

import ThreeLedTest from './widgets/ThreeLedTest'
import TempControl from './widgets/TempControl';

const Dashboard = ({setSelectedIndex}) => {

  const {deviceList} = useContext(DeviceContext)

  const [DeviceWidgets, setDeviceWidgets] = useState([])

  useEffect(() => {
    setSelectedIndex(1)
  }, [])

  useEffect(() => {
    if (deviceList.length > 0) {
      setDeviceWidgets(deviceList.map((item, index) =>{
          switch (item.deviceType.name) {
            case '3LedTest':
              return <ThreeLedTest key={index} data={item}/>
            case 'TempControl':
              return <TempControl  key={index} data={item}/>
          }
      }))
    }else{
      setDeviceWidgets([])
    }
  }, [deviceList]) 

    return (
          <Grid container spacing={1}> 
            {DeviceWidgets}
          </Grid>
    )
}

export default Dashboard
