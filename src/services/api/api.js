import {AUTHORS_PER_PAGE, BOOKS_PER_PAGE, DEFAULT_AVATAR_PHOTO, DEFAULT_BOOK_PHOTO, SORT} from "constants/constants";
import axios from "services/axios.instance";
import {sortHandler} from "utils/sortMapping";

import {mockBooks, mockCollection, mockReviews} from "./mockData";
import {mockAuthors} from "./mockData";

// const bookDetailsInForm = data => {
//     return {
//         id: data.key,
//         photo: `https://covers.openlibrary.org/b/id/${data.details.covers?.[0]}-L.jpg`,
//         author_id: data.details.authors?.[0].key,
//         author: data.details.authors?.[0].name,
//         title: data.details.title,
//         description: data.details.description
//     }
// }

// const bookDetailsInForm = data => {
//     return {
//         id: data.key.replace('/works','/books'),
//         photo: `https://covers.openlibrary.org/b/id/${data.covers?.[0]}-L.jpg`,
//         author_id: data.authors?.[0].author.key.replace('/authors/', ''),
//         // author: fetchAuthor(data.authors?.[0].author.key.replace('/authors','')).name,
//         title: data.title,
//         description: data.description.value ? data.description.value : data.description,
//     }
// }
//
// const bookByAuthorInForm = data => {
//     return {
//         id: data.key.replace('/works','/books'),
//         photo: `https://covers.openlibrary.org/b/id/${data.covers?.[0]}-L.jpg`,
//         // author_id: data.details.authors?.[0].key,
//         // author: data.details.authors?.[0].name,
//         title: data.title,
//     }
// }

// const bookInForm = data => {
//     return {
//         photo: `https://covers.openlibrary.org/b/id/${data.cover_i}-L.jpg`,
//         id: data.key.replace('/works', '/books'),
//         author_id: data.author_key.toString(),
//         author: data.author_name.toString(),
//         title: data.title,
//         genres: [],
//     }
// }
//
// const booksByAuthorInForm = data => {
//    const books = []
//     data.entries.forEach(d => {
//         books.push(bookByAuthorInForm(d))
//     })
//     return {total: data.size, books}
// }
//
// const booksInForm = data => {
//     const books = []
//     data.docs.forEach(d => {
//         books.push(bookInForm(d))
//     })
//     return {total: data.numFound, books}
// }
//
// const authorDetailsInForm = data => {
//     return {
//         photo: data.photos?.[0] && `https://covers.openlibrary.org/a/id/${data.photos[0]}-L.jpg`,
//         name: data.name,
//         biography: data.bio?.value ? data.bio.value : data.bio,
//     }
// }
//
// const authorsInForm = data => {
//     const authors = []
//     data.docs.forEach(d => {
//         authors.push(authorInForm(d))
//     })
//     return {total: data.numFound, authors}
// }
//
// const authorInForm = data => {
//     return {
//         id: data.key,
//         photo: `https://covers.openlibrary.org/a/id/${data.name}-L.jpg`,
//         name: data.name,
//         bookNum: data.work_count,
//     }
// }

