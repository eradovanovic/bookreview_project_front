import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {Button, Checkbox, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import {BESTSELLER_GENRES, BESTSELLER_TYPES, SORT} from "constants/constants";
import api from "services/api/api";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        },
    },
};

const FilterBestsellers = ({applyHandler}) => {
    const [type, setType] = useState(BESTSELLER_TYPES.HARDCOVER.value);
    const [genre, setGenre] = useState(BESTSELLER_GENRES.FICTION.value);


    const typeHandler = event => {
        const {
            target: {value},
        } = event;
        setType(value);
    }

    const genreHandler = event => {
        const {
            target: {value},
        } = event;
        setGenre(value);
    }

    const resetHandler = () => {
        setGenre(BESTSELLER_GENRES.FICTION.value);
        setType(BESTSELLER_TYPES.HARDCOVER.value);
        applyHandler(BESTSELLER_GENRES.FICTION.value, BESTSELLER_TYPES.HARDCOVER.value);
    }

    return ( <Box sx={{marginTop:'20px', marginLeft:'20px', marginRight: {xs: '20px', sm: '20px', md: '0px'}}}>
        <Grid item xs={12} sm={12} md={12} sx={{height:'fit-content', display: 'flex', alignItems:'center', alignContent:'center'}}>
            <FormControl sx={{width: '100%', margin: '10px'}}>
                <InputLabel>Type</InputLabel>
                <Select
                    value={type}
                    label="Sort by"
                    onChange={typeHandler}
                    MenuProps={MenuProps}
                >
                    <MenuItem value={BESTSELLER_TYPES.HARDCOVER.value}>{BESTSELLER_TYPES.HARDCOVER.label}</MenuItem>
                    <MenuItem value={BESTSELLER_TYPES.PAPERBACK.value}>{BESTSELLER_TYPES.PAPERBACK.label}</MenuItem>
                    <MenuItem value={BESTSELLER_TYPES.COMBINED.value}>{BESTSELLER_TYPES.COMBINED.label}</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{height:'fit-content', display: 'flex', alignItems:'center', alignContent:'center'}}>
            <FormControl sx={{width: '100%', margin: '10px'}}>
                <InputLabel>Genre</InputLabel>
                <Select
                    value={genre}
                    label="Genre"
                    onChange={genreHandler}
                    MenuProps={MenuProps}
                >
                    <MenuItem value={BESTSELLER_GENRES.FICTION.value}>{BESTSELLER_GENRES.FICTION.label}</MenuItem>
                    <MenuItem value={BESTSELLER_GENRES.NONFICTION.value}>{BESTSELLER_GENRES.NONFICTION.label}</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid container columns={{xs: 12, sm: 12, md: 12}}>
            <Grid item xs={6} sm={6} md={12} sx={{textAlign:'center'}}>
                <FormControl sx={{width: '80%', marginTop: '10px', marginBottom: '10px'}}>
                    <Button onClick={() => applyHandler(genre, type)}>Apply filters</Button>
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

FilterBestsellers.propTypes = {
    applyHandler: PropTypes.func
}

export default FilterBestsellers;
