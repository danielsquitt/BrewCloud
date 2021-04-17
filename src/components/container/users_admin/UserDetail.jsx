import React, {useContext, useState, useEffect} from 'react'

import {makeStyles, Grid, Card, CardHeader, FormControlLabel, Switch, DialogTitle, CardContent, Divider, Typography, FormGroup, Button, CircularProgress, IconButton,  Dialog, DialogActions, DialogContent, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import clsx from 'clsx'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EditIcon from '@material-ui/icons/Edit';

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
    formControl: {
      margin: theme.spacing(2),
      minWidth: 120,
    },
  }));


const UserDetail = (props) => {

    const classes = useStyles();

    const {userList, setUserState, changeUserGroup}  = useContext(UserContext)
    const {userInfo}  = useContext(AuthContext)

    const [info, setinfo] = useState({})

    const [setUsetStateLoading, setSetUsetStateLoading] = useState(false)

    const [edit, setedit] = useState(false)
    const [group, setGroup] = useState('Viwer')
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
      setinfo(userList[props.index])
    }, [userList, props])

    useEffect(() => {
      setGroup(info.AccessGroup)
      setEnabled(info.Enabled)
    }, [info])

    const handleEdit = () => {
      setedit(!edit);
    };

    const handleSave = () => {
      if(group !== info.AccessGroup) changeUserGroup(props.index, group)
      if(enabled !== info.Enabled) setUserState(props.index, enabled)
      setedit(!edit);
    };

  const handleCancel = () => {
    setGroup(info.AccessGroup)
    setEnabled(info.Enabled)
    setedit(!edit);
    };

    const action = ()=>{
      return(
          <IconButton
              onClick={handleEdit}
              aria-label="edit"
          >
              <EditIcon color='primary'/>
          </IconButton>
      )
  }

    return (
      <div>
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Card elevation={1}>
                    <CardHeader
                        title={info.Username}
                        subheader={info.sub}
                        titleTypographyProps={{className: classes.cardtitle}}
                        action={userInfo.username !== info.Username ? action() : (null)}
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
                                {info.AccessGroup}
                              </Grid>                              
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
        <Dialog open={edit} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit {info.Username}</DialogTitle>
        <Divider/>
        <DialogContent>
            <FormGroup aria-label="position" colum>
          <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Group</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={group}
                  onChange={(event)=>{setGroup(event.target.value)}}
                >
                  <MenuItem value="Administrator">Administrator</MenuItem>
                  <MenuItem value="Production">Production</MenuItem>
                  <MenuItem value="Viwer">Viwer</MenuItem>
              </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
              <FormControlLabel
                  value="enable"
                  control={<Switch color="primary" checked={enabled} onChange={(event)=>{setEnabled(event.target.checked)}}/>}
                  label="Enable"
                  labelPlacement="start"
              />
              </FormControl>
            </FormGroup>

        </DialogContent>
        <Divider/>
            <DialogActions>
            <Button onClick={handleCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}

export default UserDetail
