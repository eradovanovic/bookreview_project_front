import {useEffect, useState} from "react";
import {FormControl, InputLabel, Pagination, Select, MenuItem, OutlinedInput, Checkbox, Button} from "@mui/material";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import {getBooks} from "api/api";
import Book from "components/Book";
import Grid from "@mui/material/Grid";
import {BOOKS_PER_PAGE, SORT} from "constants";

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
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('DEFAULT');
    const [genres, setGenres] = useState([]);
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(()=>{
        getBooks(page, genres, sort).then(res=>{
            setBooks(res.books);
            setTotalPages(Math.ceil(res.total/BOOKS_PER_PAGE));
        });
    },[page]);

    const pageHandler = (event, value) => {
        setPage(value);
        getBooks(page, genres, sort).then(res=>{
            setBooks(res.books);
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
            setBooks(res.books);
            setTotalPages(Math.ceil(res.total/BOOKS_PER_PAGE));
        });
    }

    const resetHandler = () => {
        setSort('DEFAULT');
        setGenres([]);
        getBooks(page, [], 'DEFAULT').then(res=>{
            setBooks(res.books);
            setTotalPages(Math.ceil(res.total/BOOKS_PER_PAGE));
        });
    }

    return (
        <Box sx={{minWidth: 120}}>
            <Grid
                container
                columns={{xs: 12, sm: 12, md: 12}}
            >
                <Grid item xs={12} sm={12} md={2}>
                    <Box sx={{marginTop:'20px', marginLeft:'20px'}}>
                        <Grid item xs={12} sm={12} md={12} sx={{height:'fit-content', display: 'flex', alignItems:'center', alignContent:'center'}}>
                            <FormControl sx={{width: '100%', margin: '10px'}}>
                                <InputLabel>Sort by</InputLabel>
                                <Select
                                    value={sort}
                                    label="Sort by"
                                    onChange={sortHandler}
                                >
                                    <MenuItem value={SORT.DEFAULT}>Default</MenuItem>
                                    <MenuItem value={SORT.TITLE_ASC}>Title ascending</MenuItem>
                                    <MenuItem value={SORT.TITLE_DESC}>Title descending</MenuItem>
                                    <MenuItem value={SORT.RATING_ASC}>Rating ascending</MenuItem>
                                    <MenuItem value={SORT.RATING_DESC}>Rating descending</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} sx={{height:'fit-content', display: 'flex', alignItems:'center', alignContent:'center'}}>
                            <FormControl sx={{width: '100%', margin: '10px'}}>
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
                        </Grid>
                        <Grid container columns={{xs: 12, sm: 12, md: 12}}>
                            <Grid item xs={6} sm={6} md={12} sx={{textAlign:'center'}}>
                                <FormControl sx={{width: '80%', marginTop: '10px', marginBottom: '10px'}}>
                                    <Button onClick={applyHandler}>Apply filters</Button>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6} md={12} sx={{textAlign:'center'}}>
                                <FormControl sx={{width: '80%', marginTop: '10px', marginBottom: '10px'}}>
                                    <Button onClick={resetHandler}>Reset filters</Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                    {books.map((book) => (
                        <Book
                            key={book.id}
                            book={book}
                        />
                    ))}
                </Grid>
            </Grid>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={3}>
                    <Pagination count={totalPages} page={page} onChange={pageHandler}/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Books;