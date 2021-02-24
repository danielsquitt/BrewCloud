
// LIBRARIS
import React, {useState, useEffect, useContext, useRef} from 'react'

import { API, Storage } from 'aws-amplify'
import { companyByName, listCompanys } from './../graphql/queries_user'
import { EventContext } from "../context/EventProvider"
import { AuthContext } from "../context/AuthProvider";



export const CompanyContext = React.createContext()

const CompanyProvider = (props) => {

    const {newError} = useContext(EventContext)
    const {state} = useContext(AuthContext)

    const [info, setInfo] = useState(false)

    //const [companyList, setcompanyList] = useState([{}])
    const [ActualCompany, setActualCompany] = useState(false)
    const companyList = useRef(false)

    useEffect(() => {
        const func = async()=>{
            if (state.logged){
                try {
                    const list = await getCompanyList()
                    companyList.current = list
                    setActualCompany(0)
                } catch (error) {
                    console.log(error);
                }
                
            }
        }
        func()
    }, [state.logged])

    useEffect(() => {
        if(ActualCompany !== false) {
            console.log(companyList.current[ActualCompany]);
            setInfo(companyList.current[ActualCompany])
        }
    }, [ActualCompany])

    useEffect(() => {
        console.log('info', info);
        setDocumentInfo(info)
    }, [info.name, info.faviIconUrl])

    const setCompanyName = (name)=>{
        //loadPublicInfo(name)
    }

    const getS3Url = async(key)=>{
        try {
            const url = await Storage.get(key,  {
                download: false,
            })
            console.log('url',url)
            return url
        } catch (error) {
            console.log(error)
            newError(error.message)
            return ''
        }
    }

    const loadPublicInfo = async(name)=>{
        try {
            // Get public info
            const result = await API.graphql({ 
                query: companyByName, 
                variables: { name },
                authMode: 'AWS_IAM' 
            })
            const data = result.data.companyByName.items[0]
            console.log(data)

            // Change Init imagen
            const initImgURL = await getS3Url(data.initImg.key) 
            const faviIconUrl = await getS3Url(data.faviIcon.key)
            setInfo({
                id: '',
                name: data.name,
                initImgURL,
                faviIconUrl
            })

        } catch (error) {
            newError(error.message)
            console.log(error)
        }
    }

    const setDocumentInfo = (data) => {
        console.log('Set documment', data);
        // Change documment title
        document.title= data.name

        // Change favicon
        const favicon= document.getElementById("favicon")
        favicon.href = data.faviIconUrl
    }
    
    const getCompanyList = async()=>{
        return await new Promise((resolve, reject) => {
            API.graphql({ 
                query: listCompanys, 
            })
            .then(async(result)=>{

                var arr =result.data.listCompanys.items
                var results = await Promise.all(arr.map(async (item) => {
                    item['faviIconUrl'] = await getS3Url(item.faviIcon.key)
                        delete item['faviIcon']
                        item['initImgUrl'] = await getS3Url(item.initImg.key)
                        delete item['initImg']
                        console.log('get company list', item)
                    return item;
                }));
                resolve(results)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }


    return (
        <CompanyContext.Provider value={{info, setCompanyName}}>
            {props.children}
        </CompanyContext.Provider>
    )
}

export default CompanyProvider
