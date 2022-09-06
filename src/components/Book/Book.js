import * as React from "react";
import PropTypes from 'prop-types';
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Button, Chip, Fab, Link, Paper, Rating, Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from '@mui/icons-material/Star';
import api from 'api/api'
import classes from "./Book.module.scss";

const Book = ({book, getCollection}) => {
    const navigate = useNavigate();
    const {id, title, author, genres, photo, description, rating, numberOfReviews} = book;
    const user = useSelector(state => state.authReducer.user);
    const location = useLocation();
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        if(user && user.type === 'user'){
            api.checkBookInCollection(user.username, id).then(res => {
                if(res && res.length > 0) setFavorite(true);
            })
        }
    }, [])

    const favoriteHandler = () => {
        if (location.pathname === '/books' && favorite) {
            api.removeBookFromCollection(user.username, id).then(res => setFavorite(false));
        }
        else if (location.pathname === '/books' && !favorite) {
            api.addBookToCollection(id, title, author, genres, rating, numberOfReviews, photo, description, user.username).then(res => setFavorite(true));
        }
        else if (location.pathname === '/collections/id'){
            api.removeBookFromCollection(user.username, id).then(res => getCollection());
        }
    }
    return <Paper elevation={5} className={classes.paperStyle} sx={{margin:'30px', borderRadius:'15px', maxWidth:'800px'}}>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={4} md={4} sx={{textAlign:'center', padding:'0px'}}>
                <Button sx={{maxWidth:'150px', margin:'0px', padding:'0px'}} onClick={()=>{navigate(`/books/${id}`)}}>
                    <img className={classes.thumbnailIMG} src={photo} width="100%" alt="Book Thumbnail"/>
                </Button>
            </Grid>
            <Grid item xs={4} sm={4} md={8} height="100%" alignItems="center" justifyContent="center" paddingTop="30px" >
                <Box className={classes.paperStyle}>
                    <Typography variant="h6">{title}</Typography>
                    <Link href="/authors/detail" color="#000" underline="hover">
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
                        {genres.map(genre => <Chip key={genre.id} size="small" sx={{marginRight: '5px'}} label={genre.name} variant="outlined" /> )}
                    </Grid>
                </Box>
                <Stack direction="row" width="100%">
                    {user && user.type === 'user' && <Box display="flex" alignItems="flex-end" justifyContent="flex-end" margin="5px" marginRight="10px" width="100%">
                        <Fab size="small" aria-label="like" onClick={favoriteHandler}>
                            {location.pathname === '/books' && <FavoriteIcon fontSize="small" sx={{color: favorite ? 'red' : 'inherit'}}/>}
                            {location.pathname === '/collections/id' && <DeleteIcon fontSize="small"/>}
                        </Fab>
                    </Box>}
                </Stack>
            </Grid>
        </Grid>
    </Paper>
}

Book.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        genres: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })),
        photo: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        numberOfReviews: PropTypes.number
    }),
    getCollection: PropTypes.func
}

export default Book;