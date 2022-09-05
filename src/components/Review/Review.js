import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Avatar, Paper, Rating, Stack} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import api from 'api/api'
import classes from "./Review.module.scss";


const Review = ({reviewObj, type, getReviews}) => {
    const {id, review, rating, user, avatar, date_reviewed} = reviewObj;
    const date = new Date(date_reviewed);

    const deleteHandler = () => {
        api.deleteReview(id).then(res => getReviews());
    }
    return <Box>
        <Paper elevation={4} className={classes.paperStyle} sx={{borderRadius:'15px', margin:'10px'}}>
            <Stack direction="row" spacing={2}>
                <Avatar alt="Travis Howard" src={avatar} />
                <Typography variant="h6">{user}</Typography>
                <Box sx={{alignContent:'right', textAlign:'right', width:'100%'}}>
                    {type === 'admin' && <IconButton aria-label="delete" onClick={deleteHandler}>
                        <ClearIcon />
                    </IconButton>}
                </Box>
            </Stack>
            {rating && <Rating
                name="text-feedback"
                value={rating}
                readOnly
                precision={0.5}
                size="small"
                emptyIcon={<StarIcon fontSize="inherit"/>}
            /> }
            <Typography variant="caption" display="block" gutterBottom>
                {date.getMonth()+1}-{date.getDate()}-{date.getFullYear()} {date.getHours()}:{date.getMinutes()}
            </Typography>
            <Typography variant="body1">
                {review}
            </Typography>
        </Paper>
    </Box>
}

Review.propTypes = {
    reviewObj: PropTypes.shape({
        id: PropTypes.number.isRequired,
        book_id: PropTypes.number,
        user: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        review: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        date_reviewed: PropTypes.string.isRequired
    }),
    type: PropTypes.string,
    getReviews: PropTypes.func
}


export default Review;