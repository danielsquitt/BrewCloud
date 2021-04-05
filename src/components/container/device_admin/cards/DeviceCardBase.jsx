import React, {useEffect, useState, useContext} from 'react'
import clsx from 'clsx';
import {makeStyles, Card, CardHeader, CardContent, Divider , Avatar, IconButton, TextField, Dialog, DialogActions, DialogContent, Button } from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import EditIcon from '@material-ui/icons/Edit';

import {DeviceContext} from '../../../../context/DeviceProvider'
import {AuthContext} from '../../../../context/AuthProvider'

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
        fontSize: '1rem',
        [theme.breakpoints.up('md')]:{
            fontSize: '1.5rem',
        }
      },
  }));

  const permissions = {
      editThingName: 2,
  }


const DeviceCardBase = (props) => {

    const classes = useStyles();

    const {deviceList, updateDeviceName} = useContext(DeviceContext)
    const {permissions} = useContext(AuthContext)

    const [state, setstate] = useState(false)

    const [edit, setedit] = useState(false)
    const [newName, setNewName] = useState('')

    useEffect(() => {
        setstate(deviceList[props.index].connected.state)
    }, [deviceList[props.index].connected.state]) // eslint-disable-line react-hooks/exhaustive-deps

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
        if(newName !== '') updateDeviceName(props.index, newName.trim())
        setNewName('')
        setedit(!edit);
    };

    const handleCancel = () => {
        setNewName('')
        setedit(!edit);
    };

    const action = ()=>{
        return(
            <IconButton
                onClick={handleEdit}
                aria-label="edit"
                disabled={permissions.editThingName ? false : true}
            >
                <EditIcon color={permissions.editThingName ? 'primary' : 'default'}/>
            </IconButton>
        )
    }




    return (
        <div>
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
            <Dialog open={edit} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    defaultValue={deviceList[props.index].alias}
                    onChange={e => setNewName(e.target.value)}
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

export default DeviceCardBase
