import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Button, Chip, Link, Paper, Rating} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import classes from "./Book.module.scss";

const Book = ({book}) => {
    const navigate = useNavigate();
    const {id, title, author, genres, photo, rating, numberOfReviews} = book;
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
            </Grid>
        </Grid>
    </Paper>
}

Book.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        author: PropTypes.string,
        genres: PropTypes.array,
        photo: PropTypes.string,
        rating: PropTypes.number,
        numberOfReviews: PropTypes.number
    })
}

export default Book;