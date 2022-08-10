import {mockAuthor, mockBook, mockBooks} from "./mockData";

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
    const booksPerPage = 5;
    let filteredBooks;
    if(genres !== null && genres.length !== 0) {
        filteredBooks = mockBooks.filter((book)=>{
            let filterGenres = book.genres.filter(value => genres.includes(value));
            return (filterGenres !== null && filterGenres.length !== 0)
        });
    }
    else {
        filteredBooks = [...mockBooks];
    }

    let sortedBooks = [...filteredBooks];
    switch (sortBy) {
        case 'TITLE_ASC':
            sortedBooks.sort((a,b) => a.title.localeCompare(b.title));
            break;
        case 'TITLE_DESC':
            sortedBooks.sort((a,b) => b.title.localeCompare(a.title));
            break;
        case 'RATING_ASC':
            sortedBooks.sort((a,b) => {
                if (a.rating > b.rating) return 1;
                if (a.rating < b.rating) return -1;
                return 0;
            });
            break;
        case 'RATING_DESC':
            sortedBooks.sort((a,b) => {
                if (a.rating < b.rating) return 1;
                if (a.rating > b.rating) return -1;
                return 0;
            });
            break;
        default:
            break;
    }

    const booksResult = sortedBooks.slice((page-1)*booksPerPage, page*booksPerPage);
    return new Promise((res, rej) => {
        res({books: booksResult, total: filteredBooks.length});
    })
}
