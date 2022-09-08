import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Badge, Button, ListItem, Pagination, Paper, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import BookIcon from "@mui/icons-material/Book";
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {fetchAuthor} from "store/authors/authorsActions";
import api from 'api/api_authors';
import {BOOKS_PER_PAGE} from "constants/constants";
import Book from 'components/Book';
import classes from "./AuthorDetails.module.scss";

const initialState = {
    "name": {
        "value": "",
        "error": false
    },
    "surname": {
        "value": "",
        "error": false
    },
    "photo": {
        "value": "default",
        "error": false
    },
    "biography": {
        "value": "",
        "error": false
    }
}

const AuthorDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const currentAuthor = useSelector((state) => state.authorsReducer.currentAuthor);
    const user = useSelector((state) => state.authReducer.user);
    const [books, setBooks] = useState([]);
    const [editable, setEditable] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'));
    const matchesSM= useMediaQuery(theme.breakpoints.up('sm'));
    const [formState, setFormState] = useState(initialState);
    const {name, surname, biography, photo} = currentAuthor;

    let height;
    if (matchesMD) {
        height = '1550px';
    }
    else if (matchesSM) {
        height = '1550px';
    }
    else{
        height = '2750px';
    }

    useEffect(()=>{
        if(id != null ) {
            dispatch(fetchAuthor(+id));
            api.getBooksByAuthor(+id, page).then(res => {
                setBooks(res.books);
                setTotalPages(Math.ceil(res.total / BOOKS_PER_PAGE));
            })
        }
    }, [dispatch, id]);

    useEffect(() => {
        api.getBooksByAuthor(+id, page).then(res => {
            setBooks(res.books);
            setTotalPages(Math.ceil(res.total / BOOKS_PER_PAGE));
        });
    },[page]);

    useEffect(() => {
        setFormState(
            {
                "name": {
                    "value": name,
                    "error": false
                },
                "surname": {
                    "value": surname,
                    "error": false
                },
                "photo": {
                    "value": photo,
                    "error": false
                },
                "biography": {
                    "value": biography,
                    "error": false
                }
            }
       )
        api.getBooksByAuthor(+id, page).then(res => {
            setBooks(res.books);
            setTotalPages(Math.ceil(res.total / BOOKS_PER_PAGE));
        })
    }, [currentAuthor]);

    const changeAuthorDataHandler = () => {
        api.changeAuthorData(+id, formState.name.value, formState.surname.value, formState.photo.value, formState.biography.value).then(res => {
            dispatch(fetchAuthor(res.id));
        })
        setEditable(false);
    }

    const inputHandler = event => {
        const {name , value} = event.target;
        const error = value.trim() === "";
        setFormState( prevState => ({
            ...prevState,
            [name] : {"value": value, "error": error}
        }))
    }

    const pageHandler = (event, value) => {
        setPage(value);
        api.getBooksByAuthor(+id, page).then(res => {
            setBooks(res.books);
        });
    }

    return (
        <Box>
            <Box className={classes.gridContainerAuthor}>
                <Paper elevation={5} className={classes.paperStyle} sx={{borderRadius:'15px', height:'100%'}}>
                    <Grid container columns={{xs: 12, sm: 12, md: 12}}>
                        <Grid item xs={12} sm={4} md={12}>
                            {user.type === "admin" && !editable && <IconButton color="inherit" aria-label="editAuthor" onClick={() => setEditable(true)} component="label">
                                <EditIcon/>
                            </IconButton>}
                            {!editable && <Stack spacing="10px" direction="column" sx={{flexGrow: 1, display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                                <Avatar alt="Author" src={photo} sx={{width: 80, height: 80}}/>
                                <Typography variant="h6">{name} {surname}</Typography>
                                <Typography variant="subtitle1" sx={{display: 'flex', alignItems: 'center'}}>
                                    <BookIcon/> 22 books</Typography>
                            </Stack>}
                            {editable && <Stack spacing="10px" direction="column" sx={{flexGrow: 1, display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                                <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={<IconButton color="inherit" aria-label="editAuthor" onClick={() => setEditable(true)} component="label" sx={{backgroundColor: 'white'}}>
                                        <PhotoCameraIcon />
                                    </IconButton>}>
                                    <Avatar alt="Author" src={photo} sx={{width: 80, height: 80}}/>
                                </Badge>
                                <TextField label="Name" name="name" defaultValue={name} onChange={inputHandler} variant="filled"/>
                                <TextField label="Surname" name="surname" defaultValue={surname} onChange={inputHandler} variant="filled"/>
                            </Stack>}
                        </Grid>
                        {!matchesMD && <Grid item xs={12} sm={8} md={12} className={classes.gridContainerAuthorBio}>
                            <Typography variant="h6">
                                Biography
                            </Typography>
                            <Divider/>
                            {!editable && <Typography variant="subtitle1">
                                {biography}
                            </Typography>}
                            {editable && <TextField
                                label="Biography"
                                name="biography"
                                multiline
                                rows={6}
                                onChange={inputHandler}
                                defaultValue={biography}
                                sx={{width: '100%', marginTop: '10px'}}
                            />}
                        </Grid>}
                        {editable && <Grid item xs={12} sm={12} md={12} sx={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                            <Button variant="contained" sx={{margin: '5px', borderRadius: '25px'}} onClick={changeAuthorDataHandler}>
                                Save changes
                            </Button>
                        </Grid>}
                    </Grid>
                </Paper>
            </Box>
            <Grid container columns={{xs: 12, sm: 12, md: 12}} className={classes.gridContainerAuthor} sx={{paddingTop: '15px'}}>
                {matchesMD && <Grid item md={3} sx={{paddingTop: '4px'}}>
                    <Stack direction="column" className={classes.paperStyle} >
                        <Typography variant="h6">
                            Biography
                        </Typography>
                        <Divider/>
                        {!editable && <Typography variant="subtitle1" sx={{marginTop: '30px'}}>
                            {biography}
                        </Typography>}
                        {editable && <TextField
                            label="Biography"
                            name="biography"
                            multiline
                            onChange={inputHandler}
                            defaultValue={biography}
                            rows={6}
                            sx={{width: '100%', marginTop: '30px'}}
                        />}
                    </Stack>
                </Grid>}
                <Grid item xs={12} sm={12} md={8}>
                    <List>
                        <ListItem>
                            <Typography variant="h6" sx={{textAlign:'center'}}>{name} {surname}'s books</Typography>
                        </ListItem>
                        <Divider/>
                        {books && books.length > 0 && books.map(book => <Book key={book.id} book={book}/>)}
                    </List>
                </Grid>
            </Grid>
            {books && books.length > 0 && <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" >
                <Grid item xs={3}>
                    <Pagination count={totalPages} page={page} onChange={pageHandler}/>
                </Grid>
            </Grid>}
        </Box>
    );
}

export default AuthorDetails;