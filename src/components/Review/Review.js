import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Avatar, Paper, Rating, Stack} from "@mui/material";
import classes from "pages/BookDetails/BookDetails.module.scss";
import StarIcon from "@mui/icons-material/Star";

const Review = (props) => {
    const { review, rating, user, avatar, date_reviewed } = props.review;
    const date = new Date(date_reviewed);
    return <Box>
        <Paper elevation={4} className={classes.paperStyle} sx={{borderRadius:'15px', margin:'10px'}}>
            <Stack direction="row" spacing={2}>
                <Avatar alt="Travis Howard" src={avatar} />
                <Typography variant="h6">{user}</Typography>
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

export default Review;