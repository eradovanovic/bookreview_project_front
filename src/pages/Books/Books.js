import {useEffect, useState} from "react";
import {FormControl, InputLabel, Pagination, Select, MenuItem, OutlinedInput, Checkbox, Button} from "@mui/material";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import {getBooks} from "api/api";
import Book from "components/Book";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'drama',
    'crime',
    'thriller',
    'romance',
    'history',
    'fiction'
];


const Books = () => {
    const booksPerPage = 5;
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('DEFAULT');
    const [genres, setGenres] = useState([]);
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(()=>{
        getBooks(page, genres, sort).then(res=>{
            setBooks([...res.books]);
            setTotalPages(Math.ceil(res.total/booksPerPage));
        });
    },[page]);

    const pageHandler = (event, value) => {
        setPage(value);
        getBooks(page, genres, sort).then(res=>{
            setBooks([...res.books]);
        });
    }

    const sortHandler = (event) => {
        setSort(event.target.value);
    }

    const genresHandler = (event) => {
        const {
            target: {value},
        } = event;
        setGenres(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const applyHandler = () => {
        getBooks(page, genres, sort).then(res=>{
            setBooks([...res.books]);
            setTotalPages(Math.ceil(res.total/booksPerPage));
        });
    }

    const resetHandler = () => {
        setSort('DEFAULT');
        setGenres([]);
        getBooks(page, [], 'DEFAULT').then(res=>{
            setBooks([...res.books]);
            setTotalPages(Math.ceil(res.total/booksPerPage));
        });
    }

    const booksList = books.map((book) => (
        <Book
            key={book.id}
            book={book}
        />
    ));

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{width:'150px', margin:'10px'}}>
                <InputLabel>Sort by</InputLabel>
                <Select
                    value={sort}
                    label="Sort by"
                    onChange={sortHandler}
                >
                    <MenuItem value={'DEFAULT'}>Default</MenuItem>
                    <MenuItem value={'TITLE_ASC'}>Title ascending</MenuItem>
                    <MenuItem value={'TITLE_DESC'}>Title descending</MenuItem>
                    <MenuItem value={'RATING_ASC'}>Rating ascending</MenuItem>
                    <MenuItem value={'RATING_DESC'}>Rating descending</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{width:'150px', margin:'10px'}}>
                <InputLabel>Genres</InputLabel>
                <Select
                    multiple
                    value={genres}
                    onChange={genresHandler}
                    input={<OutlinedInput label="Genres" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={genres.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{width:'150px', margin:'10px'}}>
                <Button onClick={applyHandler}>Apply filters</Button>
            </FormControl>
            <FormControl sx={{width:'150px', margin:'10px'}}>
                <Button onClick={resetHandler}>Reset filters</Button>
            </FormControl>
            {booksList}
            <Pagination count={totalPages} page={page} onChange={pageHandler}/>
        </Box>
    );
}

export default Books;