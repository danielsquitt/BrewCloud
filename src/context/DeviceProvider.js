import React,  {useContext, useEffect, useState} from 'react'

import { CompanyContext } from './../context/CompanyProvider'

import {listDevices} from './../graphql/queries_user'
import {updateDevice} from './../graphql/mutations_user'

import {API, PubSub} from '../Amplify'

export const DeviceContext = React.createContext()

const DeviceProvider = (props) => {

    const {info} = useContext(CompanyContext)
    const [deviceList, setDeviceList] = useState([])
    const [deviceByType, setdeviceByType] = useState([])
    const [id, setId] = useState(info.id)

    useEffect(() => {
        var pub
        var timer = []
        const fuc = async() => {
            if(info.id !== '' && info.id !== id){
                setId(info.id)
                await getDeviceList()
                .then((result) => {
                    // Save device list
                    setDeviceList(result.map((item) => {
                        return({
                            ...item, 
                            connected: {
                                version: 0, 
                                state: false
                            }, 
                            state:{
                                desired:{}, 
                                reported:{}
                            }
                        })
                    }))

                    // Save device topi subscriptions
                    const topics = []
                    result.forEach((element) => {
                        topics.push(`$aws/things/${element.name}/shadow/name/std/get/accepted`)
                        topics.push(`$aws/things/${element.name}/shadow/name/std/update/accepted`)
                        topics.push(`$aws/things/${element.name}/shadow/name/${element.deviceType.shadownName}/get/accepted`)
                        topics.push(`$aws/things/${element.name}/shadow/name/${element.deviceType.shadownName}/update/accepted`)
                        topics.push(`telemetry/things/${element.name}/telemetry/name/${element.deviceType.telemetryName}`)
                    })
                    // Subscribe topics
                    pub = PubSub.subscribe(topics).subscribe({
                        next: data => messageDispatcher(data.value),
                        error: error => console.error('Error:',error),
                        close: () => console.log('Done'),
                    });

                    // Device by Device type
                    const _devicesByType = []
                    result.forEach((device, index) => {
                        const _existis = _devicesByType.findIndex((element) => {
                            return(device.deviceType?.id === element.id)
                        })
                        if (_existis === -1) {
                            _devicesByType.push({
                                ...device.deviceType,
                                elements: [index]
                            })
                        }else{
                            _devicesByType[_existis].elements.push(index)
                        }
                    })
                    setdeviceByType(_devicesByType)

                    // Publish initial messages
                    result.forEach((item, index) => {
                        timer.push(
                            setTimeout(async()=>{
                                await PubSub.publish(`$aws/things/${item.name}/shadow/name/${item.deviceType.shadownName}/get`, { msg: '' });
                                await PubSub.publish(`$aws/things/${item.name}/shadow/name/std/get`, { msg: '' });
                                await PubSub.publish(`telemetry/things/${item.name}/telemetry/name/${item.deviceType.telemetryName}/get`, { msg: '' });
                            }, 1000 + 100*index)
                        ) 
                    })

                })
                .catch((err) => {
                    console.error(err);
                })
            }else{
                return
            }
        }
        fuc()
        return(()=>{ 
            timer.forEach((item) => {
                clearTimeout(item)
            })
            if(pub){
                pub.unsubscribe()
            }
        })
    }, [info.id]) // eslint-disable-line react-hooks/exhaustive-deps

    const messageDispatcher = (data) =>{
        console.log('Message received', data)
        const topic=data[Object.getOwnPropertySymbols(data)[0]].split('/')

        switch (topic[0]) {
            case '$aws':
                switch (topic[1]) {
                    case 'things':
                            const thingName = topic[2]
                            const shadowName = topic[5]
                            const result = topic[7] ? topic[7] : false
                            if (result === 'accepted') {
                                switch (shadowName) {
                                    case 'std':
                                        stdShadowHandler(thingName, data.state, data.version, topic[6])
                                        break;
                                    default:
                                        devicehadowHandler(thingName, data.state, data.version, topic[6])
                                        break;
                                }
                            }
                        break
                    default:
                        break
                }
                break
            case 'telemetry':
                switch (topic[1]) {
                    case 'things':
                        const thingName = topic[2]
                        const type = topic[5]
                        telemetryHandler(thingName, data, type)
                        break;
                    default:
                        break;
                }
                break

            default:
                break
        }
    }

    const stdShadowHandler = (thingName, payload, version) => {
        setDeviceList((list) => {
            //console.log(list, thingName, payload);
            return (list.map((element) => {
                //console.log(payload, payload.reported.connected);
                if (element.name === thingName && version > element.connected.version) return ({...element, connected: {state: payload.reported?.connected, version}})
                return element
            }))
        })
    }

    const devicehadowHandler = (thingName, payload, version, type) => {
        //console.log(thingName, payload, type);

        switch (type) {
            case 'get':
                setDeviceList((list) => {
                    return (list.map((element) => {
                        if (element.name === thingName) return ({...element, state: {...element.state, ...payload}})
                        return element
                    }))
                })
                break;
            case 'update':
                setDeviceList((list) => {
                    return(list.map((device) => {        
                        if (device.name === thingName){
                            Object.entries(payload).forEach((_subNewState)=>{
                                if(device.state[_subNewState[0]]){
                                    Object.entries(_subNewState[1]).forEach((item) => {
                                        if(device.state[_subNewState[0]][item[0]])
                                            device.state[_subNewState[0]][item[0]] = item[1]
                                    })
                                }
                            })
                        }
                        return device
                    }))
                })
                break;
            default:
                break
        }
        
    }

    const telemetryHandler = (thingName, payload) => {
        const data = JSON.parse(JSON.stringify(payload))
        //console.log(thingName, data);
        setDeviceList((list) => {
            //console.log(list, thingName, payload);
            return (list.map((element) => {
                //console.log(payload, payload.reported.connected);
                if (element.name === thingName) return ({...element, telemetry: {...data}})
                return element
            }))
        })
    }

    const getDeviceList = async()=>{
        return await new Promise((resolve, reject) => {
            const filter = {
                companyId: {
                    eq: info.id
                }
            }

            API.graphql({ 
                query: listDevices, 
                variables: {filter}
            })
            .then((result)=>{
                var arr =result.data.listDevices.items
                resolve(arr)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    const updateDeviceName = async(idx, alias) => {
        console.log('Update device name:', idx, alias);
        return await new Promise((resolve, reject) => {
            const input = {
                id: deviceList[idx].id,
                alias
            }
            API.graphql({ 
                query: updateDevice, 
                variables: {input}
            })
            .then((result)=>{
                setDeviceList(list =>{ return list.map((element, index) => {
                    if (index === parseInt(idx)) {return({...element, alias: result.data.updateDevice.alias})}
                    return element
                })})
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    return (
        <DeviceContext.Provider value={{deviceList, deviceByType, updateDeviceName}}>
            {props.children}
        </DeviceContext.Provider>
    )
}

export default DeviceProvider
