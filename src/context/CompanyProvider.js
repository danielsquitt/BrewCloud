
// LIBRARIS
import React, {useState, useEffect, useContext} from 'react'

import { API, Storage } from 'aws-amplify'
import { companyByName, listCompanys } from './../graphql/queries_user'
import { EventContext } from "../context/EventProvider"
import { AuthContext } from "../context/AuthProvider";
import initImg from "./../img/DefaultImg.png";



export const CompanyContext = React.createContext()

const CompanyProvider = (props) => {

    const {newError} = useContext(EventContext)
    const {state} = useContext(AuthContext)

    const [info, setInfo] = useState({
        initImgURL: '',
        name: ''
        })

    const [companyList, setcompanyList] = useState([{}])
    const [ActualCompany, setActualCompany] = useState(false)

    useEffect(() => {
        if (state.logged){
            getCompanyList()
            setActualCompany(0)
        }
    }, [state.logged])

    useEffect(() => {
        if(ActualCompany !== false) {
            console.log(companyList[ActualCompany]);
            setInfo(companyList[ActualCompany])
        }
    }, [ActualCompany, companyList])

    useEffect(() => {
        setDocumentInfo(info.name, info.faviIconUrl )
    }, [info])

    const setCompanyName = (name)=>{
        loadPublicInfo(name)
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

            //setDocumentInfo(data.name, faviIconUrl)

        } catch (error) {
            newError(error.message)
            console.log(error)
        }
    }

    const setDocumentInfo = (name, faviIconUrl) => {
        // Change documment title
        document.title= name

        // Change favicon
        const favicon= document.getElementById("favicon")
            favicon.href = faviIconUrl
    }
    
    const getCompanyList = async()=>{
        try {
            // company list
            const result = await API.graphql({ 
                query: listCompanys, 
            })

            // Transform urls
            result.data.listCompanys.items.map(async (item) => {
                try {
                    item['faviIconUrl'] = await getS3Url(item.faviIcon.key)
                    delete item['faviIcon']
                    item['initImgUrl'] = await getS3Url(item.initImg.key)
                    delete item['initImg']
                } catch (error) {
                    
                }
            })

            // Save data
            setcompanyList(result.data.listCompanys.items)

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <CompanyContext.Provider value={{info, setCompanyName}}>
            {props.children}
        </CompanyContext.Provider>
    )
}

export default CompanyProvider
