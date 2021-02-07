
// Libraries
import React, {useState, useEffect, useContext} from 'react'
import Credentials from './Login/Credentials'
import NewPassword from "./Login/NewPassword";
import {AuthContext} from "./../context/AuthProvider";
import Amplify, { API, Storage } from 'aws-amplify';
import awsmobile from './../aws-exports';
import * as queries from './../graphql/queries_user';
import { Container, Card, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from "react-router-dom";
import img from "./../img/DefaultImg.png";
import { EventContext } from "../context/EventProvider";

Amplify.configure(awsmobile);

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

    const classes = useStyles();

    const {state, login, updateUserPassword } = useContext(AuthContext)
    const {newError} = useContext(EventContext)

    const [imgUrl, setimgUrl] = useState(null)

    useEffect(() => {
        const getImg = async() => {
            if (id) {
                try {
                    const result = await API.graphql({ query: queries.companyByName , variables: { name: id }})
                    const signedURL = await Storage.get(result.data.companyByName.items[0].InitImg.key,  {
                        download: false,
                    }) 
                    setimgUrl(signedURL)
                } catch (error) {
                    newError(error.message)
                    console.log(error)
                }
            }else{
                setimgUrl(img)
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
