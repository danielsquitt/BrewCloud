import React, {useContext, useState, useEffect} from 'react'
import {makeStyles, Grid, Card, CardHeader, CardContent, Divider, Typography, Box } from '@material-ui/core';

import { DeviceContext } from './../../../context/DeviceProvider';

import ThreeLedTest from './widgets/ThreeLedTest'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardRoot: {
      minWidth: 275,
    },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  typography: {
    fontSize: '2rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '1.5rem',
    },
  },
  cardtitle: {
    fontSize: '2rem',
  },
  
}));

const Dashboard = () => {

  const classes = useStyles();

  const {deviceList} = useContext(DeviceContext)

  const [DeviceWidgets, setDeviceWidgets] = useState([])

  useEffect(() => {
    setDeviceWidgets(deviceList.map((item, index) =>{
      return(<ThreeLedTest key={index} data={item}/>)
    }))
    
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
