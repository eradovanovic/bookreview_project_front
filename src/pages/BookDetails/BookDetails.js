import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import {Chip, Link, ListItem, Paper, Rating} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchBook} from "store/books/booksActions";
import StarIcon from "@mui/icons-material/Star";
import {getReviews} from "api/api";
import Review from "components/Review";
import classes from "./BookDetails.module.scss";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";



const BookDetails = () => {
    let {id} = useParams();
    const dispatch = useDispatch();
    const currentBook = useSelector((state) => state.booksReducer.currentBook);
    const {title, author, description, photo, rating, genres} = currentBook;
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        if(id != null){
            dispatch(fetchBook(id));
            getReviews(id).then(res =>
                setReviews(res)
            )
        }
    }, [dispatch, id]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid className={classes.gridContainer} container columns={{ xs: 4, sm: 4, md: 12 }}>
                <Grid item xs={4} sm={4} md={3} height='100%' sx={{textAlign:'center'}}>
                    <img className={classes.thumbnailIMG} src={photo} height='100%' alt="Book Thumbnail"/>
                </Grid>
                <Grid item xs={4} sm={4} md={9} alignItems="center" justifyContent="center" height='100%' sx={{textAlign:'center', height: '100%'}}>
                    <Paper elevation={5} className={classes.paperStyle} sx={{borderRadius:'15px', height:'100%'}}>
                        <Typography variant="h6">{title}</Typography>

                        <Link href="/authors/detail" color="#000" underline="hover">
                            <Typography variant="subtitle1">{author}</Typography>
                        </Link>
                        { rating && <Rating
                            name="text-feedback"
                            value={rating}
                            readOnly
                            size="small"
                            precision={0.5}
                            emptyIcon={<StarIcon fontSize="inherit"/>}
                        /> }
                        <Typography variant="body1">
                            {description}
                        </Typography>
                        { genres && <Grid item sx={{ marginTop: '8px', marginBottom: '8px', }}>
                            {genres.map((genre) => <Chip key={genre} size="small" sx={{marginRight: '5px', alignContent:'bottom'}} label={genre} variant="outlined" /> )}
                        </Grid> }
                    </Paper>
                </Grid>
                <Grid
                    container
                    item
                    xs={12} sm={12} md={12}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={12} sm={12} md={12}>
                        <List>
                            <ListItem>
                                <Typography variant="h6" sx={{textAlign:'center'}}>Reviews</Typography>
                            </ListItem>
                            <Divider/>
                            {reviews && reviews.map(review =>
                                <Review key={review.id} review={review}/>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default BookDetails;