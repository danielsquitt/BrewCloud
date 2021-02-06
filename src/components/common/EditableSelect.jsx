import React, {useState, useEffect} from 'react'

const EditableSelect = ({value, TextclassName='', EditclassName='', options, edit, setValue}) => {

    const [val, setval] = useState(value)

    useEffect(() => {
        setValue(val)
    }, [val])

    useEffect(() => {
        setval(value)
    }, [value])
    
    return (
        <div>
            { edit ? (
                <select value={val} className={EditclassName} onChange={ e => setval(e.target.value) }>
                    {options.map((element, index) => {
                        if(index === value) {
                            return (<option key={index} value={element.value} >{element.str}</option>)
                        } else {
                            return (<option key={index} value={element.value} >{element.str}</option>)
                        }
 
                    })}
                </select>
            ) : (
                <div className={TextclassName + 'm-1'}>{options[val]}</div>
            )}
        </div>
    )
}

export default EditableSelect
