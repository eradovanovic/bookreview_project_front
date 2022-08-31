import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Button, Link, Paper, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {register} from "store/auth/authActions";
import {emailValid, passwordValid} from "utils/validators";
import classes from "./Register.module.scss";

const initialState = {
    "name": {
        "value": "",
        "error":false
    },
    "surname": {
        "value": "",
        "error":false
    },
    "photo": {
        "value": "",
        "error":false
    },
    "email": {
        "value": "",
        "error":false
    },
    "username": {
        "value": "",
        "error":false
    },
    "password": {
        "value": "",
        "error":false
    },
    "passwordConfirmation": {
        "value": "",
        "error":false
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
    const [formState, setFormState] = useState(initialState);
    const [registrationSubmit, setRegistrationSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {user, token, error} = useSelector(state => state.authReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if(registrationSubmit){
            let error = "";
            if (formState['name'].error || formState['surname'].error || formState['email'].error || formState['username'].error || formState['password'].error || formState['passwordConfirmation'].error){
                error = "All fields are required.";
            }

            if (error === "") error = validate(formState['email'].value, formState['password'].value, formState['passwordConfirmation'].value);
            if (error === "") {
                dispatch(register(formState['name'].value, formState['surname'].value, formState['email'].value, formState['photo'].value, formState['username'].value, formState['password'].value));
            }
            setErrorMessage(error);
            setRegistrationSubmit(false);
        }
    }, [formState, registrationSubmit]);

    useEffect(() => {
        if(user !== null) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            navigate('/');
        }
        else if (error !== '') {
            setErrorMessage('Registration failed.');
        }
    }, [user, error]);

    const updateField = (name, value) => {
        const error = value.trim() === "";
        setFormState( prevState => ({
            ...prevState,
            [name] : {"value": value, "error": error}
        }))
    }

    const inputHandler = event => {
        const {name , value} = event.target;
        updateField(name, value);
    }

    const registerHandler = () => {
        updateField("name", formState["name"].value);
        updateField("surname", formState["surname"].value);
        updateField("email", formState["email"].value);
        updateField("username", formState["username"].value);
        updateField("password", formState["password"].value);
        updateField("passwordConfirmation", formState["passwordConfirmation"].value);
        setRegistrationSubmit(true);
    }

    return <Box sx={{height:'700px', display:'flex', alignContent:'center', alignItems:'center', textAlign:'center', justifyContent:'center', padding:'20px'}}>
        <Paper sx={{display: 'flex', minWidth:'290px', alignContent:'center', alignItems:'center', textAlign:'center', padding:'10px', justifyContent:'center'}}>
            <Stack sx={{display:'flex', alignContent:'center', alignItems:'center', textAlign:'center'}}>
                <Typography variant="h6" sx={{padding: '10px'}}>Register!</Typography>
                    <TextField error={formState['name'].error} helperText={formState['name'].error ? 'Name is required!' : ' '} label="Name" name="name" onChange={inputHandler} variant="filled"/>
                    <TextField error={formState['surname'].error} helperText={formState['surname'].error ? 'Surname is required!' : ' '} label="Surname" name="surname" type="text" onChange={inputHandler} variant="filled"/>
                    <TextField error={formState['surname'].error} helperText={formState['surname'].error ? 'Email is required!' : ' '} label="Email" name="email" onChange={inputHandler} variant="filled"/>
                    <TextField error={formState['username'].error} helperText={formState['username'].error ? 'Username is required!' : ' '} label="Username" name="username" onChange={inputHandler} variant="filled"/>
                    <TextField error={formState['password'].error} helperText={formState['password'].error ? 'Password is required!' : ' '} label="Password" name="password" type="password" onChange={inputHandler} variant="filled"/>
                    <TextField error={formState['passwordConfirmation'].error} helperText={formState['passwordConfirmation'].error ? 'Confirmation is required!' : ' '} label="Confirm password" name="passwordConfirmation" type="password" onChange={inputHandler} variant="filled"/>
                <Button sx={{width:'fit-content', margin: '5px'}} variant="text" onClick={registerHandler}>register</Button>
                {errorMessage !== '' && <Typography sx={{color: '#d32f2f'}}>{errorMessage}</Typography>}
                <Typography>Have an account?<Link href="/login" color="#000">Log in</Link>! </Typography>
            </Stack>
        </Paper>
    </Box>
}

export default Register;