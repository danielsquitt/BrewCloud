import React, {useContext} from 'react'
import DeviceCardBase from './DeviceCardBase'
import {Grid, Divider, Typography, Button, Box } from '@material-ui/core';

import {DeviceContext} from './../../../context/DeviceProvider'

const DeviceCardThreeLedTest = (props) => {

    const {deviceList} = useContext(DeviceContext)


    const LedValue = (label, desired, reported) => {
        return(
            <div>
                {deviceList[props.index].state?.reported[label]}
                {deviceList[props.index].state?.desired[label]}
            </div>
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
                                    {LedValue('led1',)}
                                </Grid>
                                <Grid item xs={4}>
                                    {LedValue('led2',)}
                                </Grid>
                                <Grid item xs={4}>
                                    {LedValue('led3',)}
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
