
// Libraries
import React, {useEffect, useContext} from 'react'
import Credentials from './login/Credentials'
import NewPassword from "./login/NewPassword";
import {AuthContext} from "./../context/AuthProvider";
import { Container, Card, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from "react-router-dom";
import { EventContext } from "../context/EventProvider";
import { CompanyContext } from './../context/CompanyProvider';



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

    let { id } = useParams()

    const classes = useStyles();

    const {state, login, logout, updateUserPassword } = useContext(AuthContext)
    const {newError} = useContext(EventContext)
    const {info, setCompanyName} = useContext(CompanyContext)

    useEffect(() => {
        logout()
        if (!id) { id = 'IBS' }
        setCompanyName(id)
        credentialsOnSubmmit('Admin', 'Admin1234')
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
                newError(error.message)
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
                    src={info.initImgURL}
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
