import * as React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Chip, Fab, Link, ListItem, Paper, Rating, Stack} from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DoneIcon from '@mui/icons-material/Done';
import {fetchBook} from "store/books/booksActions";
import api from "services/api/api";
import Review from "components/Review";
import NewReview from "components/NewReview";
import classes from "./BookDetails.module.scss";
import {REVIEW_TYPES} from "constants/constants";


const BookDetails = () => {
    let {id} = useParams();
    const dispatch = useDispatch();
    const currentBook = useSelector((state) => state.booksReducer.currentBook);
    const user = useSelector((state) => state.authReducer.user);
    const {title, author_id, author, description, photo, rating, genres, numberOfReviews} = currentBook;
    const [reviews, setReviews] = useState([]);
    const [newReviewForm, setNewReviewForm] = useState(false);
    const [reviewed, setReviewed] = useState(false);
    const [favorite, setFavorite] = useState(false);

    const discardHandler = () => setNewReviewForm(false);

    const getReviews = () => {
        api.getReviews(+id).then(res => {
            setReviews(res)
        });
        setNewReviewForm(false);
    }

    const reviewedFunc = reviewVal => setReviewed(reviewVal);

    const favoriteHandler = () => {
        if (!favorite) {
            api.addBookToCollection(+id, title, author, genres, rating, numberOfReviews, photo, description, user.username).then(res => setFavorite(true));
        }
        else {
            api.removeBookFromCollection(user.username, +id).then(res => setFavorite(false));
        }
    }

    useEffect(() => {
        if(id !== null){
            dispatch(fetchBook(+id));
            if (user && user.type === 'user'){
                api.checkIfReviewed(user.username, +id).then(res => {
                    if (res) {
                        setReviewed(true);
                    }
                });
                api.checkBookInCollection(user.username, +id).then(res => {
                    if(res && res.length > 0) {
                        setFavorite(true);
                    }
                })
            }
            getReviews();
        }
    }, [dispatch, id, user]);


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid className={classes.gridContainer} container columns={{ xs: 4, sm: 4, md: 12 }}>
                <Grid item xs={4} sm={4} md={3} height='100%' sx={{textAlign:'center'}}>
                    <img className={classes.thumbnailIMG} src={photo} height='100%' alt="Book Thumbnail"/>
                </Grid>
                <Grid item xs={4} sm={4} md={9} alignItems="center" justifyContent="center" height='100%' >
                    <Paper elevation={5} className={classes.paperStyle} sx={{borderRadius:'15px', height:'100%'}}>
                        <Box sx={{textAlign:'center', height: '85%'}}>
                            <Typography variant="h6">{title}</Typography>
                            <Link href={`/authors/${author_id}`} color="#000" underline="hover">
                                <Typography variant="subtitle1">{author}</Typography>
                            </Link>
                            {rating >= 0 && <Rating
                                name="text-feedback"
                                value={rating}
                                readOnly
                                size="small"
                                precision={0.5}
                                emptyIcon={<StarIcon fontSize="inherit"/>}
                            />}
                            <Typography variant="body1">
                                {description}
                            </Typography>
                            {genres && <Grid item sx={{ marginTop: '8px', marginBottom: '8px'}}>
                                {genres.map(genre => <Chip key={genre.id} size="small" sx={{marginRight: '5px', alignContent:'bottom'}} label={genre.name} variant="outlined" /> )}
                            </Grid>}
                        </Box>
                        <Stack direction="row" width="100%" margin="10px">
                            {user && user.type === 'user' && <Box display="flex" alignItems="flex-end" justifyContent="flex-end" margin="5px" marginRight="10px" width="100%">
                                <Fab size="small" aria-label="like" onClick={favoriteHandler}>
                                    <FavoriteIcon fontSize="small" sx={{color: favorite ? 'red' : 'inherit'}}/>
                                </Fab>
                            </Box>}
                        </Stack>
                    </Paper>
                </Grid>
                <Grid container item xs={12} sm={12} md={12} alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={12} md={12}>
                        <List>
                            <ListItem sx={{width:'100%'}}>
                                <Typography sx={{width: '30%'}} variant="h6">Reviews</Typography>
                                {user && user.type === 'user' && !newReviewForm && <Box sx={{width: '70%', textAlign: 'right'}}>
                                    {!reviewed && <Fab variant="extended" size="small" aria-label="add"
                                          onClick={() => setNewReviewForm(true)} sx={{margin: '10px', alignContent: 'right', alignItems: 'right', textAlign: 'right'}}>
                                        <AddIcon/>
                                        review
                                    </Fab>}
                                    {reviewed && <Fab variant="extended" disabled size="small" aria-label="add" sx={{margin: '10px', alignContent: 'right', alignItems: 'right', textAlign: 'right'}}>
                                        <DoneIcon/>
                                        reviewed
                                    </Fab>}
                                </Box>}
                            </ListItem>
                            <Divider/>
                            {newReviewForm && <NewReview book_id={+id} title={title} discardHandler={discardHandler} getReviews={getReviews} reviewed={reviewedFunc}/>}
                            {reviews && reviews.map(review =>
                                <Review key={review.id} reviewObj={review} type={user ? user.type: ''} reviewType={REVIEW_TYPES.BOOK_REVIEWS} getReviews={getReviews}/>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default BookDetails;
