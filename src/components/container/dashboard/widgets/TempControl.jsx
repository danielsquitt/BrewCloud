import React, {useState, useEffect} from 'react'
import {Grid, Divider, Typography, TextField, Button } from '@material-ui/core';

import WidgetBase from './WidgetBase'

const TempControl = (props) => {
    return (
        <WidgetBase data={props.data}>
            <Grid container direction={'column'} spacing={3}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid container alignItems="center" direction={'column'}>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    Temperature
                                </Grid>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    26º
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="center" direction={'column'}>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    Set point
                                </Grid>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    26ºC
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
