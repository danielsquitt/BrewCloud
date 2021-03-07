import React, { useState, useRef} from 'react'

import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar';

export const EventContext = React.createContext()

const EventProvider = (props) => {

    

    const [alertArray, setalertArray] = useState([])

    const newAlert = (severity, message) => {
        console.log('severity', severity)
        setalertArray(alertArray.concat([
            genAlert(severity, message)
    ]))
    }

    const genAlert = (severity, message)=>{
        
        console.log('severity', severity)
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
        console.log('Delete', key)
        const array = alertArray
        array.splice(key, 1)
        console.log('Array', alertArray)
        setalertArray(array)
    }

 

    return (
        <EventContext.Provider value={{newError, newWarning, newInfo, newSuccess}}>
            {alertArray.length > 0 ? alertArray : null }
            {props.children}
        </EventContext.Provider>
    )
}

export default EventProvider
