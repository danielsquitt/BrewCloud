import React, {useContext, useState, useEffect} from 'react'

import {makeStyles, Grid, Card, CardHeader, CardContent, Divider , Typography, IconButton, TextField, Dialog, DialogActions, DialogContent, Button } from '@material-ui/core';
import clsx from 'clsx'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import { UserContext } from './../../../context/UserProvider';

const useStyles = makeStyles((theme) => ({
    cardtitle: {
        fontSize: '1.5rem',
      },
  }));


const UserDetail = ({username}) => {

    const classes = useStyles();

    const {getUser}  = useContext(UserContext)

    const [info, setinfo] = useState({})

    useEffect(() => {
        if(username !== ''){
            getUser(username)
            .then((user)=>{
                setinfo(user)
            })
        }
    }, [username])

    return (
        <Card elevation={1}>
                <CardHeader
                    title={username}
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
                              <Grid item xs={7} component={Typography} className={classes.typography}>
                                {info.UserStatus}
                              </Grid>                              
                            </Grid>
                            <Grid container item xs={10} spacing={1}>
                              <Grid item xs={5} component={Typography} className={clsx(classes.typography, classes.title)}>
                                Enabled:
                              </Grid>
                              <Grid item xs={7} component={Typography} className={classes.typography}>
                                {info.Enabled ? "true" : "false"}
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
                              <Grid item xs={7} component={Typography} className={classes.typography}>
                                {info.email_verified}
                              </Grid>                              
                            </Grid>
                            <Grid container item xs={10} spacing={1}>
                              <Grid item xs={5} component={Typography} className={clsx(classes.typography, classes.title)}>  
                                Group:
                              </Grid>
                              <Grid item xs={7} component={Typography} className={classes.typography}>
                                {info.Groups}
                              </Grid>                              
                            </Grid>
                          </Grid>
                        </Grid>
            </Card>
    )
}

export default UserDetail
