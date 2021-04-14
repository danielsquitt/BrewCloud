import React, {useContext, useState, useEffect, Fragment} from 'react'
import DeviceCardBase from './DeviceCardBase'
import {makeStyles, Grid, Divider, Typography, Button, FormControl, TextField, InputAdornment } from '@material-ui/core';

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

    const [setPoint, setSetPoint] = useState(parseFloat(deviceList[props.index].state?.reported?.['sp temperature']))
    
    const [enableSet, setEnableSet] = useState(false)
    const [error, setError] = useState([false])

    useEffect(() => {
        setEnableSet(setPoint !== parseFloat(deviceList[props.index].state?.desired?.['sp temperature']))
        setError([deviceList[props.index].state.reported['sp temperature'] !== deviceList[props.index].state.desired['sp temperature']])
    }, [setPoint, deviceList, props]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(!enableSet) {
            resetBackdrop(false)
        }
    }, [enableSet]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setSetPoint((parseFloat(deviceList[props.index].state?.desired?.['sp temperature'])))
    }, [deviceList, props])

    const handleClic = (event)=>{
        event.preventDefault()
        const func = async() => {
            setBackdrop(5000, 'Timeout error updating state')
            const desired = {}
            desired['sp temperature'] = setPoint.toString()
            const msg = {desired}
            console.log({state:{...msg}});
            await PubSub.publish(`$aws/things/${deviceList[props.index].name}/shadow/name/${deviceList[props.index].deviceType.shadownName}/update`, {state:{...msg}});
        }
        func()
    }

    return (
        <DeviceCardBase index={props.index}>
            <Grid container direction={'column'} spacing={3}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={6}>
                            <Grid container alignItems="center" direction={'column'}>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    Temperature
                                </Grid>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    {deviceList[props.index].telemetry ? `${deviceList[props.index].telemetry?.temperature} ºC` : `-- ºC`}
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
                        { 
                            permissions.editThingShadow && (
                                <Fragment>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid container spacing={2} justify="center" alignItems="center">
                                                <Grid item xs={12} sm={6}>
                                                    <FormControl variant="outlined" className={classes.formControl} >
                                                        <TextField
                                                            error={error[0]}
                                                            variant='outlined'
                                                            label="Temperature setpoint"
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
                                                            helperText={`Reported: ${deviceList[props.index].state.reported['sp temperature']?.replace('.',',')} ºC`}
                                                            onChange={(event)=>{
                                                                console.log(event);
                                                                setSetPoint(parseFloat(event.target.value))
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={(event)=>{handleClic(event)}} 
                                            disabled = {!enableSet}
                                        >Set</Button>
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
