import React,  {useContext, useEffect, useState, useRef} from 'react'

import { CompanyContext } from './../context/CompanyProvider';

import {listDevices} from './../graphql/queries_user'


import {API, PubSub} from '../Amplify';

export const DeviceContext = React.createContext()

const DeviceProvider = (props) => {

    const {info} = useContext(CompanyContext)
    const [deviceList, setDeviceList] = useState([{}])
    const subsTopicList = useRef([])

    useEffect(() => {
        const fuc = async() => {
            if(info.id !== ''){
                await getDeviceList()
                .then((result) => {
                    // Save device list
                    setDeviceList(result)

                    // Save device topi subscriptions
                    result.map((element, index) => {
                        const array = []
                        array.push(`$aws/things/${element.name}/shadow/name/std/get/#`)
                        array.push(`$aws/things/${element.name}/shadow/name/std/update/accepted`)
                        subsTopicList.current = subsTopicList.current.concat(array)
                    })
                })
                .catch((err) => {
                    console.error(err);
                })
                PubSub.subscribe(subsTopicList.current).subscribe({
                    next: data => messageDispatcher(data.value),
                    error: error => console.error('Error:',error),
                    close: () => console.log('Done'),
                });
            }
        }
        fuc()
    }, [info.id])

    const messageDispatcher = (data) =>{
        console.log('Message received', data)
        const topic=data[Object.getOwnPropertySymbols(data)[0]];
        

        console.log(topic);
        

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
        <DeviceContext.Provider value={{deviceList}}>
            {props.children}
        </DeviceContext.Provider>
    )
}

export default DeviceProvider
