import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, ListItem, Paper, Stack} from "@mui/material";
import {useEffect, useState} from "react";import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from "@mui/material/Divider";
import BookIcon from "@mui/icons-material/Book";
import EditIcon from '@mui/icons-material/Edit';
import {fetchAuthor} from "store/authors/authorsActions";
import api from 'api/api_authors';
import Book from 'components/Book'
import classes from "./AuthorDetails.module.scss";

const AuthorDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const currentAuthor = useSelector((state) => state.authorsReducer.currentAuthor);
    const user = useSelector((state) => state.authReducer.user);
    const [books, setBooks] = useState([]);
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'));

    const {name, surname, biography, photo} = currentAuthor;

    useEffect(()=>{
        if(id != null ) {
            dispatch(fetchAuthor(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        api.getBooksByAuthor(+id).then(res => {
            setBooks(res);
        })
    }, [currentAuthor]);

    return (
        <Box>
            <Box className={classes.gridContainerAuthor}>
                <Paper elevation={5} className={classes.paperStyle} sx={{borderRadius:'15px', height:'100%'}}>
                    <Grid container columns={{xs: 12, sm: 12, md: 12}}>
                        <Grid item xs={12} sm={4} md={12}>
                            {user.type === "admin" && <EditIcon/>}
                            <Stack spacing="10px" direction="column" sx={{ flexGrow: 1, display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                                <Avatar alt="Author" src={photo} sx={{width: 80, height: 80}}/>
                                <Typography variant="h6">{name} {surname}</Typography>
                                <Typography variant="subtitle1" sx={{display: 'flex', alignItems:'center'}}> <BookIcon/> 22 books</Typography>
                            </Stack>
                        </Grid>
                        {!matchesMD && <Grid item xs={12} sm={8} md={12} className={classes.gridContainerAuthorBio}>
                            <Typography variant="h6">
                                Biography
                            </Typography>
                            <Divider/>
                            <Typography variant="subtitle1">
                                {biography}
                            </Typography>
                        </Grid>}
                    </Grid>
                </Paper>
            </Box>
            <Grid container columns={{xs: 12, sm: 12, md: 12}} className={classes.gridContainerAuthor}  sx={{paddingTop: '15px'}}>
                {matchesMD && <Grid item md={3} sx={{paddingTop: '4px'}}>
                    <Stack direction="column" className={classes.paperStyle} >
                        <Typography variant="h6">
                            Biography
                        </Typography>
                        <Divider/>
                        <Typography variant="subtitle1">
                            {biography}
                        </Typography>
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

        </Box>
    );
}

export default AuthorDetails;