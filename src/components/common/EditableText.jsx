import React, {useState, useEffect} from 'react'

const EditableText = ({value, name='', TextclassName='', EditclassName='', placeholder="",  validationRef=null, Password=false, edit=true, setValue}) => {
    
    const [val, setval] = useState(value)

    const [ShowPassword, setShowPassword] = useState(!Password)

    useEffect(() => {
        setValue(val)
    }, [val, setValue])

    useEffect(() => {
        setval(value)
    }, [value])



    return (
        <React.Fragment>
            <div className="input-group m-1">
                { edit ? 
                (
                    <input 
                        name={name}
                        className={EditclassName}
                        type={ ShowPassword ? 'text' : "password"}
                        value = {val} 
                        placeholder={placeholder}
                        onChange={ e => setval(e.target.value) }
                        ref = {validationRef}
                    />
                ) : (
                    <div className={TextclassName + ' m-1'}>{val}</div>
                )
                }{Password ? (
                    <div className="input-group-append">
                        <button type="button" className="input-group-text" onClick={e=> setShowPassword(!ShowPassword)}>
                            <i className={ ShowPassword ? 'fas fa-eye-slash' : "fas fa-eye"}></i>
                        </button>
                    </div>
                ) : (null)
                }
            </div>

        </React.Fragment>
       
    )
}

export default EditableText
