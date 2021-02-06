import React, {useState, useEffect} from 'react'

const ApiResponseMessage = ({code, message, hideAfter, timeout}) => {

    const [Message, setMessage] = useState('')
    const [state, setstate] = useState(false)                          
    const [ClassName, setClassName] = useState('')

   useEffect(() => {
       console.log('New code: ', code)
       var timer
       if (code >= 100) {
            if (code >= 100 && code < 200) {
                setClassName('alert alert-primary')
            }else if (code >= 200 && code < 300) {
                setClassName('alert alert-success')
            }else if (code >= 300 && code < 400) {
                setClassName('alert alert-warning')
            }else if (code >= 400 && code < 500) {
                setClassName('alert alert-danger')
            }else if (code >= 500 && code < 600) {
                setClassName('alert alert-danger')
            }
            setMessage(message)   
            setstate(true)
            if (hideAfter) {
                timer = setTimeout(() => {
                    setMessage('')
                    setstate(false)
                    setClassName('alert alert-light')
                    timeout()
                }, 1000*hideAfter)
            }
       }else{
            setMessage('')
            setstate(false)
            setClassName('alert alert-light')
       }
       return () => clearTimeout(timer);
   }, [code])

    return (
            state ? ( 
                <div className={`${ClassName} d-block mt-2`} role="alert">
                    {Message}
                </div>
            ): null
    )
}

export default ApiResponseMessage