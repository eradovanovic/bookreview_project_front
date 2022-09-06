import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Pagination} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import api from "api/api";
import BookList from "components/BookList";
import Filter from "components/Filter";
import {BOOKS_PER_PAGE} from "constants/constants";

const BookCollection = () => {
    const user = useSelector((state) => state.authReducer.user);
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('');
    const [genres, setGenres] = useState([]);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        api.getCollectionForUser(user.username, page, genres, sort).then(res => {
            setBooks(res.books);
            setTotalPages(Math.ceil(res.total / BOOKS_PER_PAGE));
        });
    },[page]);


    const applyHandler = (genresParam, sortParam) => {
        setSort(sortParam);
        setGenres(genresParam);
        api.getCollectionForUser(user.username, page, genresParam, sortParam).then(res => {
            setBooks(res.books);
            setTotalPages(Math.ceil(res.total / BOOKS_PER_PAGE));
        });
    }

    const getCollection = () => {
        api.getCollectionForUser(user.username, page, genres, sort).then(res => {
            setBooks(res.books);
            setTotalPages(Math.ceil(res.total / BOOKS_PER_PAGE));
        });
    }

    const pageHandler = (event, value) => {
        setPage(value);
        api.getCollectionForUser(user.username, page, genres, sort).then(res => {
            setBooks(res.books);
        });
    }

    return (<Box sx={{minWidth: 120}}>
            <Grid container columns={{xs: 12, sm: 12, md: 12}}>
                <Grid item xs={12} sm={12} md={2}>
                    <Filter applyHandler={applyHandler}/>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                    <BookList books={books} getCollection={getCollection}/>
                </Grid>
            </Grid>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={3}>
                    <Pagination count={totalPages} page={page} onChange={pageHandler}/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default BookCollection;