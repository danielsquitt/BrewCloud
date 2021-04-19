import React, { useState, useRef, useEffect } from 'react'

import Alert from '@material-ui/lab/Alert'
import {makeStyles, Snackbar, Backdrop, CircularProgress } from '@material-ui/core';

export const EventContext = React.createContext()

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
  }));

const EventProvider = (props) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false)
    const timeout = useRef(0)
    const errormsg = useRef('')
    const [alertArray, setalertArray] = useState([])

    const newAlert = (severity, message) => {
        //console.log('severity', severity)
        setalertArray(alertArray.concat([
            genAlert(severity, message)
    ]))
    }

    const genAlert = (severity, message)=>{
        
        //console.log('severity', severity)
        return(
            <Snackbar 
                key={alertArray.length}
                open={true} 
                autoHideDuration={10000} 
                onClose={()=>{deleteAlert(alertArray.length)}} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            >
                <Alert 
                    onClose={()=>{deleteAlert(alertArray.length)}} 
                    severity={severity}
                >
                    {message}
                </Alert>
            </Snackbar>
        )
    }

    const newError = (message)=>{
        newAlert("error", message)
    }
    const newWarning = (message)=>{
        newAlert("warning", message)
    }
    const newInfo = (message)=>{
        newAlert("info", message)
    }
    const newSuccess = (message)=>{
        newAlert("success", message)
    }

    const deleteAlert = (key)=> {
        //console.log('Delete', key)
        const array = alertArray
        array.splice(key, 1)
        //console.log('Array', alertArray)
        setalertArray(array)
    }

    const setBackdrop = (_timeout, _timeoutMessage) => {
        timeout.current = _timeout
        errormsg.current = _timeoutMessage
        setOpen(true)
    }

    const resetBackdrop = () => {
        setOpen(false)
    }

    useEffect(() => {
        if(open){
            const timer = setTimeout(()=>{
                setOpen((_open) => {
                    if(_open){
                        newError(errormsg.current)
                    }
                    return false
                })
                
               }, timeout.current)
               return () => clearTimeout(timer);
        }
    }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <EventContext.Provider value={{newError, newWarning, newInfo, newSuccess, setBackdrop, resetBackdrop}}>
            {alertArray.length > 0 ? alertArray : null }
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventProvider
