import React, {useState} from 'react'
import { CardContent, Button, FormControl, InputLabel, OutlinedInput, FormHelperText, InputAdornment, IconButton   } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useForm } from "react-hook-form";

const Credentials = (props) => {

    const {classes, onForgotPassword} = props
    const { register, errors, handleSubmit } = useForm({
        reValidateMode: "onBlur"
    });

    const [showPassword, setshowPassword] = useState(false)

    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const onSubmit = (data, e)=>{
        e.preventDefault()
        props.onSubmit(username, password)
    }

    return (
        <CardContent>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}> 
                <FormControl className={classes.form} noValidate variant="outlined" >
                    <InputLabel htmlFor="component-outlined">Username</InputLabel>
                    <OutlinedInput 
                        id="username" 
                        name="username"
                        value={username} 
                        onChange={e => setusername(e.target.value)} 
                        label="Username" 
                        inputComponent="input"
                        type="text"
                        inputRef={
                            register({
                                required: {value: true, message: 'Required field'}
                            })
                        }
                    />
                    { errors.username ? ( <FormHelperText error > {errors.username.message} </FormHelperText> ) : null 
                    }
                </FormControl> 
                <FormControl className={classes.form} noValidate variant="outlined" >
                    <InputLabel htmlFor="component-outlined">Password</InputLabel>
                    <OutlinedInput 
                        id="password" 
                        name="password"
                        value={password} 
                        onChange={e => setpassword(e.target.value)} 
                        label="Password" 
                        inputComponent="input"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>{setshowPassword(!showPassword)}}
                                onMouseDown={(event) => { event.preventDefault()}}
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        inputRef={
                            register({
                                required: {value: true, message: 'Required field'}
                            })
                        }
                    />
                    { errors.password ? ( <FormHelperText error > {errors.password.message} </FormHelperText> ) : null 
                    }
                </FormControl>
                <FormControl className={classes.form} noValidate variant="outlined" >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>
                </FormControl>
                <FormControl className={classes.form_forgotPassword} noValidate variant="outlined" >
                    <Button
                        color="primary"
                        onClick={()=>{onForgotPassword(true)}}
                    >
                        Forgot Password
                    </Button>
                </FormControl>
            </form>
        </CardContent>
    )
}

export default Credentials
