import React, {useState, useEffect} from 'react'
import {Grid, Divider, Typography, TextField, Button } from '@material-ui/core';

import WidgetBase from './WidgetBase'

const TempControl = (props) => {
    return (
        <WidgetBase data={props.data} idx={props.idx}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={6}>
                            <Grid container direction={'column'}>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    Temperature
                                </Grid>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    {props.data.telemetry ? `${props.data.telemetry?.temperature} ºC` : `-- ºC` +  ' / ' + `${props.data.state?.reported['sp temperature']} ºC`}
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container  spacing={3} alignItems="center">
                        
                    </Grid>
                </Grid>
            </Grid>
        </WidgetBase>
    )
}

export default TempControl
