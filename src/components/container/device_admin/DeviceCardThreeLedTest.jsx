import React, {useContext, useState, useEffect} from 'react'
import DeviceCardBase from './DeviceCardBase'
import {makeStyles, Grid, Divider, Typography, Button, FormControl, Select, InputLabel, Backdrop, CircularProgress    } from '@material-ui/core';

import {DeviceContext} from './../../../context/DeviceProvider'
import {EventContext} from './../../../context/EventProvider';

import { PubSub } from './../../../Amplify';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 60,
      [theme.breakpoints.up('md')]:{
        minWidth: 120,
      }
    },
    option: {
        fontSize: '.5rem',
        [theme.breakpoints.up('md')]:{
            fontSize: '1rem'
          }
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const DeviceCardThreeLedTest = (props) => {
    const classes = useStyles();
    const {deviceList} = useContext(DeviceContext)
    const {setBackdrop, resetBackdrop} = useContext(EventContext)

    const [led1, setled1] = useState(deviceList[props.index].state?.reported?.['led1'])
    const [led2, setled2] = useState(deviceList[props.index].state?.reported?.['led2'])
    const [led3, setled3] = useState(deviceList[props.index].state?.reported?.['led3'])

    const [change, setchange] = useState(false)

    useEffect(() => {
        setchange(led1 !== deviceList[props.index].state?.reported?.['led1'] || led2 !== deviceList[props.index].state?.reported?.['led2'] || led3 !== deviceList[props.index].state?.reported?.['led3'])
        if(!change) {
            resetBackdrop(false)
        }
    }, [led1, led2, led3, change])

    useEffect(() => {
        setled1(deviceList[props.index].state?.reported?.['led1'])
        setled2(deviceList[props.index].state?.reported?.['led2'])
        setled3(deviceList[props.index].state?.reported?.['led3'])
    }, [deviceList])

    const handleChange = (onChange, value) => {
        console.log(value);
        if(value == 1){
            onChange('on')
        } else {
            onChange('off')
        }
      };

    const handleClic = (event)=>{
        event.preventDefault()
        const func = async() => {
            setBackdrop(5000, 'Timeout error updating state')
            const desired = {}
            desired['led1'] = led1
            desired['led2'] = led2
            desired['led3'] = led3
            const msg = {desired}
            await PubSub.publish(`$aws/things/${deviceList[props.index].name}/shadow/name/${deviceList[props.index].deviceType.shadownName}/update`, {state:{...msg}});
        }
        func()
    }

    const LedValue = (label, state, onChange) => {

        return(
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl} size="small">
                        <InputLabel htmlFor="age-native-helper">{label}</InputLabel>
                        <Select
                            native
                            value={state === 'on' ? 1 : 0 }
                            label={label}
                            onChange={((event) => {handleChange(onChange, event.target.value )})}
                        >
                        <option value={0}>Off</option>
                        <option value={1}>On</option>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }

    return (
        <DeviceCardBase index={props.index}>
            <Grid container direction={'column'} spacing={3}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid container alignItems="center" direction={'column'}>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    Temeperature
                                </Grid>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    {deviceList[props.index].telemetry ? `${deviceList[props.index].telemetry?.temperature} ºC` : `-- ºC`}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="center" direction={'column'}>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    Humidity
                                </Grid>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    {deviceList[props.index].telemetry ? `${deviceList[props.index].telemetry?.humidity} %` : `-- %`}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} > 
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={4} md={4}>
                                    {LedValue('led1', led1, setled1 )}
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    {LedValue('led2', led2, setled2 )}
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    {LedValue('led3', led3, setled3 )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleClic} 
                                disabled = {!change}
                            >Set</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DeviceCardBase>
        
    )
}

export default DeviceCardThreeLedTest
