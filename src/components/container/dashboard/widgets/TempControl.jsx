import React from 'react'
import { Grid, Divider, Typography, TextField, Card } from '@material-ui/core';

import WidgetBase from './WidgetBase'



const TempControl = (props) => {

    const ControlState = () => {
        let bg_color
        let txt
        switch (parseInt(props.data.state?.reported?.temp?.['state'])) {
            case 1:
                bg_color = "#4CAF50"
                txt = "   RUN   "
                break;
            case -1:
                bg_color = "#3F51B5"
                txt = "COLD CRASH"
                break;
            default:
                bg_color = "#818181"
                txt = "   STOP   "
                break;
        }

        return(
            <Grid container justify="center" spacing={1}>
                <Grid item component={Card} variant = 'outlined' style={{backgroundColor: bg_color, width: '100%'}}>
                    <Grid container spacing={0}>
                        <Grid item component={Typography} align={'center'} xs={12}>
                            {txt}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    const ValveState = () =>{
        let bg_color
        let txt
        switch (parseInt(props.data.telemetry?.temp?.['valve'])) {
            case 1:
                bg_color = "#3F51B5"
                txt = "   OPEN   "
                break;
            default:
                bg_color = "lightgrey"
                txt = "   CLOSE   "
                break;
        }

        return(
            <Grid container justify="center" spacing={1}>
                <Grid item component={Typography} align={'center'}  xs={12}>
                    Valve:
                </Grid>
                <Grid item component={Card} variant = 'outlined' style={{backgroundColor: bg_color, width: '50%'}}>
                    <Grid container spacing={0}>
                        <Grid item component={Typography} variant="body2" align={'center'} xs={12}>
                            {txt}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    const getValue = (value) => {
        if(value)
        {
        let length = value.length
        return value.slice(0, length - 1)
        }
        return ""
    }

    const Temperature = () =>{
        return(
            <Grid container justify="center" spacing={1}>
                <Grid item component={Typography} align={'center'}  xs={12}>
                    Temperature:
                </Grid>
                <Grid item component={Card} elevation={0} style={{width: '100%'}}>
                    <Grid container alignItems="flex-end" justifycontent="center">
                        <Grid item component={Typography} variant='h6' align={'center'}  xs={6}>
                            {(props.data.telemetry?.temp && props.data.state?.reported?.temp?.state !== "0") ? `${getValue(props.data.telemetry?.temp?.value)} ºC` : `-- ºC`}
                        </Grid>
                        <Grid item component={Typography} variant='h6' align={'center'}  xs={1}>
                            {`/`}
                        </Grid>
                        <Grid item component={Typography}  variant='caption' align={'center'}  xs={5}>
                            {`${getValue(props.data.state?.reported?.temp?.['sp'])} ºC`}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }


    return (
        <WidgetBase data={props.data} idx={props.idx}>
            <Grid container spacing={3} style={{paddingLeft:10, paddingRight:10}}>
                <Grid item xs={12}>
                    {ControlState()}
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={1}>
                        <Grid item xs={7} >
                            {Temperature()}
                        </Grid>
                        <Grid item xs={5}>
                            {ValveState()}
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
