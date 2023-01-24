export const resultsInForm = results => {
    return results && {
        ...results,
        books: bestsellersInForm(results.books)
    }
}

const bestsellersInForm = bestsellers => {
    return bestsellers.map(b => bestsellerInForm(b))
}

const bestsellerInForm = b => {
    return b && {
        ...b,
        photo: b.book_image,
        id: b.isbns[0].isbn10
    }
}
