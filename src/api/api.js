import {mockBooks, mockCollection, mockReviews} from "./mockData";
import {AUTHORS_PER_PAGE, BOOKS_PER_PAGE, SORT} from "../constants/constants";
import {mockAuthors} from "./mockData";

const getBookById = id => {
    const book = mockBooks.find(b => b.id === id);
    return new Promise((res, rej) => {
        res(book);
    })
}

const getBooks = (page, genres, sortBy) => {
    let books = [...mockBooks];
    const booksResult = filterAndSortBooks(books, page, genres, sortBy);
    return new Promise((res, rej) => {
        res(booksResult);
    })
}

const filterAndSortBooks = (books, page, genres, sortBy) => {
    let filteredBooks = [...books];
    if (genres && genres.length) {
        filteredBooks = books.filter((book) => {
            return book.genres.map(genre => genre.name).some(g => genres.includes(g));
        });
    }

    switch (sortBy) {
        case SORT.TITLE_ASC:
            filteredBooks.sort((a,b) => a.title.localeCompare(b.title));
            break;
        case SORT.TITLE_DESC:
            filteredBooks.sort((a,b) => b.title.localeCompare(a.title));
            break;
        case SORT.RATING_ASC:
            filteredBooks.sort((a,b) => { return a.rating - b.rating;});
            break;
        case SORT.RATING_DESC:
            filteredBooks.sort((a,b) => { return b.rating - a.rating;});
            break;
        default:
            break;
    }
    return {books: filteredBooks.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE), total: filteredBooks.length};
}

const getReviews = book_id => {
    return new Promise((res, rej) => {
        res(mockReviews.filter(review => review.book_id === book_id)
            .sort((r1, r2) => new Date(r2.date_reviewed) - new Date(r1.date_reviewed)));
    });
}

const getReviewsUser = username => {
    return new Promise((res, rej) => {
        res(mockReviews.filter(review => review.user === username)
            .sort((r1, r2) => new Date(r2.date_reviewed) - new Date(r1.date_reviewed)));
    });
}

const checkIfReviewed = (user, book_id) => {
    const review = mockReviews.find(r => r.book_id === book_id && r.user === user);
    return new Promise((res, rej) => {
        res(review);
    });
}

const addReview = (user, avatar, book_id, title, date_reviewed, rating, review) => {
    const review_id = mockReviews.sort((r1, r2) => r2.id - r1.id).at(0).id + 1;
    const reviewObj = {
       id: review_id,
       user: user,
       avatar: avatar,
       book_id: book_id,
       title: title,
       date_reviewed: date_reviewed,
       rating: rating,
       review: review
    }
   mockReviews.push(reviewObj);

   const index = mockBooks.findIndex(book => book.id === book_id);
   mockBooks[index].rating = (mockBooks[index].rating * mockBooks[index].numberOfReviews + rating) /  (mockBooks[index].numberOfReviews + 1);
   mockBooks[index].numberOfReviews++;

   return new Promise((res, rej) => {
       res(reviewObj);
   });
}

const deleteReview = review_id => {
    const index = mockReviews.findIndex(review => review.id === review_id);
    const book_index = mockBooks.findIndex(book => book.id === mockReviews[index].book_id);

    if(mockBooks[book_index].numberOfReviews > 1)
        mockBooks[book_index].rating = (mockBooks[book_index].rating * mockBooks[book_index].numberOfReviews - mockReviews[index].rating) / (mockBooks[book_index].numberOfReviews - 1);
    else
        mockBooks[book_index].rating = 0;

    mockBooks[book_index].numberOfReviews--;
    mockReviews.splice(index, 1);
    return new Promise((res, rej) => res(mockReviews));
}

const getCollectionForUser = (username, page, genres, sortBy) => {
    const books = mockCollection.map(item => item.book);
    const booksInCollection = filterAndSortBooks(books, page, genres, sortBy);
    return new Promise((res, rej) => res(booksInCollection));
}

const checkBookInCollection = (username, book_id) => {
    const books = mockCollection.filter(item => item.username === username && item.book.id === book_id);
    return new Promise((res, rej) => res(books));
}

const addBookToCollection = (book_id, title, author, genres, rating, numberOfReviews, photo, description, username ) => {
    const collection_item = {
        book: {
            id: book_id,
            title: title,
            author: author,
            genres: genres,
            rating: rating,
            numberOfReviews: numberOfReviews,
            description: description,
            photo: photo
        },
        username: username
    }
    mockCollection.push(collection_item);
    return new Promise((res, rej) => res(mockCollection));
}

const removeBookFromCollection = (username, book_id) => {
    const index = mockCollection.findIndex(item => item.username === username && item.book.id === book_id);
    mockCollection.splice(index, 1);
    return new Promise((res, rej) => res(mockCollection));
}

const getAuthorById = id => {
    const author = mockAuthors.find(a => a.id === id);
    return new Promise((res, rej) => {
        res(author ? author : mockAuthors[0]);
    })
}

const getAuthors = page => {
    return new Promise((res, rej) => {
        res({authors: mockAuthors.slice((page - 1) * AUTHORS_PER_PAGE, page * AUTHORS_PER_PAGE), total: mockAuthors.length});
    })
}

const getBooksByAuthor = (id, page) => {
    const books = mockBooks.filter(b => b.author_id === id);
    return new Promise((res, rej) => {
        res({books: books.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE), total: books.length});
    })
}

const changeAuthorData = (id, name, surname, photo, biography) => {
    const index = mockAuthors.findIndex(a => a.id === id);
    mockAuthors[index].name = name;
    mockAuthors[index].surname = surname;
    mockAuthors[index].photo = photo;
    mockAuthors[index].biography = biography;
    return new Promise((res, rej) => {
        res(mockAuthors[index]);
    })
}

const search = (input) => {
    if (!input || input.trim() === "") {
        return new Promise((res, rej) => res([]));
    }
    const books = mockBooks.filter(book => book.title.toLowerCase().includes(input.toLowerCase()));
    return new Promise((res, rej) => res(books));
}

const searchPagination = (input, page) => {
    const books = mockBooks.filter(book => book.title.toLowerCase().includes(input.toLowerCase()));
    return new Promise((res, rej) => res({books: books.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE), total: books.length}));
}

export default {
    getBookById,
    getBooks,
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
    getBooksByAuthor,
    changeAuthorData,
    search,
    searchPagination
};
