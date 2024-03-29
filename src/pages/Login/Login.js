import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import _ from 'lodash';
import {Button, Link, Paper, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {login} from "store/auth/authActions";
import classes from "./Login.module.scss";

const initialState = {
    "username": {
        "value": "",
        "error": false
    },
    "password": {
        "value": "",
        "error": false
    },
}

const Login = () => {
    const [formState, setFormState] = useState(_.cloneDeep(initialState));
    const [errorMessage, setErrorMessage] = useState('');
    const {user, error} = useSelector(state => state.authReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            navigate('/');
        }
        else if (Object.keys(error).length !== 0) {
            setErrorMessage(error.message ?? error);
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

    const loginHandler = () => {
        let error = "";
        if (Object.values(formState).some(val => val.error) || Object.values(formState).some(val => !val.value)) {
            Object.values(formState).forEach(val => {
                if (!val.value && !val.error) val.error = true;
            });
            error = "Please enter username and password!";
        }

        if (!error) {
            dispatch(login(formState.username.value, formState.password.value));
        }
        setErrorMessage(error);
    }

    return <Box sx={{height:'500px', display:'flex', alignContent:'center', alignItems:'center', textAlign:'center', justifyContent:'center', padding:'20px'}}>
        <Paper elevation={6} sx={{display: 'flex', width:'350px', alignContent:'center', alignItems:'center', textAlign:'center', padding:'10px', justifyContent:'center'}}>
            <Stack sx={{display:'flex', alignContent:'center', alignItems:'center', textAlign:'center'}}>
                <Typography variant="h6" sx={{padding: '10px'}}>Login!</Typography>
                <TextField error={formState.username.error} helperText={formState.username.error ? 'Username is required!' : ' '} label="Username" name="username" onChange={inputHandler} variant="outlined"/>
                <TextField error={formState.password.error} helperText={formState.password.error ? 'Password is required!' : ' '} label="Password" name="password" type="password" onChange={inputHandler} variant="outlined"/>
                <Button sx={{width:'fit-content', margin: '5px'}} variant="text" onClick={loginHandler}>login</Button>
                {errorMessage !== '' && <Typography sx={{color: '#d32f2f'}}>{errorMessage}</Typography>}
                <Typography>Don't have an account? <Link href="/register" color="#000">Register</Link>! </Typography>
            </Stack>
        </Paper>
    </Box>
}

export default Login;
