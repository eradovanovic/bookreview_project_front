import {mockAuthors} from "./mockAuthors";

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

const api = {
    getAuthorById,
    getAuthors
}

export default api;