import React, {useEffect, useState, useContext} from 'react'
import clsx from 'clsx';
import {makeStyles, Grid, Card, CardHeader, CardContent, Divider, CardActionArea , Avatar, IconButton } from '@material-ui/core';
import {DeviceContext} from './../../../context/DeviceProvider'
import { red, green } from '@material-ui/core/colors';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
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


const DeviceCardBase = (props) => {

    const classes = useStyles();

    const {deviceList} = useContext(DeviceContext)

    const [state, setstate] = useState(false)

    const [edit, setedit] = useState(false)

    useEffect(() => {
        setstate(deviceList[props.index].connected.state)
    }, [deviceList[props.index].connected.state])

    const avatar = ()=>{
        return(
            <Avatar 
                aria-label="recipe" 
                className={clsx(classes.avatar, {
                    [classes.avatarConnected]:state ,
                    [classes.avatarDisconnected]:!state ,
                })}
            >
                {state ? (
                    <WifiIcon/>
                ) : (
                    <WifiOffIcon/>
                )}
            </Avatar>
        )
    }
    const handleEdit = () => {
        setedit(!edit);
    };

    const handleSave = () => {
        setedit(!edit);
    };

    const handleCancel = () => {
        setedit(!edit);
    };

    const action = ()=>{
        return(
            <div>
                { edit ? ( 
                    <div>
                        <IconButton
                            onClick={handleCancel}
                            aria-label="cancel"
                        >
                            <ClearIcon color="secondary" />
                        </IconButton>
                        <IconButton
                            onClick={handleSave}
                            aria-label="save"
                        >
                            <DoneIcon style={{ color: green[500] }}/>
                        </IconButton>
                    </div>
                ) : ( 
                    <IconButton
                        onClick={handleEdit}
                        aria-label="edit"
                    >
                        <EditIcon color="primary"/>
                    </IconButton>
                )
                }
            </div>
            
        )
    }


    return (
        <div>
            {JSON.stringify(deviceList[props.index])}
            <Card elevation={1}>
                <CardHeader
                    avatar={avatar()}
                    title={deviceList[props.index].alias}
                    subheader={deviceList[props.index].name}
                    titleTypographyProps={{className: classes.cardtitle}}
                    action={action()}
                />
                <Divider/>
                <CardContent>
                    {React.Children.map(props.children, child => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child);
                          }
                          return child;
                    })}
                </CardContent>
            </Card>
        </div>
    )
}

export default DeviceCardBase
