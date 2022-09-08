import {useState} from "react";
import PropTypes from "prop-types";
import {Button, Checkbox, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import {names, SORT} from "constants/constants";

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

const Filter = ({applyHandler}) => {
    const [sort, setSort] = useState('DEFAULT');
    const [genres, setGenres] = useState([]);

    const sortHandler = event => {
        const {
            target: {value},
        } = event;
        setSort(value);
    }

    const genresHandler = event => {
        const {
            target: {value},
        } = event;
        setGenres(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const resetHandler = () => {
        setGenres([]);
        setSort(SORT.DEFAULT);
        applyHandler([], SORT.DEFAULT);
    }

    return ( <Box sx={{marginTop:'20px', marginLeft:'20px'}}>
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
                <Select multiple value={genres} onChange={genresHandler} input={<OutlinedInput label="Genres"/>} renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps}>
                    {names.map(name => (
                        <MenuItem key={name.id} value={name.name}>
                            <Checkbox checked={genres.indexOf(name.name) > -1} />
                            <ListItemText primary={name.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
        <Grid container columns={{xs: 12, sm: 12, md: 12}}>
            <Grid item xs={6} sm={6} md={12} sx={{textAlign:'center'}}>
                <FormControl sx={{width: '80%', marginTop: '10px', marginBottom: '10px'}}>
                    <Button onClick={() => applyHandler(genres, sort)}>Apply filters</Button>
                </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={12} sx={{textAlign:'center'}}>
                <FormControl sx={{width: '80%', marginTop: '10px', marginBottom: '10px'}}>
                    <Button onClick={resetHandler}>Reset filters</Button>
                </FormControl>
            </Grid>
        </Grid>
    </Box>);
}

Filter.propTypes = {
    applyHandler: PropTypes.func
}

export default Filter;