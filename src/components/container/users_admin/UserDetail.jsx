import React, {useContext, useState, useEffect} from 'react'

import {makeStyles, Grid, Card, CardHeader, CardContent, Divider, Typography, ButtonGroup, Button } from '@material-ui/core';
import clsx from 'clsx'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import { UserContext } from './../../../context/UserProvider';
import { AuthContext } from './../../../context/AuthProvider';

const useStyles = makeStyles((theme) => ({
    cardtitle: {
        fontSize: '1.5rem',
    },
    typography: {
        fontSize: '0.7rem',
        [theme.breakpoints.up('sm')]: {
          fontSize: '0.8rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1rem',
        },
        [theme.breakpoints.up('lg')]: {
          fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xl')]: {
          fontSize: '1.5rem',
        },
    },
    typography_gren: {
        color: 'green'
    },
    typography_red: {    
        color: 'red'
    },
    title: {
        fontWeight: 600,
    },
  }));


const UserDetail = (props) => {

    const classes = useStyles();

    const {userList, setUserState}  = useContext(UserContext)
    const {userInfo}  = useContext(AuthContext)

    const [info, setinfo] = useState({})

    const handleClic = (state)=>{
        (async () => {
          await setUserState(props.index, state)
        })()
    }

    useEffect(() => {
      setinfo(userList[props.index])
    }, [userList, props])

    const options = () => {
        if (userInfo.username !== info.Username){
            return(
                <Card elevation={1}> 
                    <CardContent>
                        <ButtonGroup>
                            {
                                info.Enabled ? (
                                    <Button variant="contained" color="secondary" onClick={() => {handleClic(false)}}>Disable</Button>
                                ) : (
                                    <Button variant="contained" color="primary" onClick={() => {handleClic(true)}}>Enable</Button>
                                )
                            }
                        </ButtonGroup>
                    </CardContent>
                </Card>
            )
        } else {
            return null
        }
    }

    const getAccessLevelString = (groups) => {
        console.log('groups', groups )
        let result = 'Viwer'
        if(groups){
            groups.forEach(group => {
                if (group.search('Prod') > 0) result = 'Production'
                if (group.search('Admin') > 0) result = 'Administrator'
                if (group.search('Viwer') > 0) result = 'Viwer'
            })
        }
        return result
    }

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Card elevation={1}>
                    <CardHeader
                        title={info.Username}
                        subheader={info.sub}
                        titleTypographyProps={{className: classes.cardtitle}}
                    />
                    <Divider/>
                    <Grid container component={CardContent} direction='column' spacing={4}>
                        <Grid container item xs={12} justify="center" alignItems="center">
                            <Grid container item xs={5} justify="center" alignItems="center">
                              <Grid item xs={12} sm={10} md={8}>
                                <AccountCircleIcon color="primary" style={{ fontSize: 100 }}/>
                              </Grid>
                            </Grid>
                            <Grid container item xs={7} spacing={4}>
                              <Grid container item xs={12} spacing={1}>
                                <Grid item xs={12} component={Typography} className={clsx(classes.typography, classes.title)}>
                                  Name:
                                </Grid>
                                <Grid item xs={12} component={Typography} className={classes.typography}>
                                  {info.name}
                                </Grid>
                              </Grid>
                              <Grid container item xs={12} spacing={1}>
                                <Grid item xs={12} component={Typography} className={clsx(classes.typography, classes.title)}>
                                  Family name:
                                </Grid>
                                <Grid item xs={12} component={Typography} className={classes.typography}>
                                  {info.family_name}
                                </Grid>
                              </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} direction="column" alignItems="center" spacing={2}>
                            <Grid container item xs={10} spacing={1}>
                              <Grid item xs={5} component={Typography} className={clsx(classes.typography, classes.title)}>
                                Status:
                              </Grid>
                              <Grid item xs={7} component={Typography} className={clsx(classes.typography, {[classes.typography_gren]: info.UserStatus === 'CONFIRMED', [classes.typography_red]: info.UserStatus !== 'CONFIRMED' })}>
                                {info.UserStatus}
                              </Grid>                              
                            </Grid>
                            <Grid container item xs={10} spacing={1}>
                              <Grid item xs={5} component={Typography} className={clsx(classes.typography, classes.title)}>
                                Enabled:
                              </Grid>
                              <Grid item xs={7} component={Typography} className={clsx(classes.typography, {[classes.typography_gren]: info.Enabled, [classes.typography_red]: !info.Enabled})}>
                                {info.Enabled ? "Yes" : "No"}
                              </Grid>                              
                            </Grid>
                            <Grid container item xs={10} spacing={1}>
                              <Grid item xs={5} component={Typography} className={clsx(classes.typography, classes.title)}>
                                Email:
                              </Grid>
                              <Grid item xs={7} component={Typography} className={classes.typography}>
                                {info.email}
                              </Grid>                              
                            </Grid>
                            <Grid container item xs={10} spacing={1}>
                              <Grid item xs={5} component={Typography} className={clsx(classes.typography, classes.title)}>  
                                Email verified:
                              </Grid>
                              <Grid item xs={7} component={Typography} className={clsx(classes.typography, {[classes.typography_gren]: info.email_verified, [classes.typography_red]: !info.email_verified})}>
                                {info.email_verified ? "Yes" : "No"}
                              </Grid>                              
                            </Grid>
                            <Grid container item xs={10} spacing={1}>
                              <Grid item xs={5} component={Typography} className={clsx(classes.typography, classes.title)}>  
                                Group:
                              </Grid>
                              <Grid item xs={7} component={Typography} className={classes.typography}>
                                {getAccessLevelString(info.Groups)}
                              </Grid>                              
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item>
                {options()}
            </Grid>
        </Grid>
    )
}

export default UserDetail
