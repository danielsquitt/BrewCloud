import React, {useEffect, useState} from 'react'

const ListNavButtons = ({pages, current, reqPage}) => {

    const [buttons, setbuttons] = useState([])

    useEffect(() => {
        let i = 1
        let button = []
        for(i; i <= pages; i++ ){
            let index = i
            let active = i===current ? "font-weight-bold" : ""
            button.push(<button key={index} type="button" className={"btn btn-default btn-sm " + active} onClick={() => {handleCLick(index)}}>{index}</button>)
        }
        setbuttons(button)

        return () => {
            setbuttons([])
        }
    }, [current, pages])

    const handleCLick = (req) => {
        if (req >= 1 && req <= pages) {
            reqPage(req)
        }
    }


    return ( pages>1 ? (
                <div className="card-tools">
                    <div className="btn-group">
                        <button type="button" className="btn btn-default btn-sm" onClick={() => {handleCLick(current-1)}}  >«</button>
                        {buttons}
                        <button type="button" className="btn btn-default btn-sm" onClick={() => {handleCLick(current+1)}}  >»</button>
                    </div>
                </div> 
                ) : null
    )
}

export default ListNavButtons
