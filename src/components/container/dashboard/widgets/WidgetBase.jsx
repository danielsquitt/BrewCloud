import React, {useState, useContext, useEffect} from 'react'
import clsx from 'clsx';
import {makeStyles, Grid, Card, CardHeader, CardContent, Divider, Typography, Collapse, Avatar, IconButton } from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { DeviceContext } from './../../../../context/DeviceProvider';



const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatarConnected: {
      backgroundColor: green[500],
    },
    avatarDisconnected: {
      backgroundColor: red[500],
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    cardtitle: {
        fontSize: '1.5rem',
      },
  }));

  

const WidgetBase = (props) => {

    const classes = useStyles();

    const {getShadow} = useContext(DeviceContext)

    const [expanded, setExpanded] = useState(true);

    const connected = true

    useEffect(() => {
        if (props.name){
            getShadow(props.object, 'std')
        }
      }, [props.name])

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    const avatar = ()=>{
        return(
            <Avatar 
                aria-label="recipe" 
                className={clsx(classes.avatar, {
                    [classes.avatarConnected]:connected,
                    [classes.avatarDisconnected]:!connected,
                })}
            >
                {connected ? (
                    <WifiIcon/>
                ) : (
                    <WifiOffIcon/>
                )}
            </Avatar>
        )
    }

    const action = ()=>{
        return(
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </IconButton>
        )
    }

    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <Card elevation={3}>
                <CardHeader
                    avatar={avatar()}
                    title={props.object}
                    titleTypographyProps={{className: classes.cardtitle}}
                    action={action()}
                />
                <Divider/>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {props.children}
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    )
}

export default WidgetBase
