import React, {useState, useEffect} from 'react'
import {Grid, Divider, Typography, IconButton} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { red, green, blue } from '@material-ui/core/colors';
import WidgetBase from './WidgetBase'

import { PubSub } from './../../../../Amplify';



const ThreeLedTest = (props) => {

    const [shadow, setShadow] = useState({reported:{led1: 'off', led2: 'off',led3: 'off'}})
    useEffect(() => {
        //console.log('asdasd', props.data.state)
        if (props.data.state) setShadow(props.data.state)
    }, [props.data.state])
 
    const button = (state, name, _color)=>{
        const intensity = state ? 500 : 900
        return(
            <Grid 
                item 
                align={'center'} 
                style={{ color: _color[intensity] }} 
                xs={4}
            >
                <FiberManualRecordIcon fontSize="large" />
            </Grid>
        )
    }

    return (
        <WidgetBase data={props.data} idx={props.idx}>
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
                        {button(shadow.reported.led1 === 'on', 'led1', red)}
                        {button(shadow.reported.led2 === 'on', 'led2', green)}
                        {button(shadow.reported.led3 === 'on', 'led3', blue)}
                    </Grid>
                </Grid>
            </Grid>
        </WidgetBase>
    )
}

export default ThreeLedTest
