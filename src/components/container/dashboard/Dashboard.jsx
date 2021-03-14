import React, {useContext, useState, useEffect} from 'react'
import {Grid} from '@material-ui/core';

import { DeviceContext } from './../../../context/DeviceProvider';

import ThreeLedTest from './widgets/ThreeLedTest'

const Dashboard = () => {

  const {deviceList} = useContext(DeviceContext)

  const [DeviceWidgets, setDeviceWidgets] = useState([])

  useEffect(() => {
    if (deviceList.length > 0) {
      setDeviceWidgets(deviceList.map((item, index) =>{
        return(<ThreeLedTest key={index} data={item}/>)
      }))
    }else{
      setDeviceWidgets([])
    }
  }, [deviceList]) 

    return (
        <div>
          <Grid container spacing={1}> 
            {DeviceWidgets}
          </Grid>
        </div>
    )
}

export default Dashboard
