import React, {useContext, useState, useEffect, Fragment} from 'react'
import DeviceCardBase from './DeviceCardBase'
import {makeStyles, Grid, Divider, ButtonGroup, Typography, Button, FormControl, Card, TextField, InputAdornment, CardHeader, CardContent } from '@material-ui/core';

import {DeviceContext} from '../../../../context/DeviceProvider'
import {EventContext} from '../../../../context/EventProvider'
import {AuthContext} from '../../../../context/AuthProvider'

import { PubSub } from '../../../../Amplify';

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

const DeviceCardTempControl = (props) => {

    const classes = useStyles()

    const {deviceList} = useContext(DeviceContext)
    const {setBackdrop, resetBackdrop} = useContext(EventContext)
    const {permissions} = useContext(AuthContext)

    const [setPoint, setSetPoint] = useState(parseFloat(deviceList[props.index].state?.reported?.temp?.['sp']))
    const [ctrlState, setCtrlState] = useState(parseFloat(deviceList[props.index].state?.reported?.temp?.['state']))
    
    const [enableSet, setEnableSet] = useState(false)
    const [enableStart, setEnableStart] = useState(false)
    const [enableStop, setEnableStop] = useState(false)
    const [enableCold, setEnableCold] = useState(false)
    const [error, setError] = useState([false])

    useEffect(() => {
        setEnableSet(setPoint !== parseFloat(deviceList[props.index].state?.desired?.temp?.['sp']))
        let reported = deviceList[props.index].state?.reported?.temp?.['sp']
        let desired = deviceList[props.index].state?.desired?.temp?.['sp']
        if (reported !== undefined && desired !== undefined) {
            if (parseFloat(reported) == parseFloat(desired)) {
                setError([false])
            } else {
                setError([true])
            }
        } else {
            setError([false])
        }
    }, [setPoint, deviceList, props]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setEnableStart(deviceList[props.index].state?.reported?.temp?.['state'] !== "1")
        setEnableStop(deviceList[props.index].state?.reported?.temp?.['state'] !== "0")
        setEnableCold(deviceList[props.index].state?.reported?.temp?.['state'] !== "-1")
    }, [deviceList])


    useEffect(() => {
        if(!enableSet) {
            resetBackdrop(false)
        }
    }, [enableSet]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setSetPoint((parseFloat(deviceList[props.index].state?.desired?.temp?.['sp'])))
        setCtrlState((parseFloat(deviceList[props.index].state?.desired?.temp?.['state'])))
    }, [deviceList, props])

    const handleClic = (event)=>{
        event.preventDefault()
        const func = async() => {
            setBackdrop(5000, 'Timeout error updating state')
            const temp = {}
            temp['sp'] = setPoint.toFixed(2)



            const msg = {desired : {temp},}
            console.log({state:{...msg}});
            await PubSub.publish(`$aws/things/${deviceList[props.index].name}/shadow/name/${deviceList[props.index].deviceType.shadownName}/update`, {state:{...msg}});
        }
        func()
    }

    const handleCtrlClic = (event, type) =>{
        event.preventDefault()
        const func = async() => {
            //setBackdrop(5000, 'Timeout error updating state')
            const temp = {}
            if(type === 'START')
            {
                temp['state'] = "1"
            } else if(type === 'STOP')
            {
                temp['state'] = "0"
            } else if(type === 'COLD')
            {
                temp['state'] = "-1"
            }
            const msg = {desired : {temp},}
            console.log({state:{...msg}});
            await PubSub.publish(`$aws/things/${deviceList[props.index].name}/shadow/name/${deviceList[props.index].deviceType.shadownName}/update`, {state:{...msg}});
        }
        func()
    }

    const ControlState = () => {
        let bg_color
        let txt
        switch (parseInt(deviceList[props.index].state?.reported?.temp?.['state'])) {
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
        switch (parseInt(deviceList[props.index].telemetry?.temp?.['valve'])) {
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

    const Temperature = () =>{
        return(
            <Grid container justify="center" spacing={1}>
                <Grid item component={Typography} align={'center'}  xs={12}>
                    Temperature:
                </Grid>
                <Grid item component={Card} elevation={0} style={{width: '100%'}}>
                    <Grid container alignItems="flex-end">
                        <Grid item component={Typography} variant='h5' align={'center'}  xs={6}>
                            {(deviceList[props.index].telemetry?.temp && deviceList[props.index].state?.reported?.temp?.['state'] !== "0")  ? `${getValue(deviceList[props.index].telemetry?.temp?.value)} ºC` : `-- ºC`}
                        </Grid>
                        <Grid item component={Typography} variant='h5' align={'center'}  xs={1}>
                            {`/`}
                        </Grid>
                        <Grid item component={Typography}  variant='caption' align={'center'}  xs={5}>
                            {`${getValue(deviceList[props.index].state?.reported?.temp?.['sp'])} ºC`}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    const SetPoint = () => {
        return(
            <Grid item component={Card} variant='outlined'>
                <CardHeader title="Setpoint"/>
                <Divider/>
                <CardContent>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={8}>
                            <FormControl variant="outlined" className={classes.formControl} >
                                <TextField
                                    error={error[0]}
                                    variant='outlined'
                                    label="Temperature"
                                    type="number"
                                    value={setPoint}
                                    inputProps={{ step: 0.5 }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">ºC</InputAdornment>,
                                    }}
                                    size='small'
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={(event)=>{
                                        console.log(event);
                                        setSetPoint(parseFloat(event.target.value))
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button 
                                className={classes.formControl}
                                variant="contained" 
                                size="small"
                                color="primary" 
                                onClick={(event)=>{handleClic(event)}} 
                                disabled = {!enableSet}
                            >Set</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Grid>
        )
    }

    const ControlButtons = () => {
        return(
            <Grid item component={Card} variant='outlined'>
                <CardHeader title="Control"/>
                <Divider/>
                <CardContent>
                    <Grid container justify="center" spacing={1} >
                            <Grid item component={ButtonGroup} xs={12} sm={8} md={6} variant="outlined" aria-label="outlined primary button group" orientation="vertical">
                                <Button
                                    style={{
                                        backgroundColor: "#4CAF50",
                                        borderColor: "#4CAF50",
                                        textColor: "#4CAF50",
                                        margin: "1px",
                                    }}
                                    onClick={(event)=>{handleCtrlClic(event, 'START')}} 
                                    disabled = {!enableStart}
                                >Start</Button>
                                <Button
                                    style={{
                                    backgroundColor: "#3F51B5",
                                    borderColor: "#3F51B5",
                                    margin: "1px",
                                    }}
                                    onClick={(event)=>{handleCtrlClic(event,'COLD')}} 
                                    disabled = {!enableCold}
                                >COLD CRASH</Button>
                                <Button
                                    style={{
                                        backgroundColor: "#818181",
                                        borderColor: "#818181",
                                        textColor: "#EAA61F",
                                        margin: "1px",
                                    }}
                                    onClick={(event)=>{handleCtrlClic(event, 'STOP')}} 
                                    disabled = {!enableStop}
                                >STOP</Button>
                        </Grid>
                    </Grid>
                </CardContent>
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

    return (
        <DeviceCardBase index={props.index}>
            <Grid container direction={'column'} spacing={3}>
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
                    <Grid container spacing={2} > 
                        { 
                            permissions.editThingShadow && (
                                <Fragment>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid container spacing={2} justify="center" alignItems="stretch">
                                                <Grid item xs={6}>
                                                    {SetPoint()}
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {ControlButtons()}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Fragment>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
        </DeviceCardBase>
        
    )
}

export default DeviceCardTempControl
