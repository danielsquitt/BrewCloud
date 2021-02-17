
// LIBRARIS
import React, {useState, useEffect, useContext} from 'react'

import { API, Storage } from 'aws-amplify'
import * as queries_user from './../graphql/queries_user'
import { EventContext } from "../context/EventProvider"
import initImg from "./../img/DefaultImg.png";



export const CompanyContext = React.createContext()

const CompanyProvider = (props) => {

    const {newError} = useContext(EventContext)

    const [name, setname] = useState('')
    const [info, setInfo] = useState({})

    useEffect(() => {
        const getImg = async() => {
            if (name) {
                try {
                    const result = await API.graphql({ 
                        query: queries_user.companyByName, 
                        variables: { name },
                        authMode: 'AWS_IAM' 
                    })
                    const data = result.data.companyByName.items[0]
                    console.log(data)

                    // Change Init imagen
                    const initImgURL = await Storage.get(data.initImg.key,  {
                        download: false,
                    }) 
                    setInfo({...info, initImg: initImgURL})

                    // Change documment title
                    document.title= data.name
                    // Change favicon
                    const faviconURL = await Storage.get(data.faviIcon.key,  {
                        download: false,
                    }) 
                    const favicon= document.getElementById("favicon")
                    favicon.href = faviconURL
                } catch (error) {
                    newError(error.message)
                    console.log(error)
                }
            }else{
                setInfo({...info, initImg})
            }
            
        }
        getImg()
    }, [name])

    const setCompanyName = (name)=>{
        setname(name)
    }


    return (
        <CompanyContext.Provider value={{info, setCompanyName}}>
            {props.children}
        </CompanyContext.Provider>
    )
}

export default CompanyProvider
