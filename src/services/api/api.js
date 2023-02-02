import {AUTHORS_PER_PAGE, BOOKS_PER_PAGE} from "constants/constants";
import axios from "services/axios.instance";
import {sortHandler} from "utils/sortMapping";


const getBookById = id => {
    return axios.get(`books/${id}`)
}

const getBooks = (page, genres, sortBy) => {
    const sort = sortHandler(sortBy)
    return axios.post('/books', {
        page,
        genres: genres.map(genre => genre.id),
        booksPerPage: BOOKS_PER_PAGE,
        sortBy: sort.sortBy,
        order: sort.order
    })
}

// const filterAndSortBooks = (books, page, genres, sortBy) => {
//     let filteredBooks = [...books];
//     if (genres && genres.length) {
//         filteredBooks = books.filter((book) => {
//             return book.genres.map(genre => genre.name).some(g => genres.includes(g));
//         });
//     }
//
//     switch (sortBy) {
//         case SORT.TITLE_ASC:
//             filteredBooks.sort((a,b) => a.title.localeCompare(b.title));
//             break;
//         case SORT.TITLE_DESC:
//             filteredBooks.sort((a,b) => b.title.localeCompare(a.title));
//             break;
//         case SORT.RATING_ASC:
//             filteredBooks.sort((a,b) => { return a.rating - b.rating;});
//             break;
//         case SORT.RATING_DESC:
//             filteredBooks.sort((a,b) => { return b.rating - a.rating;});
//             break;
//         default:
//             break;
//     }
//     return {books: filteredBooks.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE), total: filteredBooks.length};
// }

const addBook = (title, author_id, genres, description, photo) => {
    return axios.post('/books/addBook', {
        title,
        authorID: author_id,
        genres: genres.map(genre => {
            return {
                id: genre.id
            }
        }),
        description,
        photo
    })
}

const getReviews = book_id => {
    return axios.get(`/reviews/book/${book_id}`)
}

const getReviewsUser = username => {
    return axios.get(`/reviews/user/${username}`)
}

const checkIfReviewed = (user, book_id) => {
    return axios.post('/reviews/check', {
        username: user,
        book_id
    })
}

const addReview = (user, book_id, rating, review) => {
    return axios.post('/reviews', {
        username: user,
        book_id,
        rating,
        review,
    })
}

const deleteReview = review_id => {
    return axios.delete(`/reviews/${review_id}`)
}

const getCollectionForUser = (username, page, genres, sortBy) => {
    const sort = sortHandler(sortBy)
    return axios.post('/collections', {
        page,
        genres: genres.map(genre => genre.id),
        booksPerPage: BOOKS_PER_PAGE,
        sortBy: sort.sortBy,
        order: sort.order
    })
}

const checkBookInCollection = (username, book_id) => {
    return axios.post('/collections/check', {
        username,
        book_id,
    })
}

const addBookToCollection = (book_id, title, author, genres, rating, numberOfReviews, photo, description, username ) => {
    return axios.post('/collections/addToCollection', {
        username,
        book_id,
    })
}

const removeBookFromCollection = (username, book_id) => {
    return axios.delete(`/collections/${book_id}`)
}

const getAuthorById = id => {
    return axios.get(`/authors/${id}`)
}

const getAuthors = page => {
    return axios.post('/authors', {
        page,
        authorsPerPage: AUTHORS_PER_PAGE,
    })
}

const getAllAuthors = () => {
    return axios.post('authors', {
        page: 1,
        authorsPerPage: Number.MAX_SAFE_INTEGER
    })
}

const addAuthor = (name, surname, biography, photo) => {
    return axios.post('/authors/addAuthor', {
        name,
        surname,
        biography,
        photo
    })
}


const getBooksByAuthor = (id, page) => {
    return axios.post(`/books/authors/${id}`, {
        page,
        booksPerPage: BOOKS_PER_PAGE
    })
}

const changeAuthorData = (id, name, surname, photo, biography) => {
    return axios.put(`authors/${id}`, {
        name,
        surname,
        photo,
        biography
    })
}

const search = (input) => {
    return axios.post('/books/search', {
        input: input.trim(),
        page: 1,
        booksPerPage: Number.MAX_SAFE_INTEGER
    })
}

const searchPagination = (input, page) => {
    return axios.post('/books/search', {
        input: input.trim(),
        page: page,
        booksPerPage: BOOKS_PER_PAGE
    })
}

const getMostReviewedBooks = () => {
    return axios.post('/books', {
        page: 1,
        booksPerPage: BOOKS_PER_PAGE,
        sortBy: 'reviews',
        order: 'desc',
    })
}

const getNewestAddedBooks = () => {
    return axios.post('/books', {
        page: 1,
        booksPerPage: BOOKS_PER_PAGE,
        sortBy: 'date_published',
        order: 'desc',
    })
}

const getLatestReviews = () => {
    return axios.get('reviews/newest')
}

const getGenres = () => {
    return axios.get('/genres')
}

const getBooksPhotoUploadKey = () => {
    return axios.get('books/uploadPhoto')
}

const getAuthorsPhotoUploadKey = () => {
    return axios.get('authors/uploadPhoto')
}

const uploadPhoto = (imgFile, key) => {
    const formData= new FormData();
    formData.append('image',imgFile);
    return fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
}

const getBestsellers = (type, genre) => {
    const query =  (type === 'paperback' && genre === 'fiction') ? 'trade-fiction-paperback' : type + '-' + genre
    return fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${query}.json?api-key=pI5bu9tpJuaY3cP6StHn7GGuwFt5G8Ne`)
        .then(res => res.json())
}

export default {
    getBookById,
    getBooks,
    addBook,
    getReviews,
    getReviewsUser,
    checkIfReviewed,
    addReview,
    deleteReview,
    getCollectionForUser,
    checkBookInCollection,
    addBookToCollection,
    removeBookFromCollection,
    getAuthorById,
    getAuthors,
    getAllAuthors,
    addAuthor,
    getBooksByAuthor,
    changeAuthorData,
    search,
    searchPagination,
    getMostReviewedBooks,
    getNewestAddedBooks,
    getLatestReviews,
    getGenres,
    getBooksPhotoUploadKey,
    getAuthorsPhotoUploadKey,
    uploadPhoto,
    getBestsellers,
};
