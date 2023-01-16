import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import Box from "@mui/material/Box";
import {Button, Checkbox, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Paper, Select, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import {PhotoCamera} from "@mui/icons-material";
import api from 'services/api/api';
import {DEFAULT_BOOK_PHOTO} from "constants/constants";


const initialState = {
    "title": {
        "value": "",
        "error": false,
        "required": true
    },
    "description": {
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        },
    },
};

const NewBook = () => {
    const [formState, setFormState] = useState(_.cloneDeep(initialState));
    const [errorMessage, setErrorMessage] = useState("");
    const [authors, setAuthors] = useState([]);
    const [names, setNames] = useState([]);
    const [authorId, setAuthorId] = useState('');
    const [authorError, setAuthorError] = useState(false);
    const [formGenres, setFormGenres] = useState({
        "value": [],
        "error": false
    });
    const [imgFile, setImgFile] = useState("");
    const navigate = useNavigate();



    useEffect(() => {
        api.getAllAuthors().then(res => setAuthors(res.authors));
        api.getGenres().then(res => setNames(res))
    }, []);

    const inputHandler = async event => {
        const {name, files, value} = event.target;
        const error = formState[name].required && value.trim() === "" ;
        if (name === 'photo') {
            setImgFile(files[0])
        }
        const val = name === 'photo' ? files[0].name : value;
        setFormState( prevState => ({
            ...prevState,
            [name] : {"value": val, "error": error, "required": prevState[name].required}
        }))
    }

    const addBookHandler = () => {
        let error = "";
        if (Object.values(formState).some(val => val.required && val.error) || Object.values(formState).some(val => val.required && !val.value)) {
            Object.values(formState).forEach(val => {
                if (val.required && !val.value && !val.error) val.error = true;
            });
            error = "Fill the required fields!"
        }
        if (!authorId){
            setAuthorError(true);
            error = "Fill the required fields!"
        }
        if (formGenres.value.length === 0){
            setFormGenres({value: formGenres.value, error: true});
            error = "Fill the required fields!"
        }
        if (!error ) {
            if (imgFile) {
                api.uploadPhoto(imgFile)
                    .then(res => {
                        console.log(res)
                        api.addBook(formState.title.value, authorId, formGenres.value, formState.description.value , res.data.url).then(res => navigate('/books'));
                    })
            } else {
                api.addBook(formState.title.value, authorId, formGenres.value, formState.description.value).then(res => navigate('/books'));
            }
        }
        setErrorMessage(error);
    }

    const genresHandler = event => {
        const {
            target: {value},
        } = event;
        const arrValues = typeof value === 'string' ? value.split(',') : value;
        let objGenres = [];
        arrValues.forEach(val => objGenres.push(names.find(n => n.name === val)));
        setFormGenres({
            value: objGenres,
            error: typeof value === 'string' ? value === "" : value.length === 0
            }
        );
    }

    const authorHandler = event => {
        setAuthorError(false);
        const {
            target: {value},
        } = event;
        setAuthorId(value);
    }

    return <Box sx={{height: '700px', display: 'flex', alignContent: 'center', alignItems: 'center', textAlign: 'center', justifyContent:' center', paddingTop: '20px', paddingBottom: '20px'}}>
        <Paper sx={{display: 'flex', width: '300px', alignContent: 'center', alignItems: 'center', textAlign: 'center', padding: '10px', justifyContent: 'center'}}>
            <Stack sx={{display: 'flex', width:'80%',  alignContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                <Typography variant="h6" sx={{padding: '10px'}}>Add book!</Typography>
                <TextField sx={{width: '100%', marginBottom: '10px'}} defaultValue={initialState.title.value} variant="outlined" error={formState.title.error} helperText={formState.title.error ? 'Title is required!' : ' '} label="Title" name="title" onChange={inputHandler}/>
                <FormControl  sx={{width: '100%', textAlign: 'left'}} error={authorError}>
                    <InputLabel id="demo-simple-select-label">Author</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={authorId}
                        label="Author"
                        onChange={authorHandler}
                    >
                        {authors.map(a => <MenuItem key={a.id} value={a.id}>{a.name} {a.surname}</MenuItem> )}
                    </Select>
                    <FormHelperText>{authorError ? "Author is required!": ' '}</FormHelperText>
                </FormControl>
                <FormControl sx={{width: '100%', margin: '10px', textAlign: 'left'}} error={formGenres.error}>
                    <InputLabel>Genres</InputLabel>
                    <Select
                        name="genres"
                        multiple
                        value={formGenres.value.map(val => val.name)} onChange={genresHandler} input={<OutlinedInput label="Genres"/>} renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps}>
                        {names.map(name => (
                            <MenuItem key={name.id} value={name.name}>
                                <Checkbox checked={formGenres.value.some(val => val.id === name.id)} />
                                <ListItemText primary={name.name} />
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{formGenres.error ? "Pick at least one genre!": ' '}</FormHelperText>
                </FormControl>
                <TextField
                    label="Description"
                    name="description"
                    multiline
                    onChange={inputHandler}
                    rows={7}
                    sx={{width: '100%', marginBottom: '20px'}}
                />
                <FormControl encType='multipart/form-data'>
                    <Button variant="outlined" component="label" sx={{marginBottom: '10px', borderRadius: '25px'}} startIcon={<PhotoCamera/>}>
                        <input hidden accept="image/*" type="file" name="photo" onChange={inputHandler}/>
                        Upload photo
                    </Button>
                </FormControl>
                <Typography variant="caption">{formState.photo.value}</Typography>
                <Button sx={{width:'fit-content', margin: '5px', borderRadius: '25px'}} onClick={addBookHandler} variant="contained">add book</Button>
                {errorMessage !== '' && <Typography sx={{color: '#d32f2f'}}>{errorMessage}</Typography>}
            </Stack>
        </Paper>
    </Box>
}

export default NewBook;
