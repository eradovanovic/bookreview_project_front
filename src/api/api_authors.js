import {mockAuthors, mockBooks} from "./mockAuthors";

const getAuthorById = id => {
    const authors = mockAuthors.filter(a => a.id === id);
    return new Promise((res, rej) => {
        res(authors && authors.length > 0 ? authors[0] : mockAuthors[0]);
    })
}

const getAuthors = () => {
    return new Promise((res, rej) => {
        res(mockAuthors);
    })
}

const getBooksByAuthor = id => {
    const books = mockBooks.filter(b => b.author_id === id);
    return new Promise((res, rej) => {
        res(books);
    })
}

const api = {
    getAuthorById,
    getAuthors,
    getBooksByAuthor
}

export default api;