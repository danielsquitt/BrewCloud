import React, {useEffect} from 'react'
import {makeStyles, Grid, Card, CardHeader, CardContent, Divider, Typography } from '@material-ui/core';

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

    useEffect(() => {
      setSelectedIndex(0)
    }, [])
    
    return (
        <div className={classes.root}>
            <Grid container spacing={10} justify="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Card className={classes.cardRoot} elevation={3}>
                        <CardHeader title={'Profile'} titleTypographyProps={{className: classes.cardtitle}} />
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
                                      danielsquitt
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
                                      Daniel Squittieri
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
                                      danielsquitt@gmail.com
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
        </div>
    )
}

export default Profile
