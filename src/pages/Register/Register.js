import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import _ from 'lodash';
import Box from "@mui/material/Box";
import {Button, Link, Paper, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {register} from "store/auth/authActions";
import {emailValid, passwordValid} from "utils/validators";
import classes from "./Register.module.scss";

const initialState = {
    "name": {
        "value": "",
        "error": false
    },
    "surname": {
        "value": "",
        "error": false
    },
    "photo": {
        "value": "default",
        "error": false
    },
    "email": {
        "value": "",
        "error": false
    },
    "username": {
        "value": "",
        "error": false
    },
    "password": {
        "value": "",
        "error": false
    },
    "passwordConfirmation": {
        "value": "",
        "error": false
    }
}
const validate = (email, password, passwordConfirmation) => {
    let error = "";
    if (!emailValid(email)) {
        error = "This is not a valid format of email.";
    }
    else if (!passwordValid(password)) {
        error = "Password should contain numbers, uppercase and lowercase letters and special characters.";
    }
    else if (passwordConfirmation !== password) {
        error = "Passwords should match.";
    }
    return error;
}

const Register = () => {
    const [formState, setFormState] = useState(_.cloneDeep(initialState));
    const [errorMessage, setErrorMessage] = useState("");

    const {user, error} = useSelector(state => state.authReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(user !== null) {
            navigate('/');
        }
        else if (Object.keys(error).length !== 0) {
            setErrorMessage(error.message ? errorMessage : error);
        }
    }, [user, error]);

    const inputHandler = event => {
        const {name , value} = event.target;
        const error = value.trim() === "";
        setFormState( prevState => ({
            ...prevState,
            [name] : {"value": value, "error": error}
        }))
    }

    const registerHandler = () => {
        let error = "";
        if (Object.values(formState).some(val => val.error) || Object.values(formState).some(val => !val.value)) {
            Object.values(formState).forEach(val => {
                if (!val.value && !val.error) val.error = true;
            });
            error = "All fields are required!"
        }

        if (!error) error = validate(formState.email.value, formState.password.value, formState.passwordConfirmation.value);
        if (!error) {
            dispatch(register(formState.name.value, formState.surname.value, formState.email.value, formState.username.value, formState.password.value));
        }
        setErrorMessage(error);
    }

    return <Box sx={{height:'700px', display:'flex', alignContent:'center', alignItems:'center', textAlign:'center', justifyContent:'center', padding:'20px'}}>
        <Paper sx={{display: 'flex', width:'350px', alignContent:'center', alignItems:'center', textAlign:'center', padding:'10px', justifyContent:'center'}}>
            <Stack sx={{display:'flex', alignContent:'center', alignItems:'center', textAlign:'center'}}>
                <Typography variant="h6" sx={{padding: '10px'}}>Register!</Typography>
                    <TextField error={formState.name.error} helperText={formState.name.error ? 'Name is required!' : ' '} label="Name" name="name" onChange={inputHandler} variant="outlined"/>
                    <TextField error={formState.surname.error} helperText={formState.surname.error ? 'Surname is required!' : ' '} label="Surname" name="surname" type="text" onChange={inputHandler} variant="outlined"/>
                    <TextField error={formState.email.error} helperText={formState.email.error ? 'Email is required!' : ' '} label="Email" name="email" onChange={inputHandler} variant="outlined"/>
                    <TextField error={formState.username.error} helperText={formState.username.error ? 'Username is required!' : ' '} label="Username" name="username" onChange={inputHandler} variant="outlined"/>
                    <TextField error={formState.password.error} helperText={formState.password.error ? 'Password is required!' : ' '} label="Password" name="password" type="password" onChange={inputHandler} variant="outlined"/>
                    <TextField error={formState.passwordConfirmation.error} helperText={formState.passwordConfirmation.error ? 'Confirmation is required!' : ' '} label="Confirm password" name="passwordConfirmation" type="password" onChange={inputHandler} variant="outlined"/>
                <Button sx={{width:'fit-content', margin: '5px'}} variant="text" onClick={registerHandler}>register</Button>
                {errorMessage !== '' && <Typography sx={{color: '#d32f2f'}}>{errorMessage}</Typography>}
                <Typography>Have an account? <Link href="/login" color="#000">Log in</Link>!</Typography>
            </Stack>
        </Paper>
    </Box>
}

export default Register;
