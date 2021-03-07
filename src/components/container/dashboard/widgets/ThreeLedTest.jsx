import React from 'react'
import {makeStyles, Grid, Card, CardHeader, CardContent, Divider, Typography, Collapse, Avatar, IconButton } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { red, green, blue } from '@material-ui/core/colors';
import WidgetBase from './WidgetBase'



const ThreeLedTest = () => {

    const button = (state, _color)=>{

        const intensity = state ? 500 : 900

        return(
            <Grid item component={FiberManualRecordIcon} align={'center'} style={{ color: _color[intensity] }} xs={4}>
            </Grid>
        )
    }

    return (
        <WidgetBase>
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
                    <Grid container> 
                        {button(false, red)}
                        {button(false, green)}
                        {button(false, blue)}
                    </Grid>
                </Grid>
            </Grid>
        </WidgetBase>
    )
}

export default ThreeLedTest
