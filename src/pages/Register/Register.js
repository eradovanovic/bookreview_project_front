import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchUser} from "store/auth/authActions";
import Box from "@mui/material/Box";
import {Button, FormControl, Paper, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import classes from "./Register.module.scss";

const Register = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameFocused, setNameFocused] = useState(false);
    const [surnameFocused, setSurnameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {currentUser, currentToken, error} = useSelector(state => state.authReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const usernameHandler = (event) => {
        setUsername(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const confirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    const nameHandler = (event) => {
        setName(event.target.value);
    }

    const surnameHandler = (event) => {
        setSurname(event.target.value);
    }

    const emailHandler = (event) => {
        setEmail(event.target.value);
    }

    const registerHandler = () => {
        setNameFocused(true);
        setSurnameFocused(true);
        setEmailFocused(true);
        setUsernameFocused(true);
        setPasswordFocused(true);
        setConfirmPasswordFocused(true);
        if (name && surname && email && username && password && confirmPassword){
            dispatch(fetchUser(username, password));
        }
        else {
            setErrorMessage('Please enter all required fields!');
        }
    }

    useEffect(() => {
        if(currentUser !== null)
            navigate('/');
        else if (error !== '') {
            setErrorMessage('Registration failed!');
        }
    }, [currentUser, error]);

    return <Box sx={{height:'700px', display:'flex', alignContent:'center', alignItems:'center', textAlign:'center', justifyContent:'center', padding:'20px'}}>
        <Paper sx={{display: 'flex', alignContent:'center', alignItems:'center', textAlign:'center', padding:'10px', justifyContent:'center'}}>
            <Stack sx={{display:'flex', alignContent:'center', alignItems:'center', textAlign:'center'}}>
                <Typography variant="h6" sx={{padding: '10px'}}>Register!</Typography>
                <FormControl>
                    <TextField
                        error={nameFocused && name === ""}
                        helperText={nameFocused && name === "" ? 'Name is required!' : ' '}
                        label="Name"
                        onChange={nameHandler}
                        onFocus={() => setNameFocused(true)}
                        variant="filled"
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        error={surnameFocused && surname === ""}
                        helperText={surnameFocused && surname === ""? 'Surname is required!' : ' '}
                        label="Surname"
                        type="text"
                        onChange={surnameHandler}
                        onFocus={() => setSurnameFocused(true)}
                        variant="filled"
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        error={emailFocused && email === ""}
                        helperText={emailFocused && email === "" ? 'Email is required!' : ' '}
                        label="Email"
                        onChange={emailHandler}
                        onFocus={() => setEmailFocused(true)}
                        variant="filled"
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        error={usernameFocused && username === ""}
                        helperText={usernameFocused && username === "" ? 'Username is required!' : ' '}
                        label="Username"
                        onChange={usernameHandler}
                        onFocus={() => setUsernameFocused(true)}
                        variant="filled"
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        error={passwordFocused && password === ''}
                        helperText={passwordFocused && password === ''? 'Password is required!' : ' '}
                        label="Password"
                        type="password"
                        onChange={passwordHandler}
                        onFocus={() => setPasswordFocused(true)}
                        variant="filled"
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        error={confirmPasswordFocused && confirmPassword === ''}
                        helperText={confirmPasswordFocused && confirmPassword === ''? 'Password is required!' : ' '}
                        label="Confirm password"
                        type="password"
                        onChange={confirmPasswordHandler}
                        onFocus={() => setConfirmPasswordFocused(true)}
                        variant="filled"
                    />
                </FormControl>
                <Button sx={{width:'fit-content', margin: '5px'}} variant="text" onClick={registerHandler}>register</Button>
                {errorMessage !== '' && <Typography sx={{color: '#d32f2f'}}>{errorMessage}</Typography>}
            </Stack>
        </Paper>
    </Box>
}

export default Register;