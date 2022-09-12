import {useSelector} from "react-redux";
import {Box} from "@mui/material";
import BookList from "components/BookList";
import EmptyState from "components/Layout/EmptyState";
import {LIST_TYPES} from "constants/constants";
import classes from "./Search.module.scss";

const Search = () => {
    const books = useSelector(state => state.searchReducer.books);
    return <Box sx={{width: '100%', justifyContent: 'center'}}>
        {books && books.length > 0 && <BookList type={LIST_TYPES.BOOK_LIST} books={books}/>}
        {(!books || books.length === 0) && <EmptyState/>}
    </Box>
}

export default Search;