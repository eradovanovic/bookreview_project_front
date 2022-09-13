import {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {Box, Pagination, Grid} from "@mui/material";
import BookList from "components/BookList";
import EmptyState from "components/Layout/EmptyState";
import api from "api/api";
import {BOOKS_PER_PAGE, LIST_TYPES} from "constants/constants";
import classes from "./Search.module.scss";


const Search = () => {
    const {input} = useParams();
    const [page, setPage] = useState(1);
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const [searchParams] = useSearchParams();
    useEffect(() => {
        api.searchPagination(searchParams.get('query'), page).then(res => {
            setBooks(res.books);
            setPage(1);
            setTotalPages(Math.ceil(res.total / BOOKS_PER_PAGE));
        });
    },[input, searchParams]);

    useEffect(() => {
        api.searchPagination(searchParams.get('query'), page).then(res => {
            setBooks(res.books);
            setTotalPages(Math.ceil(res.total / BOOKS_PER_PAGE));
        });
    },[page]);

    const pageHandler = (event, value) => {
        setPage(value);
        api.searchPagination(searchParams.get('query'), page).then(res => {
            setBooks(res.books);
        });
    }
    return <Box sx={{minWidth: 120, height: '100%'}}>
        <Grid container columns={{xs: 12, sm: 12, md: 12}}>
            <Grid item xs={12} sm={12} md={12}>
                {books && books.length > 0 && <BookList books={books} type={LIST_TYPES.BOOK_LIST}/>}
                {(!books || books.length === 0) && <EmptyState title="No books found!" subtitle="Try changing the filters or search term!"/>}
            </Grid>
        </Grid>
        { <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={3}>
                <Pagination count={totalPages} page={page} onChange={pageHandler}/>
            </Grid>
        </Grid>}
    </Box>
}

export default Search;