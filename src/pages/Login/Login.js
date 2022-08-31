import {Button, FormControl, Link, Paper, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "store/auth/authActions";
import classes from "./Login.module.scss";

const initialState = {
    "username": {
        "value": "",
        "error":false
    },
    "password": {
        "value": "",
        "error":false
    },
}

const Login = () => {
    const [formState, setFormState] = useState(initialState);
    const [loginSubmit, setLoginSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {user, token, error} = useSelector(state => state.authReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(loginSubmit){
            let error = "";
            if (formState['username'].error || formState['password'].error){
                error = "Please enter username and password!";
            }
            if (error === "") {
                dispatch(login(formState['username'].value, formState['password'].value));
            }
            setErrorMessage(error);
            setLoginSubmit(false);
        }
    }, [formState, loginSubmit]);

    useEffect(() => {
        if(user !== null) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            navigate('/');
        }
        else if (error !== '') {
            setErrorMessage('Login failed');
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

    const loginHandler = () => {
        updateField("username", formState["username"].value);
        updateField("password", formState["password"].value);
        setLoginSubmit(true);
    }

    return <Box sx={{height:'500px', display:'flex', alignContent:'center', alignItems:'center', textAlign:'center', justifyContent:'center', padding:'20px'}}>
        <Paper sx={{display: 'flex', alignContent:'center', alignItems:'center', textAlign:'center', padding:'10px', justifyContent:'center'}}>
            <Stack sx={{display:'flex', alignContent:'center', alignItems:'center', textAlign:'center'}}>
                <Typography variant="h6" sx={{padding: '10px'}}>Login!</Typography>
                <TextField error={formState["username"].error} helperText={formState["username"].error ? 'Username is required!' : ' '} label="Username" name="username" onChange={inputHandler} variant="filled"/>
                <TextField error={formState["password"].error} helperText={formState["password"].error ? 'Password is required!' : ' '} label="Password" name="password" type="password" onChange={inputHandler} variant="filled"/>
                <Button sx={{width:'fit-content', margin: '5px'}} variant="text" onClick={loginHandler}>login</Button>
                {errorMessage !== '' && <Typography sx={{color: '#d32f2f'}}>{errorMessage}</Typography>}
                <Typography>Don't have an account?<Link href="/register" color="#000">Register</Link>! </Typography>
            </Stack>
        </Paper>
    </Box>
}

export default Login;
