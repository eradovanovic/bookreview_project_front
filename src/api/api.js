import {mockAuthor, mockBook, mockBooks, mockReviews} from "./mockData";
import {BOOKS_PER_PAGE, SORT} from "../constants";

export const getAuthorById = (id) => {
    return new Promise((res, rej) => {
        res(mockAuthor);
    })
}

export const getBookById = (id) => {
    return new Promise((res, rej) => {
        res(mockBook);
    })
}

export const getBooks = (page, genres, sortBy) => {
    let filteredBooks = [...mockBooks];
    if (genres && genres.length) {
        filteredBooks = mockBooks.filter((book)=>{
            return book.genres.some(g => genres.includes(g));
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

export const getReviews = (bookId) => {
    return new Promise((res, rej) => {
        res(mockReviews);
    });
}
