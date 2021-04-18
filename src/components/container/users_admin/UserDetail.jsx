// LIBRARIES
import React, {useContext, useState, useEffect} from 'react'
import {makeStyles, Grid, Card, CardHeader, FormControlLabel, Switch, DialogTitle, CardContent, Divider, Typography, FormGroup, Button, IconButton,  Dialog, DialogActions, DialogContent, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import clsx from 'clsx'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EditIcon from '@material-ui/icons/Edit';
// CONTEXT
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

    // Classes
    const classes = useStyles();
    // Constxt
    const {userList, setUserState, changeUserGroup}  = useContext(UserContext)
    const {userInfo}  = useContext(AuthContext)
    // Page info state
    const [info, setinfo] = useState({})
    // Dialog handlers state
    const [edit, setedit] = useState(false)
    const [group, setGroup] = useState('Viwer')
    const [enabled, setEnabled] = useState(false)

    // Load page info
    useEffect(() => {
      setinfo(userList[props.index])
    }, [userList, props])

    // Load dialog values
    useEffect(() => {
      setGroup(info.AccessGroup)
      setEnabled(info.Enabled)
    }, [info])

    // Handle edit button
    const handleEdit = () => {
      setedit(!edit);
    };

    // Handle save button
    const handleSave = () => {
      if(group !== info.AccessGroup) changeUserGroup(props.index, group)
      if(enabled !== info.Enabled) setUserState(props.index, enabled)
      setedit(!edit);
    };

    // Handle cancel button
    const handleCancel = () => {
      setGroup(info.AccessGroup)
      setEnabled(info.Enabled)
      setedit(!edit);
    };

    // Card acction element -> edit
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

    // Data row
    const row = (label, value, mainsize, size1, size2, style) => {
      return(
        <Grid container item xs={mainsize} spacing={1}>
          <Grid item xs={size1} component={Typography} className={clsx(classes.typography, classes.title)}>
            {label}:
          </Grid>
          <Grid item xs={size2} component={Typography} className={style}>
            {value}
          </Grid>
        </Grid>
      )
    }

    // Edit dialog
    const dialog = () => {
      return(
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
                <Button onClick={handleCancel} color="primary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
      )
    }

    // Return
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
                              {row('Name', info.name, 12, 12, 12, classes.typography)}
                              {row('Family name', info.family_name, 12, 12, 12, classes.typography)}
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} direction="column" alignItems="center" spacing={2}>
                            {row('Status', info.UserStatus, 10, 5, 7, classes.typography)}
                            {row('Enabled', info.Enabled ? "Yes" : "No", 10, 5, 7, clsx(classes.typography, {[classes.typography_gren]: info.Enabled, [classes.typography_red]: !info.Enabled}))}
                            {row('Email', info.email, 10, 5, 7, classes.typography)}
                            {row('Email verified', info.email_verified ? "Yes" : "No", 10, 5, 7, clsx(classes.typography, {[classes.typography_gren]: info.email_verified, [classes.typography_red]: !info.email_verified}))}
                            {row('Group', info.AccessGroup, 10, 5, 7, classes.typography)}
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
        {dialog()}
        </div>
    )
}

export default UserDetail
