import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Button, FormControl, Paper, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {addUser} from "store/auth/authActions";
import {emailValid, passwordValid} from "utils/validators";
import classes from "./Register.module.scss";

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const {registeredUser, registeredToken, error} = useSelector(state => state.authReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const usernameHandler = (event) => {
        setUsername(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const confirmPasswordHandler = (event) => {
        setPasswordConfirmation(event.target.value);
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

    const validate = (email, password, passwordConfirmation) => {
        let error = "";
        if (!name.trim() || !surname.trim() || !email.trim() || !username.trim() || !password.trim() || !passwordConfirmation.trim()){
            error = "All fields are required.";
        }
        else if (!emailValid(email)) {
            error = "This is not a valid format of email.";
        }
        else if (!passwordValid(password)) {
            error = "Password should contain numbers, uppercase and lowercase letters and special characters.";
        }
        else if (passwordConfirmation !== password) {
            error = "Passwords should match.";
        }
        setErrorMessage(error);
        return error === "";
    }

    const registerHandler = () => {validate(email, password, passwordConfirmation);
        if (validate(email, password, passwordConfirmation)){
            dispatch(addUser(name, surname, email, photo, username, password));
        }
    }

    useEffect(() => {
        if(registeredUser !== null)
            navigate('/');
        else if (error !== '') {
            setErrorMessage('Registration failed.');
        }
    }, [registeredUser, error]);

    return <Box sx={{height:'700px', display:'flex', alignContent:'center', alignItems:'center', textAlign:'center', justifyContent:'center', padding:'20px'}}>
        <Paper sx={{display: 'flex', minWidth:'290px', alignContent:'center', alignItems:'center', textAlign:'center', padding:'10px', justifyContent:'center'}}>
            <Stack sx={{display:'flex', alignContent:'center', alignItems:'center', textAlign:'center'}}>
                <Typography variant="h6" sx={{padding: '10px'}}>Register!</Typography>
                    <TextField
                        error={name === ""}
                        helperText={name === "" ? 'Name is required!' : ' '}
                        label="Name"
                        onChange={nameHandler}
                        variant="filled"
                    />
                    <TextField
                        error={surname === ""}
                        helperText={surname === ""? 'Surname is required!' : ' '}
                        label="Surname"
                        type="text"
                        onChange={surnameHandler}
                        variant="filled"
                    />
                    <TextField
                        error={email === ""}
                        helperText={email === "" ? 'Email is required!' : ' '}
                        label="Email"
                        onChange={emailHandler}
                        variant="filled"
                    />
                    <TextField
                        error={username === ""}
                        helperText={username === "" ? 'Username is required!' : ' '}
                        label="Username"
                        onChange={usernameHandler}
                        variant="filled"
                    />
                    <TextField
                        error={password === ''}
                        helperText={password === ''? 'Password is required!' : ' '}
                        label="Password"
                        type="password"
                        onChange={passwordHandler}
                        variant="filled"
                    />
                    <TextField
                        error={passwordConfirmation === ''}
                        helperText={passwordConfirmation === ''? 'Password is required!' : ' '}
                        label="Confirm password"
                        type="password"
                        onChange={confirmPasswordHandler}
                        variant="filled"
                    />
                <Button sx={{width:'fit-content', margin: '5px'}} variant="text" onClick={registerHandler}>register</Button>
                {errorMessage !== '' && <Typography sx={{color: '#d32f2f'}}>{errorMessage}</Typography>}
            </Stack>
        </Paper>
    </Box>
}

export default Register;