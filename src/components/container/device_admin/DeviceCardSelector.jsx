import React, {useContext} from 'react'

import DeviceCardThreeLedTest from './cards/DeviceCardThreeLedTest';
import DeviceCardTempControl from './cards/DeviceCardTempControl';
import DeviceCardTempPressureControl from './cards/DeviceCardTempPressureControl';

import {DeviceContext} from './../../../context/DeviceProvider'

const DeviceCardSelector = (props) => {

    const {deviceList} = useContext(DeviceContext)

        switch (deviceList?.[props.index]?.deviceType?.shadownName) {
            case '3led':
                return <DeviceCardThreeLedTest index = {props.index} />
            case 'TempControl':
                return <DeviceCardTempControl index = {props.index} />
            case 'TePreControl':
                return <DeviceCardTempPressureControl index = {props.index} />
            default:
                return null

          }
}

export default DeviceCardSelector
