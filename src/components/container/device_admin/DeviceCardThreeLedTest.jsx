import React, {useContext, useState, useEffect} from 'react'
import DeviceCardBase from './DeviceCardBase'
import {makeStyles, Grid, Divider, Typography, Button, FormControl, Select, InputLabel  } from '@material-ui/core';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import {DeviceContext} from './../../../context/DeviceProvider'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const DeviceCardThreeLedTest = (props) => {
    const classes = useStyles();
    const {deviceList} = useContext(DeviceContext)

    const [led1, setled1] = useState(deviceList[props.index].state?.reported['led1'])
    const [led2, setled2] = useState(deviceList[props.index].state?.reported['led2'])
    const [led3, setled3] = useState(deviceList[props.index].state?.reported['led3'])

    useEffect(() => {
        setled1(deviceList[props.index].state?.reported['led1'])
        setled2(deviceList[props.index].state?.reported['led2'])
        setled3(deviceList[props.index].state?.reported['led3'])
    }, [deviceList])

    const handleChange = (onChange, value) => {
        console.log(value);
        if(value == 1){
            onChange('on')
        } else {
            onChange('off')
        }
      };

    const LedValue = (label, state, onChange) => {

        return(
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
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
                                    26º
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="center" direction={'column'}>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    Humidity
                                </Grid>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    73%
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3} > 
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    {LedValue('led1', led1, setled1 )}
                                </Grid>
                                <Grid item xs={4}>
                                    {LedValue('led2', led2, setled2 )}
                                </Grid>
                                <Grid item xs={4}>
                                    {LedValue('led3', led3, setled3 )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <Button variant="contained" color="primary" >Set</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DeviceCardBase>
    )
}

export default DeviceCardThreeLedTest
