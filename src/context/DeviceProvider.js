import React,  {useContext, useEffect, useState, useRef} from 'react'

import { CompanyContext } from './../context/CompanyProvider';

import {listDevices} from './../graphql/queries_user'

import {API, PubSub} from '../Amplify';
import { Switch } from 'react-router';

export const DeviceContext = React.createContext()

const DeviceProvider = (props) => {

    const {info} = useContext(CompanyContext)
    const [deviceList, setDeviceList] = useState([])
    const [deviceByType, setdeviceByType] = useState({})
    const [PUB, setPUB] = useState(null)

    useEffect(() => {
        var pub
        const fuc = async() => {
            if(info.id !== ''){
                await getDeviceList()
                .then((result) => {
                    // Save device list
                    setDeviceList(result.map((item) => {
                        return({...item, connected: {version: 0, state: false}})
                    }))
                    // Save device topi subscriptions
                    const topics = []
                    result.forEach((element) => {
                        topics.push(`$aws/things/${element.name}/shadow/name/std/get/accepted`)
                        topics.push(`$aws/things/${element.name}/shadow/name/std/update/accepted`)
                        topics.push(`$aws/things/${element.name}/shadow/name/${element.deviceType.shadownName}/get/accepted`)
                        topics.push(`$aws/things/${element.name}/shadow/name/${element.deviceType.shadownName}/update/accepted`)
                    })
                    pub = PubSub.subscribe(topics).subscribe({
                        next: data => messageDispatcher(data.value),
                        error: error => console.error('Error:',error),
                        close: () => console.log('Done'),
                    });
                    setPUB(pub)
                    
                    const _devicesByType = {}  
                    result.forEach((element, index) => {
                        if(_devicesByType[element.deviceType.name]){
                            _devicesByType[element.deviceType.name].push(index)
                        }else{
                            _devicesByType[element.deviceType.name] = [index]
                        }
                    })
                    setdeviceByType(_devicesByType)
                })
                .catch((err) => {
                    console.error(err);
                })
            }
        }
        fuc()
        return(()=>{ 
            if(PUB){
                PUB.unsubscribe()
                setPUB(null)
            }
        })
    }, [info.id])

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
                                    case '3led':
                                        devicehadowHandler(thingName, data.state, data.version, topic[6])
                                        break;
                                
                                    default:
                                        break;
                                }
                            }
                        break
                    default:
                        break
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
                if (element.name === thingName && version > element.connected.version) return ({...element, connected: {state: payload.reported.connected, version}})
                return element
            }))
        })
    }

    const devicehadowHandler = (thingName, payload, version, type) => {
        //console.log(thingName, payload, version);

        switch (type) {
            case 'get':
                setDeviceList((list) => {
                    console.log('Por aqui no');
                    return (list.map((element) => {
                        if (element.name === thingName) return ({...element, state: {...element.state, ...payload}})
                        return element
                    }))
                })
                break;
            case 'update':
                setDeviceList((list) => {
                    list = list.map((device) => {        
                        if (device.name === thingName){     // El elemento que queremos cambiar
                            const _actualState = device.state
                            const _newState = Object.entries(payload)
                            console.log('Actual state', _actualState)
                            console.log('New state', _newState);
                            _newState.forEach((_subNewState)=>{
                                if(_actualState[_subNewState[0]]){
                                    const _state = Object.entries(_subNewState[1])
                                    console.log('State to update', _state);
                                    _state.forEach((item) => {
                                        if(_actualState[_subNewState[0]][item[0]]){
                                            device.state[_subNewState[0]][item[0]] = item[1]
                                        }
                                    })
                                }
                            })
                            console.log('Device', device);
                        }
                        return device
                    })
                    console.log('List', list);
                    return list
                })
                break;
        }
        
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
            .then(async(result)=>{
                var arr =result.data.listDevices.items
                resolve(arr)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    return (
        <DeviceContext.Provider value={{deviceList, deviceByType}}>
            {props.children}
        </DeviceContext.Provider>
    )
}

export default DeviceProvider
