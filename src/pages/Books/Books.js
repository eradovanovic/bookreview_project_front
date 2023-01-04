import {useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import api from "services/api/api";
import {BOOKS_PER_PAGE, LIST_TYPES} from "constants/constants";
import BookList from "components/BookList";
import Filter from "components/Filter";
import EmptyState from "components/Layout/EmptyState";

const Books = () => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('DEFAULT');
    const [genres, setGenres] = useState([]);
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        api.getBooks(page, genres, sort).then(res => {
            setBooks(res.books);
            setTotalPages(Math.ceil(res.total / BOOKS_PER_PAGE));
        });
    },[page]);

    const pageHandler = (event, value) => {
        setPage(value);
        api.getBooks(page, genres, sort).then(res => {
            setBooks(res.books);
        });
    }

    const applyHandler = (genresParam, sortParam) => {
        setGenres(genresParam);
        setSort(sortParam);
        api.getBooks(page, genresParam, sortParam).then(res => {
            setBooks(res.books);
            setPage(1);
            setTotalPages(Math.ceil(res.total / BOOKS_PER_PAGE));
        });
    }

    return (
        <Box sx={{minWidth: 120, height: '100%'}}>
            <Grid container columns={{xs: 12, sm: 12, md: 12}}>
                <Grid item xs={12} sm={12} md={2}>
                    <Filter applyHandler={applyHandler}/>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                    {books && books.length > 0 && <BookList books={books} type={LIST_TYPES.BOOK_LIST}/>}
                    {(!books || books.length === 0) && <EmptyState title="No books found!" subtitle="Try changing the filters or search term!"/>}
                </Grid>
            </Grid>
            {books && books.length > 0 && <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={3}>
                    <Pagination count={totalPages} page={page} onChange={pageHandler}/>
                </Grid>
            </Grid>}
        </Box>
    );
}

export default Books;
