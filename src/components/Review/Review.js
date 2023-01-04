import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Avatar, Link, Paper, Rating, Stack} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import api from 'services/api/api'
import {REVIEW_TYPES} from "constants/constants";
import classes from "./Review.module.scss";


const Review = ({reviewObj, type, getReviews, reviewType}) => {
    const {id, book_id, title, review, rating, username: user, avatar, date_reviewed} = reviewObj;
    const date = new Date(date_reviewed);
    const deleteHandler = () => {
        api.deleteReview(id).then(res => getReviews());
    }
    return <Box>
        <Paper elevation={4} className={classes.paperStyle} sx={{borderRadius:'15px', margin:'10px'}}>
            {reviewType === REVIEW_TYPES.USER_REVIEWS && <Stack direction="row" spacing={2}>
                <Link href={`/books/${book_id}`} color="#000" underline="hover" sx={{width: '100%'}}>
                    <Typography variant="h6">{title ?? 'something'}</Typography>
                </Link>
                <Box sx={{alignContent: 'right', textAlign: 'right', width: '100%'}}>
                    {type === 'admin' && <IconButton aria-label="delete" onClick={deleteHandler}>
                        <ClearIcon/>
                    </IconButton>}
                </Box>
            </Stack>}
            {reviewType === REVIEW_TYPES.BOOK_REVIEWS && <Stack direction="row" spacing={2}>
                <Avatar alt={user} src={avatar}/>
                <Link href={`/users/${user}`} color="#000" underline="hover">
                    <Typography variant="h6">{user}</Typography>
                </Link>
                <Box sx={{alignContent: 'right', textAlign: 'right', width: '100%'}}>
                    {type === 'admin' && <IconButton aria-label="delete" onClick={deleteHandler}>
                        <ClearIcon/>
                    </IconButton>}
                </Box>
            </Stack>}
            {reviewType === REVIEW_TYPES.HOMEPAGE_REVIEWS && <Box>
                <Stack direction="row" spacing={1} display="flex" alignItems="center">
                    <Link href={`/books/${book_id}`} color="#000" underline="hover" sx={{width: '100%'}}>
                        <Typography variant="h6">{title}</Typography>
                    </Link>
                    <Box sx={{alignContent: 'right', textAlign: 'right', width: '100%'}}>
                        {type === 'admin' && <IconButton aria-label="delete" onClick={deleteHandler}>
                            <ClearIcon/>
                        </IconButton>}
                    </Box>
                </Stack>
                <Stack direction="row" spacing={1} display="flex" alignItems="center">
                    <Avatar alt={user} src={avatar} sx={{width: 40, height: 40 }}/>
                    <Link href={`/users/${user}`} color="#000" underline="hover">
                        <Typography variant="subtitle1">{user}</Typography>
                    </Link>
                </Stack>
            </Box>}
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
        title: PropTypes.string,
        user: PropTypes.string,
        avatar: PropTypes.string,
        review: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        date_reviewed: PropTypes.string
    }),
    type: PropTypes.string,
    reviewType: PropTypes.string,
    getReviews: PropTypes.func
}


export default Review;
