import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import _ from 'lodash';
import {Autocomplete, InputBase, InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {alpha, styled} from "@mui/material/styles";
import {clear, search} from "store/search/searchActions";
import SearchResult from "../SearchResult";
import classes from './SearchField.module.scss';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(1),
        width: '300px'
        // width: 'auto',
        // minWidth: '150px'
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        color: '#fff',
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        //paddingLeft: `calc(1em + ${theme.spacing(1)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const SearchField = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const delayedUpdate = useCallback(_.debounce(value => dispatch(search(value)), 300), []);
    const [searchValueShown, setSearchValueShown] = useState('');
    let books = useSelector(state => state.searchReducer.books);

    const handleChangeText = (event) => {
        setSearchValueShown(event.target.value ? event.target.value : '');
        delayedUpdate(event.target.value ? event.target.value : '');
    }

    const searchHandler = () => {
        dispatch(clear());
        navigate({
            pathname: '/search',
            search: `?query=${searchValueShown}`
        });
    }

    return <Search sx={{ display: { xs: 'inline', sm: 'inline', md: 'inline'}}}>
            <Autocomplete
                freeSolo
                id="autocomplete"
                options={books}
                getOptionLabel={option => option.title}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        <SearchResult sx={{display: 'block'}} option={option}  key={option.id}/>
                    </li>
                )}
                onInputChange={(event, newInputValue) => {
                    handleChangeText(event)
                }}
                renderInput={params => {
                    const {InputLabelProps,InputProps,...rest} = params;
                    return <StyledInputBase
                        {...InputProps}
                        {...rest}
                        variant="standard"
                        label="Search..."
                        placeholder="Search..."
                        value={searchValueShown}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton
                                    onClick={searchHandler}
                                    edge="end" sx={{color: 'white'}}>
                                    <SearchIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                }
            }/>
    </Search>
}

export default SearchField;
