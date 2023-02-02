import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Book from "../Book";
import {LIST_TYPES} from "../../constants/constants";
import BestsellerBook from "../BestsellerBook";

import classes from './BookList.module.scss';

const BookList = ({books, getCollection, type}) => {
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'));
    const matchesSM= useMediaQuery(theme.breakpoints.up('sm'));

    let height;
    if (matchesMD) {
        height = type === LIST_TYPES.BESTSELLERS ? '1750px' : '1550px';
    }
    else if (matchesSM) {
        height = type === LIST_TYPES.BESTSELLERS ? '1750px' : '1550px';
    }
    else{
        height = type === LIST_TYPES.BESTSELLERS ? '3325px' : '2750px';
    }

    return <Box height={height}>
        {type === LIST_TYPES.BESTSELLERS ?
            books?.map(book => (<BestsellerBook key={book.id} book={book} getCollection={getCollection} type={type}/>)):
            books?.map(book => (<Book key={book.id} book={book} getCollection={getCollection} type={type}/>))
        }
    </Box>
}



BookList.propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        book: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            genres: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string
            })),
            photo: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            numberOfReviews: PropTypes.number
        })
    })),
    getCollection: PropTypes.func,
    type: PropTypes.string.isRequired,
}
export default BookList;
