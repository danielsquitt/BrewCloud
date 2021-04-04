import React, {useEffect, useContext, useState} from 'react'
import {makeStyles, Grid, Card, CardHeader, CardContent, Divider, Typography, IconButton, TextField, Dialog, DialogActions, DialogContent, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import {AuthContext} from './../../../context/AuthProvider'

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
    
  }));

const Profile = ({setSelectedIndex}) => {

    const classes = useStyles();
    const {userInfo, updateAtributes} = useContext(AuthContext)

    const [edit, setedit] = useState(false)
    const [newName, setNewName] = useState('')
    const [newFamilyName, setNewFamilyName] = useState('')
    const [newEmail, setNewEmail] = useState('')

    useEffect(() => {
      setSelectedIndex(0)
    }, [])

    const handleEdit = () => {
      setedit(!edit);
    };

    const handleSave = () => {
      const atributtes = {}
      if (newName !== '') atributtes['name']=newName.trim()
      if (newFamilyName !== '') atributtes['family_name']=newFamilyName.trim()
      if (newEmail !== '') atributtes['email']=newEmail.trim()
      if (Object.keys(atributtes).length > 0){
        updateAtributes(atributtes)
      }
      setNewName('')
      setNewFamilyName('')
      setNewEmail('')
      setedit(!edit);
    };

    const handleCancel = () => {
      setNewName('')
      setNewFamilyName('')
      setNewEmail('')
      setedit(!edit);
    };

    const action = ()=>{
      return(
          <IconButton
              onClick={handleEdit}
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
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={edit} onClose={handleCancel} aria-labelledby="form-dialog-title">
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

export default Profile
