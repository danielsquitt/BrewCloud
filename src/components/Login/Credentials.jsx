import React, {useState} from 'react'
import { Container, Card, CardMedia, CardContent, Button, FormControl, InputLabel, OutlinedInput, FormHelperText, InputAdornment, IconButton   } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import img from "./../../img/Logo_Peninsula_Azul_360x.png";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '30%', 
      },
    card: {
        marginTop: theme.spacing(5),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
}))

const Credentials = (props) => {

    const classes = useStyles();
    const { register, errors, handleSubmit } = useForm({
        reValidateMode: "onBlur"
    });

    const [showPassword, setshowPassword] = useState(false)

    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const onSubmit = (data, e)=>{
        console.log({username, password})
        e.preventDefault()
        props.onSubmit(username, password)
    }

    return (
        <Container maxWidth="xs">
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    title="Company Image"
                    image={img}
                />
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
                    </form>
                </CardContent>
            </Card>

        </Container>
    )
}

export default Credentials
