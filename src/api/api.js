import {mockAuthor, mockBooks, mockCollection, mockReviews} from "./mockData";
import {BOOKS_PER_PAGE, SORT} from "../constants/constants";

const getAuthorById = id => {
    return new Promise((res, rej) => {
        res(mockAuthor);
    })
}

const getBookById = id => {
    const books = mockBooks.filter(b => b.id === id);
    return new Promise((res, rej) => {
        res(books[0]);
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
        filteredBooks = books.filter((book)=>{
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
            .sort((r1, r2) => new Date(r2.date_reviewed)-new Date(r1.date_reviewed)));
    });
}

const addReview = (user, avatar, book_id, date_reviewed, rating, review) => {
    const index = mockBooks.findIndex(book => book.id === book_id);
    console.log(mockBooks[index]);
    const review_id = mockReviews.sort((r1, r2) => r2.id - r1.id).at(0).id + 1;
    const reviewObj = {
       id: review_id,
       user: user,
       avatar: avatar,
       book_id: book_id,
       date_reviewed: date_reviewed,
       rating: rating,
       review: review
    }
   mockReviews.push(reviewObj);


   mockBooks[index].rating = (mockBooks[index].rating * mockBooks[index].numberOfReviews + rating) /  (mockBooks[index].numberOfReviews + 1);
   mockBooks[index].numberOfReviews++;
   console.log(mockBooks[index]);

   return new Promise((res, rej) => {
       res(reviewObj);
   });
}

const deleteReview = review_id => {
    const index = mockReviews.findIndex(review => review.id === review_id);
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

export default {
    getAuthorById,
    getBookById,
    getBooks,
    getReviews,
    addReview,
    deleteReview,
    getCollectionForUser,
    checkBookInCollection,
    addBookToCollection,
    removeBookFromCollection
};