const getBookById = id => {
    return axios.get(`books/${id}`)

    // mock data
    // return fetch(`https://openlibrary.org/works/${id}.json`)
    //     .then(response => response.json())
    //     .then(data => {
    //         const bookDetails = bookDetailsInForm(data)
    //         return bookDetails
    //     })
    // const book = mockBooks.find(b => b.id === id);
    // return new Promise((res, rej) => {
    //     res(book);
    // })
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

    // mock data
    // let books = [...mockBooks];
    // const booksResult = filterAndSortBooks(books, page, genres, sortBy);
    // return new Promise((res, rej) => {
    //     res(booksResult);
    // })
    // // return fetch(`http://openlibrary.org/search.json?q=title:* subject:large_type_books&page=${page}&limit=${BOOKS_PER_PAGE}`)
    // //     .then(response => response.json())
    // //     .then(data => booksInForm(data))
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

const addBook = (title, author_id, genres, description, photo) => {
    // const photoSth = photo.toDataURL()

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

    // mock data
    // const id = [...mockBooks].sort((r1, r2) => r2.id - r1.id).at(0).id + 1;
    // const bookObj = {
    //     id: id,
    //     title: title,
    //     author_id: author_id,
    //     author: author,
    //     genres: genres,
    //     rating: 0,
    //     numberOfReviews: 0,
    //     description: description,
    //     photo: photo ? photo.name : DEFAULT_BOOK_PHOTO,
    //     photoFile: photo ? URL.createObjectURL(photo) : null,
    // }
    // mockBooks.push(bookObj);
    // return new Promise((res, rej) => {
    //     res(bookObj);
    // });
}

const getReviews = book_id => {
    return axios.get(`/reviews/book/${book_id}`)

    // mock data
    // return new Promise((res, rej) => {
    //     res(mockReviews.filter(review => review.book_id === book_id)
    //         .sort((r1, r2) => new Date(r2.date_reviewed) - new Date(r1.date_reviewed)));
    // });
}

const getReviewsUser = username => {
    return axios.get(`/reviews/user/${username}`)

    // mock data
    // return new Promise((res, rej) => {
    //     res(mockReviews.filter(review => review.user === username)
    //         .sort((r1, r2) => new Date(r2.date_reviewed) - new Date(r1.date_reviewed)));
    // });
}

const checkIfReviewed = (user, book_id) => {
    return axios.post('/reviews/check', {
        username: user,
        book_id
    })

    // mock data
    // const review = mockReviews.find(r => r.book_id === book_id && r.user === user);
    // return new Promise((res, rej) => {
    //     res(review);
    // });
}

const addReview = (user, book_id, rating, review) => {
    return axios.post('/reviews', {
        username: user,
        book_id,
        rating,
        review,
    })
   //  const review_id = mockReviews.sort((r1, r2) => r2.id - r1.id).at(0).id + 1;
   //  const reviewObj = {
   //     id: review_id,
   //     user: user,
   //     avatar: avatar,
   //     book_id: book_id,
   //     title: title,
   //     date_reviewed: date_reviewed,
   //     rating: rating,
   //     review: review
   //  }
   // mockReviews.push(reviewObj);
   //
   // const index = mockBooks.findIndex(book => book.id === book_id);
   // mockBooks[index].rating = (mockBooks[index].rating * mockBooks[index].numberOfReviews + rating) /  (mockBooks[index].numberOfReviews + 1);
   // mockBooks[index].numberOfReviews++;
   //
   // return new Promise((res, rej) => {
   //     res(reviewObj);
   // });
}

const deleteReview = review_id => {
    return axios.delete(`/reviews/${review_id}`)
    // const index = mockReviews.findIndex(review => review.id === review_id);
    // const book_index = mockBooks.findIndex(book => book.id === mockReviews[index].book_id);
    //
    // if (mockBooks[book_index].numberOfReviews > 1) {
    //     mockBooks[book_index].rating = (mockBooks[book_index].rating * mockBooks[book_index].numberOfReviews - mockReviews[index].rating) / (mockBooks[book_index].numberOfReviews - 1);
    // }
    // else {
    //     mockBooks[book_index].rating = 0;
    // }
    //
    // mockBooks[book_index].numberOfReviews--;
    // mockReviews.splice(index, 1);
    // return new Promise((res, rej) => res(mockReviews));
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
    // const books = mockCollection.map(item => item.book);
    // const booksInCollection = filterAndSortBooks(books, page, genres, sortBy);
    // return new Promise((res, rej) => res(booksInCollection));
}

const checkBookInCollection = (username, book_id) => {
    return axios.post('/collections/check', {
        username,
        book_id,
    })
    // const books = mockCollection.filter(item => item.username === username && item.book.id === book_id);
    // return new Promise((res, rej) => res(books));
}

const addBookToCollection = (book_id, title, author, genres, rating, numberOfReviews, photo, description, username ) => {
    return axios.post('/collections/addToCollection', {
        username,
        book_id,
    })
    // const collection_item = {
    //     book: {
    //         id: book_id,
    //         title: title,
    //         author: author,
    //         genres: genres,
    //         rating: rating,
    //         numberOfReviews: numberOfReviews,
    //         description: description,
    //         photo: photo,
    //     },
    //     username: username
    // }
    // mockCollection.push(collection_item);
    // return new Promise((res, rej) => res(mockCollection));
}

const removeBookFromCollection = (username, book_id) => {
    return axios.delete(`/collections/${book_id}`)

    //mock data
    // const index = mockCollection.findIndex(item => item.username === username && item.book.id === book_id);
    // mockCollection.splice(index, 1);
    // return new Promise((res, rej) => res(mockCollection));
}

const getAuthorById = id => {
    return axios.get(`/authors/${id}`)
    // mock data
    // const author = mockAuthors.find(a => a.id === id);
    // return new Promise((res, rej) => {
    //     res(author ? author : mockAuthors[0]);
    // })

    //open library
    // return fetch(` https://openlibrary.org/authors/${id}.json`)
    //     .then(response => response.json())
    //     .then(data => authorDetailsInForm(data))
}

const getAuthors = page => {
    return axios.post('/authors', {
        page,
        authorsPerPage: AUTHORS_PER_PAGE,
    })

    // mock data
    // return new Promise((res, rej) => {
    //     res({authors: mockAuthors.slice((page - 1) * AUTHORS_PER_PAGE, page * AUTHORS_PER_PAGE), total: mockAuthors.length});
    // })

    //open library
    // return fetch(`http://openlibrary.org/search.json?q=title:* subject:large_type_books&page=${page}&limit=${BOOKS_PER_PAGE}`)
    // console.log(page)
    // return fetch(`http://openlibrary.org/search/authors.json?&q=top_subjects:("Large type books")&offset=${(page - 1) * AUTHORS_PER_PAGE}&limit=${AUTHORS_PER_PAGE}&sort:["name asc"]`)
    //     .then(response => response.json())
    //     .then(data => authorsInForm(data))
}

const getAllAuthors = () => {
    return axios.post('authors', {
        page: 1,
        authorsPerPage: Number.MAX_SAFE_INTEGER
    })

    // mock data
    // return new Promise((res, rej) => {
    //     res({authors: mockAuthors});
    // })
}

const addAuthor = (name, surname, biography, photo) => {
    return axios.post('/authors/addAuthor', {
        name,
        surname,
        biography,
        photo
    })
    // mock data
    // const id = [...mockAuthors].sort((r1, r2) => r2.id - r1.id).at(0).id + 1;
    // const authorObj = {
    //     id: id,
    //     name: name,
    //     surname: surname,
    //     biography: biography,
    //     photo: photo ? photo.name : DEFAULT_AVATAR_PHOTO,
    //     photoFile: photo ? URL.createObjectURL(photo) : null,
    //     bookNum: 0,
    // }
    // mockAuthors.push(authorObj);
    // return new Promise((res, rej) => {
    //     res(authorObj);
    // });
}


const getBooksByAuthor = (id, page) => {
    return axios.post(`/books/authors/${id}`, {
        page,
        booksPerPage: BOOKS_PER_PAGE
    })
    // mock data
    // const books = mockBooks.filter(b => b.author_id === id);
    // return new Promise((res, rej) => {
    //     res({books: books.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE), total: books.length});
    // })

    // open library
    // return fetch(`https://openlibrary.org/authors/${id}/works.json?limit=${BOOKS_PER_PAGE}&offset=${(page - 1) * BOOKS_PER_PAGE}`)
    //     .then(response => response.json())
    //     .then(data => booksByAuthorInForm(data))
}

const changeAuthorData = (id, name, surname, photo, biography) => {
    return axios.put(`authors/${id}`, {
        name,
        surname,
        photo,
        biography
    })
    // mock data
    // const index = mockAuthors.findIndex(a => a.id === id)
    // mockAuthors[index].name = name;
    // mockAuthors[index].surname = surname;
    // mockAuthors[index].photo = photo ? photo.name : mockAuthors[index].photo;
    // mockAuthors[index].photoFile = photo ? URL.createObjectURL(photo) : null;
    // mockAuthors[index].biography = biography;
    // return new Promise((res, rej) => {
    //     res(mockAuthors[index]);
    // })
}

const search = (input) => {
    return axios.post('/books/search', {
        input: input.trim(),
        page: 1,
        booksPerPage: Number.MAX_SAFE_INTEGER
    })
    // mock data
    // if (!input || input.trim() === "") {
    //     return new Promise((res, rej) => res([]));
    // }
    // const books = mockBooks.filter(book => book.title.toLowerCase().includes(input.toLowerCase()));
    // return new Promise((res, rej) => res(books));
}

const searchPagination = (input, page) => {
    return axios.post('/books/search', {
        input: input.trim(),
        page: page,
        booksPerPage: BOOKS_PER_PAGE
    })
    // const books = mockBooks.filter(book => book.title.toLowerCase().includes(input.toLowerCase()));
    // return new Promise((res, rej) => res({books: books.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE), total: books.length}));
}

const getMostReviewedBooks = () => {
    return axios.post('/books', {
        page: 1,
        booksPerPage: BOOKS_PER_PAGE,
        sortBy: 'reviews',
        order: 'desc',
    })
    // mock data
    // return new Promise((res, rej) => res([...mockBooks].sort((b1, b2) => b2.numberOfReviews - b1.numberOfReviews).slice(0, 5)));
}

const getNewestAddedBooks = () => {
    return axios.post('/books', {
        page: 1,
        booksPerPage: BOOKS_PER_PAGE,
        sortBy: 'date_published',
        order: 'desc',
    })

    // mock data
    // return new Promise((res, rej) => res([...mockBooks].sort((b1, b2) => b2.id - b1.id).slice(0, 5)));
}

const getLatestReviews = () => {
    return axios.get('reviews/newest')
    // return new Promise((res, rej) => res([...mockReviews].sort((r1, r2) => new Date(r2.date_reviewed) - new Date(r1.date_reviewed)).slice(0, 5)));
}

const getGenres = () => {
    return axios.get('/genres')
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
};
