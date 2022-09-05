import {mockAuthor, mockBook, mockBooks, mockReviews} from "./mockData";
import {BOOKS_PER_PAGE, SORT} from "../constants/constants";

const getAuthorById = id => {
    return new Promise((res, rej) => {
        res(mockAuthor);
    })
}

const getBookById = id => {
    return new Promise((res, rej) => {
        res(mockBook);
    })
}

const getBooks = (page, genres, sortBy) => {
    let filteredBooks = [...mockBooks];
    if (genres && genres.length) {
        filteredBooks = mockBooks.filter((book)=>{
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

    const booksResult = filteredBooks.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE);
    return new Promise((res, rej) => {
        res({ books: booksResult, total: filteredBooks.length });
    })
}

const getReviews = book_id => {
    return new Promise((res, rej) => {
        res(mockReviews.filter(review => review.book_id === book_id)
            .sort((r1, r2) => new Date(r2.date_reviewed)-new Date(r1.date_reviewed)));
    });
}

const addReview = (user, avatar, book_id, date_reviewed, rating, review) => {
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
   return new Promise((res, rej) => {
       res(reviewObj);
   });
}

const deleteReview = review_id => {
    const index = mockReviews.findIndex(review => review.id === review_id);
    mockReviews.splice(index, 1);
    return new Promise((res, rej) => res({data:'sth'}));
}

export default {
    getAuthorById,
    getBookById,
    getBooks,
    getReviews,
    addReview,
    deleteReview
};
