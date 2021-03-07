import React,  {useContext, useEffect, useState} from 'react'
import { API } from 'aws-amplify'

import {CompanyContext} from './../context/CompanyProvider';

import {listDevices} from './../graphql/queries_user'
import AWS from './../AWS';

export const DeviceContext = React.createContext()

const DeviceProvider = (props) => {

    const {info} = useContext(CompanyContext)
    const [deviceList, setDeviceList] = useState([{}])

    useEffect(() => {
        if(info.id !== ''){
            getDeviceList()
            .then((result) => {
                setDeviceList(result)
            })
            .catch((err) => {
                console.error(err);
            })
        }
    }, [info.id])

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

    const getShadow = (thingName, shadowName) =>{
        console.log(AWS.config.credentials);
        const IOT_Data = new AWS.IotData({ endpoint: 'ayasauzc2y5wm-ats.iot.eu-west-1.amazonaws.com' });
        const params = {
            thingName,
            shadowName
          }
          IOT_Data.getThingShadow(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
          })
    }

    return (
        <DeviceContext.Provider value={{deviceList, getShadow}}>
            {props.children}
        </DeviceContext.Provider>
    )
}

export default DeviceProvider
