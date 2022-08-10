import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";
import classes from "./Book.module.scss";

const Book = (props) => {
    const {title, author, genres, photo, rating} = props.book;
    return <Paper sx={{flexGrow: 1, margin:'30px', paddingBottom: '10px', alignContent:'center'}}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>
            <Grid item xs={4} sm={4} md={4} sx={{textAlign:'center'}}>
                <img src={photo} width='30%' alt="Book Thumbnail"/>
            </Grid>
            <Grid item xs={4} sm={4} md={8} sx={{textAlign:'center'}}>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="h6">{author}</Typography>
                <Typography variant="body1">
                   Rating: {rating}/5.00
                </Typography>
                <Typography variant="body1">
                    {genres.toString()}
                </Typography>
            </Grid>
        </Grid>
    </Paper>
}

export default Book;