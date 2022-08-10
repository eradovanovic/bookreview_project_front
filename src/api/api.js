import {mockAuthor, mockBook} from "./mockData";

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