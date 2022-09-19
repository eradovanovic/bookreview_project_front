import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {Box, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import classes from './SearchResult.module.scss';

const SearchResult = ({option}) => {
    const navigate = useNavigate();
    return  <Box onClick={() => navigate(`/books/${option.id}`)}>
        <Grid container columns={{xs: 8, sm: 8, md: 12}} sx={{margin: '5px'}}>
            <Grid item xs={2} sm={1} md={3}>
                <Box sx={{width: {xs: '100%', sm: '100%', md: '100%'}}}>
                    <img className={classes.searchThumbnailIMG} src={option.photo} width="100%"/>
                </Box>
            </Grid>
            <Grid item xs={6} sm={7} md={9}>
                <Stack direction="column" sx={{height: '100%', width: '100%', display: 'flex', paddingLeft: '8px', justifyContent: 'center', alignContent: 'center'}}>
                    <Typography variant="subtitle2">{option.title}</Typography>
                    <Typography variant="subtitle1">{option.author}</Typography>
                    <Typography variant="subtitle1">{option.genres.map(g => g.name).join(', ')}</Typography>
                </Stack>
            </Grid>
        </Grid>
    </Box>
}

SearchResult.propTypes = {
    option: PropTypes.shape({
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
    })
}

export default SearchResult;