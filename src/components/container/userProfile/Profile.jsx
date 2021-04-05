import React, {useEffect, useContext, useState} from 'react'
import {makeStyles, Grid, Card, CardHeader, CardContent, Divider, Typography, IconButton, TextField, Dialog, DialogActions, DialogContent, Button, DialogTitle, FormControl, InputLabel, FormHelperText, InputAdornment, Input  } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useForm } from "react-hook-form";
import EditIcon from '@material-ui/icons/Edit';

import {AuthContext} from './../../../context/AuthProvider'
import {EventContext} from './../../../context/EventProvider'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    cardRoot: {
        minWidth: 275,
      },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
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
    cardtitle: {
      fontSize: '2rem',
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(2),
    },
    
  }));

const Profile = ({setSelectedIndex}) => {

    const classes = useStyles();
    const {userInfo, updateAtributes, changePassword} = useContext(AuthContext)
    const {newError} = useContext(EventContext)

    const [edit, setedit] = useState(false)
    const [newName, setNewName] = useState('')
    const [newFamilyName, setNewFamilyName] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const [changePass, setChangePass] = useState(false)
    const { register, errors, handleSubmit, clearErrors } = useForm({
      reValidateMode: "onBlur"
    });
    const [showPassword, setshowPassword] = useState(false)
    const [showPassword1, setshowPassword1] = useState(false)
    const [showPassword2, setshowPassword2] = useState(false)
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    useEffect(() => {
      setSelectedIndex(0)
    }) 

    const handleParamSave = async() => {
      const atributtes = {}
      if (newName !== '') atributtes['name']=newName.trim()
      if (newFamilyName !== '') atributtes['family_name']=newFamilyName.trim()
      if (newEmail !== '') atributtes['email']=newEmail.trim()
      if (Object.keys(atributtes).length > 0){
        await updateAtributes(atributtes)
      }
      setNewName('')
      setNewFamilyName('')
      setNewEmail('')
      setedit(!edit);
    };

    const handleParamCancel = () => {
      setNewName('')
      setNewFamilyName('')
      setNewEmail('')
      setedit(!edit);
    };

    const handlePassSave = async() => {
      try {
        await changePassword(password, password1)
      } catch (error) {
        newError(error.message)
      }
      setshowPassword(false)
      setshowPassword1(false)
      setshowPassword2(false)
      setPassword('')
      setPassword1('')
      setPassword2('')
      setChangePass(!changePass);
    };

    const handlePassCancel = () => {
      clearErrors()
      setshowPassword(false)
      setshowPassword1(false)
      setshowPassword2(false)
      setPassword('')
      setPassword1('')
      setPassword2('')
      setChangePass(!changePass);
    };

    const action = ()=>{
      return(
          <IconButton
              onClick={() => {setedit(!edit);}}
              aria-label="edit"
          >
              <EditIcon color="primary"/>
          </IconButton>
      )
  }
    
    return (
        <div className={classes.root}>
            <Grid container spacing={10} justify="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Card className={classes.cardRoot} elevation={3}>
                        <CardHeader 
                          title={'Profile'} 
                          titleTypographyProps={{className: classes.cardtitle}} 
                          action={action()}
                        />
                        <Divider/>
                        <Grid container component={CardContent} spacing={2}>
                          <Grid item xs={12}> 
                            <Grid container spacing={1}>
                              <Grid item xs={12} >
                                <div style={{ padding: 10 }}>
                                  <Grid container >
                                    <Grid item component={Typography} className={classes.typography} xs={5}>
                                      USERNAME:
                                    </Grid>
                                    <Grid item component={Typography} className={classes.typography} xs={7}>
                                      {userInfo.username}
                                    </Grid>
                                  </Grid>
                                </div>
                              </Grid>
                              <Grid item xs={12}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <Divider/>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={12}>
                                <div style={{ padding: 10 }}>
                                  <Grid container>
                                    <Grid item component={Typography} className={classes.typography} xs={5}>
                                      NAME:
                                    </Grid>
                                    <Grid item component={Typography} className={classes.typography} xs={7}>
                                      {`${userInfo.name} ${userInfo.family_name}`}
                                    </Grid>
                                  </Grid>
                                </div>
                              </Grid>
                              <Grid item xs={12}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <Divider/>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={12}>
                                <div style={{ padding: 10 }}>
                                  <Grid container>
                                    <Grid item component={Typography} className={classes.typography} xs={5}>
                                      EMAIL:
                                    </Grid>
                                    <Grid item component={Typography} className={classes.typography} xs={7}>
                                      {userInfo.email}
                                    </Grid>
                                  </Grid>
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Divider/>
                        <CardContent>
                            <Button variant="contained" color="primary" onClick={()=>{setChangePass(!changePass)}}>Change Password</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={edit} onClose={handleParamCancel} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Edit Parameters</DialogTitle>
                <DialogContent>
                  <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Name"
                      type="text"
                      fullWidth
                      defaultValue={userInfo.name}
                      onChange={e => setNewName(e.target.value)}
                    />
                  <TextField
                    margin="dense"
                    id="family_name"
                    label="Family Name"
                    type="email"
                    fullWidth
                    defaultValue={userInfo.family_name}
                    onChange={e => setNewFamilyName(e.target.value)}
                  />
                    <TextField
                      margin="dense"
                      id="email"
                      label="Email"
                      type="text"
                      fullWidth
                      defaultValue={userInfo.email}
                      onChange={e => setNewEmail(e.target.value)}
                    />
                  </DialogContent>
                <DialogActions>
                <Button onClick={handleParamCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleParamSave} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={changePass} onClose={handlePassCancel} aria-labelledby="form-dialog-title">
              <form noValidate autoComplete="off" onSubmit={handleSubmit(handlePassSave)}>
                <DialogTitle id="form-dialog-title">Change password</DialogTitle>
                <DialogContent>
                  <FormControl className={classes.form} noValidate variant="outlined" >
                    <InputLabel>Password</InputLabel>
                    <Input 
                      id="password" 
                      name="password"
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={()=>{setshowPassword(!showPassword)}}
                            onMouseDown={(event) => { event.preventDefault()}}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputRef={
                        register({
                          required: {value: true, message: 'Required field'},
                          minLength: {value: 6, message: 'The password length must be greater than 6'}
                          })
                        }
                    />
                    { errors.password ? ( <FormHelperText error > {errors.password.message} </FormHelperText> ) : null }
                  </FormControl>
                  <FormControl className={classes.form} noValidate variant="outlined" >
                    <InputLabel htmlFor="component-outlined">New password</InputLabel>
                    <Input 
                      id="new_password" 
                      name="new_password"
                      value={password1} 
                      onChange={e => setPassword1(e.target.value)} 
                      fullWidth
                      type={showPassword1 ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>{setshowPassword1(!showPassword1)}}
                            onMouseDown={(event) => { event.preventDefault()}}
                          >
                            {showPassword1 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                      </InputAdornment>
                      }
                      inputRef={
                        register({
                          required: {value: true, message: 'Required field'},
                          minLength: {value: 6, message: 'The password length must be greater than 6'}
                        })
                      }
                    />
                    { errors.new_password ? ( <FormHelperText error > {errors.new_password.message} </FormHelperText> ) : null }
                  </FormControl>
                  <FormControl className={classes.form} noValidate variant="outlined" >
                    <InputLabel htmlFor="component-outlined">Repeat password</InputLabel>
                    <Input 
                      id="repeat_password" 
                      name="repeat_password"
                      value={password2} 
                      onChange={e => setPassword2(e.target.value)} 
                      label="Repeat_password" 
                      inputComponent="input"
                      fullWidth
                      type={showPassword2 ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>{setshowPassword2(!showPassword2)}}
                            onMouseDown={(event) => { event.preventDefault()}}
                          >
                            {showPassword2 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputRef={
                        register({
                          required: {value: true, message: 'Required field'},
                          validate: value => value === password1 || "The passwords do not match",
                          minLength: {value: 6, message: 'The password length must be greater than 6'}
                        })
                      }
                    />
                    { errors.repeat_password ? ( <FormHelperText error > {errors.repeat_password.message} </FormHelperText> ) : null }
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handlePassCancel} color="primary">
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Save
                  </Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default Profile
