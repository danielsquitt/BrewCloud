import React, {useContext, useEffect, useState} from 'react'
import {makeStyles, Paper, Card, CardHeader, Divider, CardContent, List, ListItem, ListItemText} from '@material-ui/core';



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

const UserList = ({list, index, setIndex}) => {

    const classes = useStyles();
    const handleClick = ()=>{

    }

    const getindex = () => {
        return index
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
                            list.map((element, index) => {
                                return(
                                    <ListItem 
                                        button
                                        key={index} 
                                        className={classes.nested}
                                        selected={getindex() === index}
                                        onClick={() => setIndex(index)}
                                    >
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
