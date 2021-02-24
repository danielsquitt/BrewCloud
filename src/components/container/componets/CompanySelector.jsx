import React, {useState} from 'react'

import {makeStyles, FormControl, InputLabel, } from '@material-ui/core';
import Select from "react-select";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      borderColor: 'white'
    },
    select: {
      color: 'white',
      //backgroundColor: 'blue'
    },
    label: {
        color: 'white'  
    },
    icon: {
        fill: 'white'  
    },
  }));

const CompanySelector = ({items, value, setValue}) => {

    const classes = useStyles()

    
    const colourStyles = {
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        // const color = chroma(data.color);
        //console.log({ data, isDisabled, isFocused, isSelected });
        return {
          ...styles,
          backgroundColor: isFocused ? "#999999" : null,
          color: "#333333",
        };
      }
    };

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            
            <Select
              value={value}
              onChange={setValue}
              defaultValue={items[0]}
              label="Single select"
              options={items}
              styles={colourStyles}
            >
            </Select>
        </FormControl>
    )
}

export default CompanySelector
