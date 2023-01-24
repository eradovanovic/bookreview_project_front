import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment'
import Typography from "@mui/material/Typography";
import {Pagination, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import classes from "./Bestsellers.module.scss";
import {fetchBestsellers} from "../../store/books/booksActions";
import BookList from "../../components/BookList";
import {BOOKS_PER_PAGE, LIST_TYPES} from "../../constants/constants";

import EmptyState from "../../components/Layout/EmptyState";
import FilterBestsellers from "../../components/FilterBestsellers";

const Bestsellers = () => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'));
    const matchesSM= useMediaQuery(theme.breakpoints.up('sm'));
    const [type, setType] = useState('hardcover')
    const [genre, setGenre] = useState('fiction')
    const [page, setPage] = useState(1);
    const {bestsellers, bestsellersPublishedDate, bestsellersTitle} = useSelector(state => state.booksReducer)

    useEffect(() => {
        if(!bestsellers) {
            dispatch(fetchBestsellers(type, genre))
        }
    }, [dispatch, bestsellers])

    let height;
    if (matchesMD) {
        height = '200px';
    }
    else if (matchesSM) {
        height = '200px';
    }
    else {
        height = '280px';
    }

    const pageHandler = (event, value) => {
        setPage(value);
    }

    const applyHandler = (genreParam, typeParam) => {
        setGenre(genreParam);
        setType(typeParam);
        dispatch(fetchBestsellers(typeParam, genreParam))
    }
    return <Box>
        <Box className={classes.box} height={height}>
            <Stack direction="column" className={classes.box} height={height}>
                <Typography variant="h4" sx={{maxWidth: '650px', margin: '30px'}}>The New York Times Bestsellers</Typography>
                {bestsellers?.length && <Typography variant="h5" sx={{marginX: '10px'}}>Here are the {bestsellersTitle} bestsellers for the next week! </Typography>}
                {bestsellers?.length && <Typography variant="overline" sx={{marginX: '10px', marginTop: '30px'}}>Publishing date: {moment(bestsellersPublishedDate).format('Do MMMM YYYY')}</Typography>}
            </Stack>
        </Box>
        <Box sx={{minWidth: 120, height: '100%', paddingTop: {xs: '30px', sm: '30px'} }}>
            <Grid container columns={{xs: 12, sm: 12, md: 12}}>
                <Grid item xs={12} sm={12} md={2}>
                    <FilterBestsellers applyHandler={applyHandler}/>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    {bestsellers?.length && <BookList type={LIST_TYPES.BESTSELLERS} books={bestsellers.slice((page - 1) * BOOKS_PER_PAGE , page * BOOKS_PER_PAGE)}/>}
                    {!bestsellers?.length && <EmptyState title="No books found!" subtitle="Try changing the filters or search term!"/>}
                </Grid>
            </Grid>
            {bestsellers?.length && <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={3}>
                    <Pagination count={bestsellers.length/BOOKS_PER_PAGE} page={page} onChange={pageHandler}/>
                </Grid>
            </Grid>}

        </Box>

    </Box>

}

export default Bestsellers
