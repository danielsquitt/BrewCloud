import React, {useEffect, useContext, useState} from 'react'
import {makeStyles, Grid, Card, CardHeader, CardContent, Divider, Typography, IconButton, TextField, Dialog, DialogActions, DialogContent, Button, DialogTitle, FormControl, InputLabel, FormHelperText, InputAdornment, Input, GridListTileBar  } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useForm } from "react-hook-form";
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
    title: {
      fontWeight: 600,
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
    const {userInfo, updateAtributes, changePassword, sendVerificationCode, confirmEmail} = useContext(AuthContext)
    const {newError, newSuccess} = useContext(EventContext)

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

    const [veryfyEmail, setVeryfyEmail] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')

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

    const handleVerifyEmailSave = async() => {
      await confirmEmail(verificationCode)
      .then((result) => {
        console.log(result);
        newSuccess(`Email ${userInfo.email} verified`)
      })
      .catch((error) => {
        newError(error.message)
      })
      setVeryfyEmail(!veryfyEmail)
    }

    const handleVerifyEmailCancel = () => {
      setVeryfyEmail(!veryfyEmail)
    }

    const handleVerifySendCode = async() => {
      await sendVerificationCode()
      .then((result) => {
        console.log(result);
        newSuccess(`Email with verification code send to ${userInfo.email}`)
      })
      .catch((error) => {
        newError(error.message)
      })
    }

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
                                  {userInfo.name}
                                </Grid>
                              </Grid>
                              <Grid container item xs={12} spacing={1}>
                                <Grid item xs={12} component={Typography} className={clsx(classes.typography, classes.title)}>
                                  Family name:
                                </Grid>
                                <Grid item xs={12} component={Typography} className={classes.typography}>
                                  {userInfo.family_name}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container item xs={12} direction="column" alignItems="center" spacing={2}>
                            <Grid container item xs={10} >
                              <Grid item xs={5} component={Typography} className={clsx(classes.typography, classes.title)}>
                                Username:
                              </Grid>
                              <Grid item xs={7} component={Typography} className={classes.typography}>
                                {userInfo.username}
                              </Grid>
                            </Grid>
                            <Grid container item xs={10} spacing={1}>
                              <Grid item xs={5} component={Typography} className={clsx(classes.typography, classes.title)}>
                                Email:
                              </Grid>
                              <Grid item xs={7} component={Typography} className={classes.typography}>
                                {userInfo.email}
                              </Grid>                              
                            </Grid>
                            <Grid container item xs={10} spacing={1}>
                              <Grid item xs={5} component={Typography} className={clsx(classes.typography, classes.title)}>
                                Email verified:
                              </Grid>
                              <Grid item xs={7} component={Typography} className={classes.typography}>
                                {userInfo.email_verified ? 'Yes' : 'No'}
                              </Grid>                              
                            </Grid>
                            <Grid container item xs={10} spacing={1}>
                              <Grid item xs={5} component={Typography} className={clsx(classes.typography, classes.title)}>  
                                Group:
                              </Grid>
                              <Grid item xs={7} component={Typography} className={classes.typography}>
                                {userInfo.group}
                              </Grid>                              
                            </Grid>
                          </Grid>
                        </Grid>
                        <Divider/>
                        <CardContent>
                            <Grid container spacing={1}>
                              <Grid item> 
                                <Button variant="contained" color="primary" onClick={()=>{setChangePass(!changePass)}}>Change Password</Button>
                              </Grid>
                              { 
                                !userInfo.email_verified ? (
                                  <Grid item> 
                                    <Button variant="contained" color="primary" onClick={()=>{setVeryfyEmail(!veryfyEmail)}}>Verify email</Button>
                                  </Grid>
                                ) : (null)
                              }
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={edit} onClose={handleParamCancel} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Edit Parameters</DialogTitle>
              <Divider/>
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
                  <Divider/>
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
                <Divider/>
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
                <Divider/>
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
            <Dialog open={veryfyEmail} onClose={handleVerifyEmailCancel} aria-labelledby="form-dialog-title">
              <form noValidate autoComplete="off" onSubmit={handleSubmit(handleVerifyEmailSave)}>
                <DialogTitle id="form-dialog-title">Change password</DialogTitle>
                <Divider/>
                <DialogContent>
                  <TextField
                      autoFocus
                      margin="dense"
                      id="verify_code"
                      label="Verify code"
                      type="text"
                      fullWidth
                      value={verificationCode}
                      onChange={e => setVerificationCode(e.target.value)}
                   />
                </DialogContent>
                <Divider/>
                <DialogActions>
                <Button onClick={handleVerifySendCode} color="secondary">
                    Verification code
                </Button>
                <Button onClick={handleVerifyEmailCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleVerifyEmailSave} color="primary">
                    send
                </Button>
                </DialogActions>
              </form>
            </Dialog>
        </div>
    )
}

export default Profile
