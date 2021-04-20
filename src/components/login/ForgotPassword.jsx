import React, {useState} from 'react'
import { CardContent, Button, FormControl, InputLabel, OutlinedInput, FormHelperText, InputAdornment, IconButton, Grid   } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useForm } from "react-hook-form";

const ForgotPassword = (props) => {

    const {classes, onForgotPassword, onSendCode} = props
    const { register, errors, handleSubmit } = useForm({
        reValidateMode: "onBlur"
    });

    
    const [showPassword1, setshowPassword1] = useState(false)
    const [showPassword2, setshowPassword2] = useState(false)

    const [username, setusername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [code, setCode] = useState('')

    const onSubmit = (data, e)=>{
        e.preventDefault()
        props.onSubmit(username, code, password1)
    }

    const onSendVerificationCode = () => {
        onSendCode(username)
    }

    const onCancel = () => {
        onForgotPassword(false)
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
                    <InputLabel htmlFor="component-outlined">New Password</InputLabel>
                    <OutlinedInput 
                        id="new_password" 
                        name="new_password"
                        value={password1} 
                        onChange={e => setPassword1(e.target.value)} 
                        label="New_Password" 
                        inputComponent="input"
                        type={showPassword1 ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>{setshowPassword1(!showPassword1)}}
                                onMouseDown={(event) => { event.preventDefault()}}
                                >
                                {showPassword1 ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        inputRef={
                            register({
                                required: {value: true, message: 'Required field'}
                            })
                        }
                    />
                    { errors.password ? ( <FormHelperText error > {errors.new_password.message} </FormHelperText> ) : null 
                    }
                </FormControl>
                <FormControl className={classes.form} noValidate variant="outlined" >
                    <InputLabel htmlFor="component-outlined">Repeat password</InputLabel>
                    <OutlinedInput 
                        id="repeat_password" 
                        name="repeat_password"
                        value={password2} 
                        onChange={e => setPassword2(e.target.value)} 
                        label="Repeat_password" 
                        inputComponent="input"
                        type={showPassword2 ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>{setshowPassword2(!showPassword2)}}
                                onMouseDown={(event) => { event.preventDefault()}}
                                >
                                {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        inputRef={
                            register({
                                required: {value: true, message: 'Required field'},
                                validate: value => value === password1 || "The passwords do not match"
                            })
                        }
                    />
                    { errors.repeat_password ? ( <FormHelperText error > {errors.repeat_password.message} </FormHelperText> ) : null 
                    }
                </FormControl>
                <FormControl className={classes.form} noValidate variant="outlined" >
                    <InputLabel htmlFor="component-outlined">Verification code</InputLabel>
                    <OutlinedInput 
                        id="verification_code" 
                        name="verification_code"
                        value={code} 
                        onChange={e => setCode(e.target.value)} 
                        label="Verification code" 
                        inputComponent="input"
                        type="text"
                        inputRef={
                            register({
                                required: {value: true, message: 'Required field'}
                            })
                        }
                    />
                    { errors.verification_code ? ( <FormHelperText error > {errors.verification_code.message} </FormHelperText> ) : null 
                    }
                </FormControl>
                <FormControl className={classes.form} noValidate variant="outlined" >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                </FormControl>
                <Grid container direction="column">
                    <Grid item>
                        <FormControl  noValidate variant="outlined" >
                            <Button
                                color="secondary"
                                size="small"
                                onClick={()=>{onSendVerificationCode()}}
                            >
                                Send Verification Code
                            </Button>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl  noValidate variant="outlined" >
                            <Button
                                color="primary"
                                size="small"
                                onClick={()=>{onCancel()}}
                            >
                                Cancel
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
                
                
            </form>
        </CardContent>
    )
}

export default ForgotPassword
