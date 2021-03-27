import React, {useContext, useState, useEffect} from 'react'
import {Divider, Grid, Box, Paper, Typography} from '@material-ui/core';

import { DeviceContext } from './../../../context/DeviceProvider';

import ThreeLedTest from './widgets/ThreeLedTest'
import TempControl from './widgets/TempControl';
import TempPressureControl from './widgets/TempPressureControl';

const Dashboard = ({setSelectedIndex}) => {

  const {deviceList, deviceByType} = useContext(DeviceContext)

  const [DeviceWidgets, setDeviceWidgets] = useState([])

  useEffect(() => {
    setSelectedIndex(1)
  }, [])

  useEffect(() => {
    if (deviceList.length > 0) {
      setDeviceWidgets(deviceList.map((item, index) =>{
          switch (item.deviceType.name) {
            case '3LedTest':
              return <ThreeLedTest key={index} idx={index} data={item}/>
            case 'TempControl':
              return <TempControl  key={index} idx={index} data={item}/>
            case 'TePreControl':
              return <TempPressureControl  key={index} idx={index} data={item}/>
          }
      }))
    }else{
      setDeviceWidgets([])
    }
  }, [deviceList]) 

  const getComponent = (index) => {
    switch (deviceList?.[index]?.deviceType.shadownName) {
      case '3led':
        return <ThreeLedTest key={index} idx={index} data={deviceList[index]}/>
      case 'TempControl':
        return <TempControl  key={index} idx={index} data={deviceList[index]}/>
      case 'TePreControl':
        return <TempPressureControl  key={index} idx={index} data={deviceList[index]}/>
      default:
        return null
    }
  }

    return (
          <Grid container spacing={1}> 
            {
              deviceByType.map((element, index) => {
                return(
                  <Grid key= {index} item xs={12}>
                    <Typography variant="h4" >{element.name}</Typography>
                    <Divider/>
                    <Grid container component={Box} pt={1} pb={2} px={1} spacing={1}>
                        {element.elements.map((comp) => {
                          //console.log(comp);
                          return(
                                getComponent(comp)
                          )
                        })}
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
    )
}

export default Dashboard
