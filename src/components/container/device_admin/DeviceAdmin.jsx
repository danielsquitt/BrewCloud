import React, {useEffect} from 'react'

const DeviceAdmin = ({setSelectedIndex}) => {

    useEffect(() => {
        setSelectedIndex(2)
      }, [])

    return (
        <div>
            Device Admin
        </div>
    )
}

export default DeviceAdmin
