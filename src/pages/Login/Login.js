import {Button, FormControl, Link, Paper, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchUser} from "store/auth/authActions";
import classes from "./Login.module.scss";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {loggedUser, loggedToken, error} = useSelector(state => state.authReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const usernameHandler = (event) => {
        setUsername(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const loginHandler = () => {
        if (username && password){
            dispatch(fetchUser(username, password));
        }
        else {
            setErrorMessage('Please enter username and password!');
        }
    }

    useEffect(() => {
        if(loggedUser !== null)
            navigate('/');
        else if (error !== '') {
            setErrorMessage('Login failed');
        }
    }, [loggedUser, error]);

    return <Box sx={{height:'500px', display:'flex', alignContent:'center', alignItems:'center', textAlign:'center', justifyContent:'center', padding:'20px'}}>
        <Paper sx={{display: 'flex', alignContent:'center', alignItems:'center', textAlign:'center', padding:'10px', justifyContent:'center'}}>
            <Stack sx={{display:'flex', alignContent:'center', alignItems:'center', textAlign:'center'}}>
                <Typography variant="h6" sx={{padding: '10px'}}>Login!</Typography>
                <FormControl>
                    <TextField
                        error={username === ""}
                        helperText={username === "" ? 'Username is required!' : ' '}
                        label="Username"
                        onChange={usernameHandler}
                        variant="filled"
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        error={password === ''}
                        helperText={password === ''? 'Password is required!' : ' '}
                        label="Password"
                        type="password"
                        onChange={passwordHandler}
                        variant="filled"
                    />
                </FormControl>
                <Button sx={{width:'fit-content', margin: '5px'}} variant="text" onClick={loginHandler}>login</Button>
                {errorMessage !== '' && <Typography sx={{color: '#d32f2f'}}>{errorMessage}</Typography>}
                <Typography>Don't have an account? Register <Link href="/register" color="#000">here</Link>! </Typography>
            </Stack>
        </Paper>
    </Box>
}

export default Login;
