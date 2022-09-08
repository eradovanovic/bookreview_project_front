import {mockAuthors, mockBooks} from "./mockAuthors";
import {BOOKS_PER_PAGE} from "constants/constants";

const getAuthorById = id => {
    const author = mockAuthors.find(a => a.id === id);
    return new Promise((res, rej) => {
        res(author ? author : mockAuthors[0]);
    })
}

const getAuthors = page => {
    return new Promise((res, rej) => {
        res({authors: mockAuthors.slice((page - 1) * 3, page * 3), total: mockAuthors.length});
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

const getBooksByAuthor = (id, page) => {
    const books = mockBooks.filter(b => b.author_id === id);
    return new Promise((res, rej) => {
        res({books: books.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE), total: books.length});
    })
}

const api = {
    getAuthorById,
    getAuthors,
    getBooksByAuthor,
    changeAuthorData
}

export default api;