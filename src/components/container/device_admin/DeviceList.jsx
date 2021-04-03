import React, {useEffect, useContext}  from 'react'
import {Paper, Card, CardHeader, Divider, CardContent, List} from '@material-ui/core';


import {DeviceContext} from './../../../context/DeviceProvider'
import DeviceListHeaderItem from './DeviceListHeaderItem';

const DeviceList = ({index, setIndex}) => {

    const {deviceByType} = useContext(DeviceContext)

    return (
        <Card elevation={3}>
            <CardHeader
                title={'Device List'}
            />
            <Divider/>
            <CardContent>
                <Paper style={{maxHeight: '600px', overflow: 'auto'}}>
                    <List>
                    {
                        deviceByType.map((item, idx) => {
                            return(
                                <DeviceListHeaderItem key= {idx} item={item} index={index} setIndex={setIndex}/>
                            )
                        })
                    }
                </List>
                </Paper>
            </CardContent>
        </Card>
        
    )
}

export default DeviceList
