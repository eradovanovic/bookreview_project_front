import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import _ from 'lodash';
import Box from "@mui/material/Box";
import {Button, Paper, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {PhotoCamera} from "@mui/icons-material";
import api from 'api/api';
import classes from "./NewAuthor.module.scss";


const initialState = {
    "name": {
        "value": "",
        "error": false,
        "required": true
    },
    "surname": {
        "value": "",
        "error": false,
        "required": false
    },
    "biography": {
        "value": "",
        "error": false,
        "required": false
    },
    "photo": {
        "value": "",
        "error": false,
        "required": false
    }
}

const NewAuthor = () => {
    const [formState, setFormState] = useState(_.cloneDeep(initialState));
    const [errorMessage, setErrorMessage] = useState("");
    const [imgFile, setImgFile] = useState();
    const navigate = useNavigate();

    const inputHandler = event => {
        const {name, value, files} = event.target;
        const error = formState[name].required && value.trim() === "" ;
        if (name === 'photo') {
            setImgFile(files[0]);
        }
        const val = name === 'photo' ? files[0].name : value;
        setFormState( prevState => ({
            ...prevState,
            [name] : {"value": val, "error": error}
        }))
    }

    const addAuthorHandler = () => {
        let error = "";
        if (Object.values(formState).some(val => val.required && val.error) || Object.values(formState).some(val => val.required && !val.value)) {
            Object.values(formState).forEach(val => {
                if (val.required && !val.value && !val.error) val.error = true;
            });
            error = "Fill the required fields!";
        }
        if (!error ) {
            api.addAuthor(formState.name.value, formState.surname.value, formState.biography.value, imgFile).then(res => navigate('/authors'));
        }
        setErrorMessage(error);
    }

    return <Box sx={{height: '650px', display: 'flex', alignContent: 'center', alignItems: 'center', textAlign: 'center', justifyContent:' center', paddingTop: '20px', paddingBottom: '20px'}}>
        <Paper sx={{display: 'flex', width: '300px', alignContent: 'center', alignItems: 'center', textAlign: 'center', padding: '10px', justifyContent: 'center'}}>
            <Stack sx={{display: 'flex', width:'80%',  alignContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                <Typography variant="h6" sx={{padding: '10px'}}>Add author!</Typography>
                <TextField sx={{width: '100%', marginBottom: '10px'}} variant="outlined" error={formState.name.error} helperText={formState.name.error ? 'Name is required!' : ' '} label="Name" name="name" onChange={inputHandler}/>
                <TextField sx={{width: '100%', marginBottom: '10px'}} variant="outlined" error={formState.surname.error} helperText={formState.surname.error ? 'Surname is required!' : ' '} label="Surname" name="surname" onChange={inputHandler}/>
                <TextField
                    label="Biography"
                    name="biography"
                    multiline
                    onChange={inputHandler}
                    rows={7}
                    sx={{width: '100%', marginBottom: '20px'}}
                />
                <Button variant="outlined" color={formState.photo.error ? 'error' : 'primary'} component="label" sx={{marginBottom: '10px', borderRadius: '25px'}} startIcon={<PhotoCamera/>}>
                    <input hidden accept="image/*" type="file" name="photo" onChange={inputHandler}/>
                    Upload photo
                </Button>
                <Typography variant="caption">{formState.photo.value}</Typography>
                <Button sx={{width:'fit-content', margin: '5px', borderRadius: '25px'}} variant="text" onClick={addAuthorHandler} variant="contained">add author</Button>
                {errorMessage !== '' && <Typography sx={{color: '#d32f2f'}}>{errorMessage}</Typography>}
            </Stack>
        </Paper>
    </Box>
}

export default NewAuthor;