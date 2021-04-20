
// Libraries
import React, {useEffect, useContext, useState} from 'react'
import Credentials from './login/Credentials'
import NewPassword from './login/NewPassword'
import ForgotPassword from './login/ForgotPassword'
import {AuthContext} from "./../context/AuthProvider"
import { Container, Card, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from "react-router-dom"
import { EventContext } from "../context/EventProvider"
import { CompanyContext } from './../context/CompanyProvider'



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
    form_2: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 1),
    },
}))

const Login = (props) => {

    let { id } = useParams()

    const classes = useStyles();

    const {state, login, logout, updateUserPassword, sendForgotpasswordCode, confirmNewPassWord} = useContext(AuthContext)
    const {newError, newSuccess} = useContext(EventContext)
    const {info, setCompanyName} = useContext(CompanyContext)

    const [forgotPassword, setforgotPassword] = useState(false)

    useEffect(() => {
        logout()
        setCompanyName(id ? id : 'IBS')
        //credentialsOnSubmmit('Admin', 'Admin1234')
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(state.logged){
            props.history.push('/')
        } 
    }, [state.logged]) // eslint-disable-line react-hooks/exhaustive-deps

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
                newError(error.message)
                console.log('error', error)
            })
        }
        func()
    }

    const forgotPasswordOnSubmit = (username, code, password)=>{
        confirmNewPassWord(username, code, password)
        .then((result)=>{
            newSuccess(`New password has been sent successfully`)
            setforgotPassword(false)
        })
        .catch((error)=>{
            newError(error.message)
            console.log(error);
        })
    }

    const forgotPasswordSendCode = (username)=>{
        sendForgotpasswordCode(username)
        .then((result)=>{
            const msg = result.CodeDeliveryDetails
            newSuccess(`${msg.DeliveryMedium === 'EMAIL' ? 'An':(msg.DeliveryMedium === 'SMS' ? 'A': '')} ${msg.DeliveryMedium} has been send to ${msg.Destination}`)
        })
        .catch((error)=>{
            newError(error.message)
            console.log(error);
        })
    }

    return(
        <Container maxWidth="xs">
            <Card className={classes.card}>
                <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    title="Company Image"
                    src={info.initImgURL}
                />
                {state.newPasswordRequired ? (
                    <NewPassword 
                        onSubmit={newPasswordOnSubmmit}
                        classes={classes}
                    />
                ) : (
                    !forgotPassword ? (
                        <Credentials 
                            onSubmit={credentialsOnSubmmit} 
                            onForgotPassword={setforgotPassword}
                            classes={classes}
                        />
                    ) : (
                        <ForgotPassword
                            onForgotPassword={setforgotPassword}
                            onSubmit={forgotPasswordOnSubmit} 
                            onSendCode={forgotPasswordSendCode}
                            classes={classes}
                        />
                    )
                )}
            </Card>
        </Container>
    )
}

export default Login
