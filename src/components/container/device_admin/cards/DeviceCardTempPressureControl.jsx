import React, {useContext, useState, useEffect, Fragment} from 'react'
import DeviceCardBase from './DeviceCardBase'
import {makeStyles, Grid, Divider, Typography, Button, FormControl, TextField } from '@material-ui/core';

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

const DeviceCardTempPressureControl = (props) => {

    const classes = useStyles()

    const {deviceList} = useContext(DeviceContext)
    const {setBackdrop, resetBackdrop} = useContext(EventContext)
    const {permissions} = useContext(AuthContext)

    const [tempSetPoint, setTempSetPoint] = useState(parseFloat(deviceList[props.index].state?.reported?.['sp temperature']))
    const [presSetPoint, setPresSetPoint] = useState(parseFloat(deviceList[props.index].state?.reported?.['sp pressure']))
    const [change, setchange] = useState(false)

    useEffect(() => {
        setchange(tempSetPoint !== deviceList[props.index].state?.reported?.['sp temperature'] || presSetPoint !== deviceList[props.index].state?.reported?.['sp pressure'])
        if(!change) {
            resetBackdrop(false)
        }
    }, [tempSetPoint, presSetPoint, change]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setTempSetPoint((parseFloat(deviceList[props.index].state?.reported?.['sp temperature'])))        
        setPresSetPoint((parseFloat(deviceList[props.index].state?.reported?.['sp pressure'])))
    }, [deviceList, props.index])

    const handleClic = (event)=>{
        event.preventDefault()
        const func = async() => {
            setBackdrop(5000, 'Timeout error updating state')
            const desired = {}
            desired['sp temperature'] = tempSetPoint.toString()
            desired['sp pressure'] = presSetPoint.toString()
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
                        <Grid item xs={6}>
                            <Grid container alignItems="center" direction={'column'}>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    Pressure
                                </Grid>
                                <Grid item component={Typography} align={'center'}  xs={12}>
                                    {deviceList[props.index].telemetry ? `${deviceList[props.index].telemetry?.pressure} bar` : `-- bar`}
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
                                                            variant='outlined'
                                                            label="Temperature setpoint"
                                                            type="number"
                                                            value={tempSetPoint}
                                                            inputProps={{ step: 0.5 }}
                                                            size='small'
                                                            InputLabelProps={{
                                                            shrink: true,
                                                            }}
                                                            onChange={(event)=>{
                                                                console.log(event);
                                                                setTempSetPoint(parseFloat(event.target.value))
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <FormControl variant="outlined" className={classes.formControl} >
                                                        <TextField
                                                            variant='outlined'
                                                            label="Pressure setpoint"
                                                            type="number"
                                                            value={presSetPoint}
                                                            inputProps={{ step: 0.1 }}
                                                            size='small'
                                                            InputLabelProps={{
                                                            shrink: true,
                                                            }}
                                                            onChange={(event)=>{
                                                                console.log(event);
                                                                setPresSetPoint(parseFloat(event.target.value))
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
                                            disabled = {!change}
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

export default DeviceCardTempPressureControl
