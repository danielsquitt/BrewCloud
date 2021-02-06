import React, {useEffect, useState} from 'react'



const Modal = ({active, titel, text, type, onAcept, onCancel}) => {

    const [color, setcolor] = useState()
    const [icon, seticon] = useState()
    const [state, setstate] = useState(active)

    useEffect(() => {
        switch (type) {
            case 'alert':
                setcolor('red')
                seticon(<i className="fas fa-exclamation-triangle"></i>)
                break;
            case 'warning':
                setcolor('orange')
                seticon(<i className="fas fa-exclamation-circle"></i>)
                break;
            default:
                setcolor('inbluefo')
                seticon(<i className="fas fa-info"></i>)
                break;
        }
    }, [type])

    useEffect(() => {
        setstate(active)
    }, [active])

    return ( state ? (
        <div className="modal fade show" id="modal-default" style={{display: "block", paddingRight: "17px"}} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{titel}</h4>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-3">
                                    <span style={{fontSize: '3em', color: color }}>
                                        {icon}
                                    </span>
                                </div>
                                <div className="col-9 ml-auto">
                                    <p>{text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer justify-content-between">
                        <button type="button" className="btn btn-default" onClick={onCancel}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={onAcept}>Acept</button>
                    </div>
                </div>
            </div>
        </div>
    ) : null
    )
}

export default Modal
