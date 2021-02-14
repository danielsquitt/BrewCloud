
// Libraries
import React, {useState, useEffect, useContext} from 'react'
import Credentials from './login/Credentials'
import NewPassword from "./login/NewPassword";
import {AuthContext} from "./../context/AuthProvider";
import Amplify, { API, Storage } from 'aws-amplify';
import awsmobile from './../aws-exports';
import * as queries_user from './../graphql/queries_user';
import * as queries from './../graphql/queries';
import { Container, Card, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from "react-router-dom";
import initImg from "./../img/DefaultImg.png";
import { EventContext } from "../context/EventProvider";



const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '30%', 
      },
    card: {
        marginTop: theme.spacing(5),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
}))

const Login = (props) => {

    let { id } = useParams();

    Amplify.configure(awsmobile);

    const classes = useStyles();

    const {state, login, logout, updateUserPassword } = useContext(AuthContext)
    const {newError} = useContext(EventContext)

    const [imgUrl, setimgUrl] = useState(null)

    useEffect(() => {
        logout()
       //credentialsOnSubmmit('Admin', 'Admin1234')
    }, [])

    useEffect(() => {
        const getImg = async() => {
            if (id) {
                try {
                    const result = await API.graphql({ 
                        query: queries_user.companyByName, 
                        variables: { name: id },
                        authMode: 'AWS_IAM' 
                    })
                    const data = result.data.companyByName.items[0]
                    console.log(data)
                    // Change Init imagen
                    const initImgURL = await Storage.get(data.initImg.key,  {
                            download: false,
                        }) 
                    setimgUrl(initImgURL)
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
                setimgUrl(initImg)
            }
            
        }
        getImg()
    }, [id])

    const newPasswordOnSubmmit = (Password, NewPassword, attributes)=>{
        const func = async()=>{
            updateUserPassword(Password, NewPassword, attributes)
            .catch((error) => {
                newError(error.message)
                console.log('error', error)
            })
        }
        func()
    }

    const credentialsOnSubmmit = (Username, Password)=>{
        const func = async()=>{
            login(Username, Password)
            .catch((error) => {
                newError(error)
                console.log('error', error)
            })
        }
        func()
    }

    useEffect(() => {
        if(state.logged){
            props.history.push('/')
        } 

    }, [state.logged])

    return(
        <Container maxWidth="xs">
            <Card className={classes.card}>
                <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    title="Company Image"
                    src={imgUrl}
                />
                {state.newPasswordRequired ? (
                    <NewPassword 
                        onSubmit={newPasswordOnSubmmit}
                        classes={classes}
                    />
                ) : (
                    <Credentials 
                        onSubmit={credentialsOnSubmmit} 
                        classes={classes}
                    />
                )}
            </Card>
        </Container>
    )
}

export default Login
