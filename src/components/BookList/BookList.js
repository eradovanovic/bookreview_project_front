import PropTypes from "prop-types";
import Book from "../Book";
import classes from './BookList.module.scss'

const BookList = ({books, getCollection}) => {
    return books.map(book => (
        <Book key={book.id} book={book} getCollection={getCollection}/>
    ))
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
    getCollection: PropTypes.func
}
export default BookList;