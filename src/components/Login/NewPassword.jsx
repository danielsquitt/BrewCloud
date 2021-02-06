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

const NewPassword = (props) => {
    const classes = useStyles();
    const { register, errors, handleSubmit } = useForm({
        reValidateMode: "onBlur"
    });

    const [showPassword1, setshowPassword1] = useState(false)
    const [showPassword2, setshowPassword2] = useState(false)

    const [name, setName] = useState('')
    const [family_name, setFamilyname] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const onSubmit = (data, e)=>{
        console.log({name, family_name, password1, password2})
        e.preventDefault()
        const attributes = {
            name,
            family_name
        }
        props.onSubmit(password1, password2, attributes)
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
                            <InputLabel htmlFor="component-outlined">Name</InputLabel>
                            <OutlinedInput 
                                id="name" 
                                name="name"
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                label="name" 
                                inputComponent="input"
                                type="text"
                                inputRef={
                                    register({
                                        required: {value: true, message: 'Required field'}
                                    })
                                }
                            />
                            { errors.name ? ( <FormHelperText error > {errors.name.message} </FormHelperText> ) : null 
                            }
                        </FormControl> 
                        <FormControl className={classes.form} noValidate variant="outlined" >
                            <InputLabel htmlFor="component-outlined">Family name</InputLabel>
                            <OutlinedInput 
                                id="family_name" 
                                name="family_name"
                                value={family_name} 
                                onChange={e => setFamilyname(e.target.value)} 
                                label="family_name" 
                                inputComponent="input"
                                type="text"
                                inputRef={
                                    register({
                                        required: {value: true, message: 'Required field'}
                                    })
                                }
                            />
                            { errors.family_name ? ( <FormHelperText error > {errors.family_name.message} </FormHelperText> ) : null 
                            }
                        </FormControl> 
                        <FormControl className={classes.form} noValidate variant="outlined" >
                            <InputLabel htmlFor="component-outlined">New password</InputLabel>
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
                            { errors.new_password ? ( <FormHelperText error > {errors.new_password.message} </FormHelperText> ) : null 
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

export default NewPassword
