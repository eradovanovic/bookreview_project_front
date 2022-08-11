import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Button, Link, Paper} from "@mui/material";
import classes from "./Book.module.scss";

const Book = (props) => {
    const navigate = useNavigate();
    const { id, title, author, genres, photo, rating, numberOfReviews } = props.book;
    return <Paper sx={{flexGrow: 1, margin:'30px', paddingBottom: '10px', alignContent:'center'}}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>
            <Grid item xs={4} sm={4} md={4} sx={{textAlign:'center'}}>
                <Button sx={{maxWidth:'150px'}} onClick={()=>{navigate(`/books/${id}`)}}>
                    <img src={photo} width='100%' alt="Book Thumbnail"/>
                </Button>
            </Grid>
            <Grid item xs={4} sm={4} md={8} sx={{textAlign:'center'}}>
                <Typography variant="h5">{title}</Typography>
                <Link href="/authors/detail" color="#000" underline="hover">
                    <Typography variant="h6">{author}</Typography>
                </Link>
                <Typography variant="body1">
                   Rating: {rating}/5.00
                </Typography>
                <Typography variant="body1">
                    Reviews: {numberOfReviews}
                </Typography>
                <Typography variant="body1">
                    {genres.toString()}
                </Typography>
            </Grid>
        </Grid>
    </Paper>
}

export default Book;