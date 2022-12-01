import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import _ from 'lodash';
import Box from "@mui/material/Box";
import {Button, Link, Paper, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import api_auth from "api/api_auth";
import {logout} from "store/auth/authActions";
import {passwordValid} from "utils/validators";
import classes from "./ChangePassword.module.scss";

const initialState = {
    "oldPassword": {
        "value": "",
        "error": false
    },
    "newPassword": {
        "value": "",
        "error": false
    },
    "newPasswordConfirmation": {
        "value": "",
        "error": false
    }
}


const ChangePassword = () => {
    const [formState, setFormState] = useState(_.cloneDeep(initialState));
    const [errorMessage, setErrorMessage] = useState("");
    const [changed, setChanged] = useState(false);

    const {user} = useSelector(state => state.authReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = (newPassword, newPasswordConfirmation) => {
        let error = "";
        if (!passwordValid(newPassword)) {
            error = "Password should contain numbers, uppercase and lowercase letters and special characters!";
        }
        else if (newPasswordConfirmation !== newPassword) {
            error = "Passwords should match!";
        }
        return error;
    }

    const inputHandler = event => {
        const {name , value} = event.target;
        const error = value.trim() === "";
        setFormState( prevState => ({
            ...prevState,
            [name] : {"value": value, "error": error}
        }))
    }

    const changePasswordHandler = () => {
        let validationError = "";
        if (Object.values(formState).some(val => val.error) || Object.values(formState).some(val => !val.value)) {
            Object.values(formState).forEach(val => {
                if (!val.value && !val.error) val.error = true;
            });
            validationError = "All fields are required!"
        }
        if (!validationError) validationError = validate(formState.newPassword.value, formState.newPasswordConfirmation.value);
        if (!validationError) {
            api_auth.changePassword(user.username, formState.oldPassword.value, formState.newPassword.value).then(res => {
                dispatch(logout());
                setChanged(true);
                setTimeout(() => navigate('/login'), 1000)
            }).catch(error => setErrorMessage(error.message));
        }
        else{
            setErrorMessage(validationError);
        }
    }

    return <Box sx={{height:'700px', display:'flex', alignContent:'center', alignItems:'center', textAlign:'center', justifyContent:'center', padding:'20px'}}>
        {!changed && <Paper sx={{
            display: 'flex',
            width: '350px',
            alignContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '10px',
            justifyContent: 'center'
        }}>
            <Stack sx={{
                display: 'flex',
                width: '250px',
                alignContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <Typography variant="h6" sx={{padding: '10px'}}>Change password!</Typography>
                <TextField sx={{width: '80%'}} error={formState.oldPassword.error}
                           helperText={formState.oldPassword.error ? 'Old password is required!' : ' '}
                           label="Old password" name="oldPassword" type="password" onChange={inputHandler}
                           variant="outlined"/>
                <TextField sx={{width: '80%'}} error={formState.newPassword.error}
                           helperText={formState.newPassword.error ? 'New password is required!' : ' '}
                           label="New password" name="newPassword" type="password" onChange={inputHandler}
                           variant="outlined"/>
                <TextField sx={{width: '80%'}} error={formState.newPasswordConfirmation.error}
                           helperText={formState.newPasswordConfirmation.error ? 'Confirmation is required!' : ' '}
                           label="Confirm new password" name="newPasswordConfirmation" type="password"
                           onChange={inputHandler} variant="outlined"/>
                <Button sx={{width: 'fit-content', margin: '5px'}} variant="text" onClick={changePasswordHandler}>change
                    password</Button>
                {errorMessage !== '' && <Typography sx={{color: '#d32f2f'}}>{errorMessage}</Typography>}
            </Stack>
        </Paper>}
        {changed && <Box>
            <Typography variant="h6">Successfully changed password!</Typography>
            <Typography variant="subtitle1">Redirecting to login page!</Typography>
        </Box>}
    </Box>
}

export default ChangePassword;