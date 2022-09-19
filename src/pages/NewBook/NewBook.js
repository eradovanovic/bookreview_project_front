import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Button, Link, Paper, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {register} from "store/auth/authActions";
import {emailValid, passwordValid} from "utils/validators";
import classes from "./NewBook.module.scss";

const initialState = {
    "title": {
        "value": "",
        "error": false
    },
    "author": {
        "value": "",
        "error": false
    },
    "genres": {
        "value": [],
        "error": false
    },
    "description": {
        "value": "",
        "error": false
    },
    "photo": {
        "value": "default",
        "error": false
    }
}

const NewBook = () => {
    const [formState, setFormState] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");

    //const {user, token, error} = useSelector(state => state.authReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        if (!error) {
            dispatch(register(formState['name'].value, formState['surname'].value, formState['email'].value, formState['photo'].value, formState['username'].value, formState['password'].value));
        }
        setErrorMessage(error);
    }

    return <Box sx={{height:'700px', display:'flex', alignContent:'center', alignItems:'center', textAlign:'center', justifyContent:'center', padding:'20px'}}>
        <Paper sx={{display: 'flex', width:'350px', alignContent:'center', alignItems:'center', textAlign:'center', padding:'10px', justifyContent:'center'}}>
            <Stack sx={{display:'flex', alignContent:'center', alignItems:'center', textAlign:'center'}}>
                <Typography variant="h6" sx={{padding: '10px'}}>Add book!</Typography>
                <TextField error={formState.title.error} helperText={formState.title.error ? 'Title is required!' : ' '} label="Title" name="title" onChange={inputHandler} variant="filled"/>
                <TextField error={formState.author.error} helperText={formState.author.error ? 'Author is required!' : ' '} label="Author" name="author" onChange={inputHandler} variant="filled"/>
                <TextField error={formState.genres.error} helperText={formState.genres.error ? 'Genres are required!' : ' '} label="Genres" name="genres" onChange={inputHandler} variant="filled"/>
                <TextField error={formState.description.error} helperText={formState.description.error ? 'Description is required!' : ' '} label="Description" name="description" onChange={inputHandler} variant="filled"/>
                <TextField error={formState.photo.error} helperText={formState.photo.error ? 'Photo is required!' : ' '} label="Photo" name="photo" onChange={inputHandler} variant="filled"/>
                <Button sx={{width:'fit-content', margin: '5px'}} variant="text" onClick={registerHandler}>register</Button>
                {errorMessage !== '' && <Typography sx={{color: '#d32f2f'}}>{errorMessage}</Typography>}
                <Typography>Have an account?<Link href="/login" color="#000">Log in</Link>! </Typography>
            </Stack>
        </Paper>
    </Box>
}

export default NewBook;