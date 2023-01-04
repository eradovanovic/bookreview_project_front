import * as React from "react";
import {useSelector} from "react-redux";
import {useState} from "react";
import PropTypes from "prop-types";
import {Button, Paper, Rating, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import api from 'services/api/api'
import classes from './NewReview.module.scss'

const NewReview = ({book_id, title, discardHandler, getReviews, reviewed}) => {
    const user = useSelector((state) => state.authReducer.user);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [error, setError] = useState(false);

    const submitHandler = () => {
        setError(false);
        if (!rating) setError(true);
        else {
            api.addReview(user.username, book_id, rating, review).then(res => {
                reviewed(true);
                getReviews();
            });
        }
    }

    const reviewHandler = event => setReview(event.target.value);
    return <Box>
        <Paper elevation={4} className={classes.paperStyle} sx={{borderRadius:'15px', margin:'10px'}}>
            <Typography variant="h6">New review</Typography>
            <Rating
                name="hover-feedback"
                value={rating}
                precision={0.5}
                onChange={(event, newRating) => {
                    setRating(newRating);
                }}
                emptyIcon={<StarIcon fontSize="inherit"/>}
            />
            <TextField
                label="Write your review"
                multiline
                rows={4}
                onChange={reviewHandler}
                sx={{width: '100%', marginTop: '10px'}}
            />
            <Box sx={{textAlign: 'right', marginTop: '10px'}}>
                <Button sx={{margin: '5px', borderRadius: '25px'}} onClick={discardHandler}>
                    Discard
                </Button>
                <Button variant="contained" sx={{margin: '5px', borderRadius: '25px'}} onClick={submitHandler}>
                    Add review
                </Button>
            </Box>
            {error && <Typography sx={{color: '#d32f2f'}}>Please rate the book!</Typography>}
        </Paper>
    </Box>
}

NewReview.propTypes = {
    book_id: PropTypes.number,
    title: PropTypes.string,
    discardHandler: PropTypes.func,
    getReviews: PropTypes.func,
    reviewed: PropTypes.func
}

export default NewReview;
