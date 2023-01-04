import * as React from "react";
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Button, Chip, Fab, Link, Paper, Rating, Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import StarIcon from '@mui/icons-material/Star';
import api from 'services/api/api';
import {DEFAULT_BOOK_PHOTO, LIST_TYPES} from "constants/constants";
import classes from "./Book.module.scss";

const Book = ({book, getCollection, type}) => {
    const navigate = useNavigate();
    const {id, title, author_id, name, surname, genres, photo, description, rating, number_of_reviews: numberOfReviews, photoFile} = book;
    const author = name + ' ' + surname
    const user = useSelector(state => state.authReducer.user);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        if(user && user.type === 'user'){
            api.checkBookInCollection(user.username, id).then(res => {
                if (res) {
                    setFavorite(true);
                }
            })
        }
    }, [])

    const favoriteHandler = () => {
        if (type === LIST_TYPES.BOOK_LIST && favorite) {
            api.removeBookFromCollection(user.username, id).then(res => setFavorite(false));
        }
        else if (type === LIST_TYPES.BOOK_LIST && !favorite) {
            api.addBookToCollection(id, title, author, genres, rating, numberOfReviews, photo, description, user.username).then(res => setFavorite(true));
        }
        else if (type === LIST_TYPES.COLLECTION){
            api.removeBookFromCollection(user.username, id).then(res => getCollection());
        }
    }

    return <Paper elevation={5} className={classes.paperStyle} sx={{margin:'15px', borderRadius:'15px', maxWidth:'800px'}}>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={4} md={4} sx={{textAlign:'center', padding:'0px'}}>
                <Button sx={{maxWidth:'150px', margin:'0px', padding:'0px'}} onClick={() => {navigate(`/books/${id}`)}}>
                    <img className={classes.thumbnailIMG} src={photo ? photo : DEFAULT_BOOK_PHOTO} width="100%" alt="Book Thumbnail"/>
                </Button>
            </Grid>
            <Grid item xs={4} sm={4} md={8} height="100%" alignItems="center" justifyContent="center" paddingTop="30px" >
                <Box className={classes.paperStyle}>
                    <Typography variant="h6">{title}</Typography>
                    <Link href={`/authors/${author_id}`} color="#000" underline="hover">
                        <Typography variant="subtitle1">{author}</Typography>
                    </Link>
                    <Rating
                        name="text-feedback"
                        value={rating}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon fontSize="inherit" />}
                    />
                    <Grid item>
                        {genres?.map(genre => <Chip key={genre.id} size="small" sx={{marginRight: '5px'}} label={genre.name} variant="outlined" /> )}
                    </Grid>
                </Box>
                <Stack direction="row" spacing={2} width="100%" display="flex" alignItems="center" justifyContent="flex-end" margin="5px" marginRight="10px">
                    <Stack direction="row" spacing={0.5} display="flex" alignItems="center" margin="5px">
                        <ChatBubbleRoundedIcon style={{color: 'grey'}}/>
                        <Typography variant="subtitle1">{numberOfReviews}</Typography>
                    </Stack>
                    {user && user.type === 'user' && <Fab size="small" aria-label="like" onClick={favoriteHandler}>
                            {type === LIST_TYPES.BOOK_LIST && <FavoriteIcon fontSize="small" sx={{color: favorite ? 'red' : 'inherit'}}/>}
                            {type === LIST_TYPES.COLLECTION && <DeleteIcon fontSize="small"/>}
                        </Fab>}
                </Stack>
            </Grid>
        </Grid>
    </Paper>
}

Book.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        genres: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })),
        photo: PropTypes.string.isRequired,
        photoFile: PropTypes.string,
        rating: PropTypes.number.isRequired,
        numberOfReviews: PropTypes.number
    }),
    type: PropTypes.string.isRequired,
    getCollection: PropTypes.func
}

export default Book;
