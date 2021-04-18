import React, {useContext} from 'react'
import {makeStyles, Paper, Card, CardHeader, Divider, CardContent, List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

import { green, red } from '@material-ui/core/colors';

import { UserContext } from './../../../context/UserProvider';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

const UserList = ({index, setIndex}) => {

    const {userList} = useContext(UserContext)

    const classes = useStyles(); 

    const getindex = () => {
        return index
    }

    const getIcon = (status) =>{
        if(status === 'CONFIRMED'){
            return(<DoneIcon style={{ color: green[500] }}/>)
        }else{
            return(<ClearIcon style={{ color: red[500] }}/>)
        }
    }

    return (
        <Card elevation={3}>
            <CardHeader
                title={'User List'}
            />
            <Divider/>
            <CardContent>
                <Paper style={{maxHeight: '600px', overflow: 'auto'}}>
                    <List>
                        {
                            userList.map((element, index) => {
                                return(
                                    <ListItem 
                                        button
                                        key={index} 
                                        className={classes.nested}
                                        selected={getindex() === index}
                                        onClick={() => setIndex(index)}
                                    >
                                        <ListItemIcon>
                                            {getIcon(element.UserStatus)}
                                        </ListItemIcon>
                                        <ListItemText primary={element.Username} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Paper>
            </CardContent>
        </Card>
    )
}

export default UserList
