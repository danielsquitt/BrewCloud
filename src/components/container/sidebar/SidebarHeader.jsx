import React, {useContext} from 'react'
import clsx from 'clsx';
import { makeStyles, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from "@material-ui/core";

import { CompanyContext } from './../../../context/CompanyProvider';

//const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
      avatar: {
        boxShadow: theme.shadows[3],
      },
      typography: {
        fontSize: 16,
      },
}))

const SidebarHeader = () => {

    const classes = useStyles()

    const {info} = useContext(CompanyContext)

    return (
        <List>
            <ListItem className={clsx(classes.root)} >
                <ListItemAvatar >
                  <Avatar alt="Logo" src={info.faviIconUrl} className={classes.avatar} />
                </ListItemAvatar >
                <ListItemText primary={<Typography variant="overline" className={classes.typography}>{info.name}</Typography>}/>
            </ListItem>
        </List>
    )
}

export default SidebarHeader
