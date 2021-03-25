import React, {useContext} from 'react'

import DeviceCardThreeLedTest from './DeviceCardThreeLedTest';

import {DeviceContext} from './../../../context/DeviceProvider'

const DeviceCardSelector = (props) => {

    const {deviceList} = useContext(DeviceContext)

        switch (deviceList[props.index].deviceType.name) {
            case '3LedTest':
                return <DeviceCardThreeLedTest edit index={props.index}/>
            case 'TempControl':
                return null
            case 'TePreControl':
                return null
          }
}

export default DeviceCardSelector
