import React from 'react'

export const DeviceContext = React.createContext()

const DeviceProvider = (props) => {
    return (
        <DeviceContext.Provider>
            {props.children}
        </DeviceContext.Provider>
    )
}

export default DeviceProvider
