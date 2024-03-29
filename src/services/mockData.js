export const mockAuthors = [
    {
        id:1,
        name: 'Sally',
        surname: 'Rooney',
        biography: 'Sally Rooney was born in 1991 and lives in Dublin, where she graduated from Trinity College. Her work has appeared in Granta, The Dublin Review, The White Review, The Stinging Fly, and the Winter Pages anthology.',
        photo: 'https://images.gr-assets.com/authors/1534007127p5/15860970.jpg',
        bookNum: 7

    },
    {
        id:2,
        name: 'Name2',
        surname: 'Surname2',
        biography: 'Sally Rooney was born in 1991 and lives in Dublin, where she graduated from Trinity College. Her work has appeared in Granta, The Dublin Review, The White Review, The Stinging Fly, and the Winter Pages anthology.',
        photo: 'https://images.gr-assets.com/authors/1534007127p5/15860970.jpg',
        bookNum: 4


    },
    {
        id:3,
        name: 'Name3',
        surname: 'Surname3',
        biography: 'Sally Rooney was born in 1991 and lives in Dublin, where she graduated from Trinity College. Her work has appeared in Granta, The Dublin Review, The White Review, The Stinging Fly, and the Winter Pages anthology.',
        photo: 'https://images.gr-assets.com/authors/1534007127p5/15860970.jpg',
        bookNum: 2
    },
    {
        id:4,
        name: 'Name4',
        surname: 'Surname4',
        biography: 'Sally Rooney was born in 1991 and lives in Dublin, where she graduated from Trinity College. Her work has appeared in Granta, The Dublin Review, The White Review, The Stinging Fly, and the Winter Pages anthology.',
        photo: 'https://images.gr-assets.com/authors/1534007127p5/15860970.jpg',
        bookNum: 0

    }
];

//TODO replace author with author name and author surname
// it's easier than fetching it in backend
export const mockBooks = [
    {
        id:1,
        title: 'Beautiful World, Where Are You',
        author_id: 1,
        author: 'Sally Rooney',
        genres: [
            {id: 6, name: 'fiction'},
            {id: 4, name: 'romance'}
        ],
        rating: 3.74,
        numberOfReviews: 20,
        description: 'Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. ',
        photo: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg'
    },
    {
        id:2,
        title: 'A Book 2',
        author_id: 2,
        author: 'Name2 Surname2',
        genres: [
            {id: 1, name: 'drama'},
            {id: 5, name: 'history'}
        ],
        rating: 4.12,
        numberOfReviews: 17,
        description: 'Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. ',
        photo: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg'
    },
    {
        id:3,
        title: 'C Book 3' ,
        author_id: 1,
        author: 'Sally Rooney',
        genres: [
            {id: 6, name: 'fiction'}
        ],
        rating: 3.50,
        numberOfReviews: 25,
        description: 'Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. ',
        photo: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg'
    },
    {
        id:4,
        title: 'B Book 4',
        author_id: 1,
        author: 'Sally Rooney',
        genres: [
            {id: 1, name: 'drama'}
        ],
        rating: 4.05,
        numberOfReviews: 8,
        description: 'Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. ',
        photo: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg'
    },
    {
        id:5,
        title: 'H Book 5',
        author_id: 1,
        author: 'Sally Rooney',
        genres: [
            {id: 6, name: 'fiction'},
            {id: 3, name: 'thriller'}
        ],
        rating: 4.76,
        numberOfReviews: 11,
        description: 'Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. ',
        photo: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg'
    },
    {
        id:6,
        title: 'E Book 6',
        author_id: 1,
        author: 'Sally Rooney',
        genres: [
            {id: 3, name: 'thriller'}
        ],
        rating: 2.90,
        numberOfReviews: 20,
        description: 'Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. ',
        photo: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg'
    },
    {
        id:7,
        title: 'P Book 7' ,
        author_id: 1,
        author: 'Sally Rooney',
        genres: [
            {id: 1, name: 'drama'}
        ],
        rating: 3.14,
        numberOfReviews: 22,
        description: 'Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. ',
        photo: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg'
    },
    {
        id:8,
        title: 'M Book 8',
        author_id: 3,
        author: 'Name3 Surname3',
        genres: [
            {id: 4, name: 'romance'},
            {id: 5, name: 'history'}
        ],
        rating: 3.97,
        numberOfReviews: 15,
        description: 'Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. ',
        photo: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg'
    },
    {
        id:9,
        title: 'W Book 9',
        author_id: 1,
        author: 'Sally Rooney',
        genres: [
            {id: 2, name: 'crime'},
            {id: 3, name: 'thriller'}
        ],
        rating: 4.89,
        numberOfReviews: 7,
        description: 'Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. ',
        photo: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg'
    },
    {
        id:10,
        title: 'L Book 10',
        author_id: 2,
        author: 'Name2 Surname2',
        genres: [
            {id: 6, name: 'fiction'}
        ],
        rating: 4.64,
        numberOfReviews: 10,
        description: 'Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. ',
        photo: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg'
    }
];

export const mockReviews = [
    {
        id: 1,
        book_id: 1,
        title: 'Beautiful World, Where Are You',
        user: 'user1',
        date_reviewed: '03-31-18 18:53',
        avatar: 'https://static.vecteezy.com/system/resources/previews/004/477/337/original/face-young-man-in-frame-circular-avatar-character-icon-free-vector.jpg',
        rating: 5,
        review: "studio blockbusters are currently in the hands of like four white guys who are all exalted for having the exact same taste in comedy, and filling their movies with expository dialogue, montages, and coked-up pacing as to leave more room for that comedy. what if fights were interrupted by someone wanting to resolve it differently. what if we called out the thing that usually happens in these kinds of movies and maybe still do it anyway. what if a man enjoyed or fought to something that is usually for women or children. "
    },
    {
        id: 2,
        book_id: 1,
        title: 'Beautiful World, Where Are You',
        user: 'user2',
        date_reviewed: '03-12-18 18:53',
        avatar: 'https://static.vecteezy.com/system/resources/previews/004/477/337/original/face-young-man-in-frame-circular-avatar-character-icon-free-vector.jpg',
        rating: 3,
        review: "Some review text"
    },
    {
        id: 3,
        book_id: 1,
        title: 'Beautiful World, Where Are You',
        user: 'user3',
        date_reviewed: '04-25-18 18:53',
        avatar: 'https://static.vecteezy.com/system/resources/previews/004/477/337/original/face-young-man-in-frame-circular-avatar-character-icon-free-vector.jpg',
        rating: 4,
        review: "Some review text"
    }
];

export const mockCollection = [
    {
        book: {
            id:1,
            title: 'Beautiful World, Where Are You',
            author: 'Sally Rooney',
            genres: [
                {id: 6, name: 'fiction'},
                {id: 4, name: 'romance'}
            ],
            rating: 3.74,
            numberOfReviews: 20,
            description: 'Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. ',
            photo: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg'
        },
        username: 'user1'
    },
    {
        book: {
            id: 4,
            title: 'B Book 4',
            author: 'Author 4',
            genres: [
                {id: 1, name: 'drama'}
            ],
            rating: 4.05,
            numberOfReviews: 8,
            description: 'Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. ',
            photo: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg'
        },
        username: 'user1'
    },
    {
        book: {
            id:3,
            title: 'C Book 3' ,
            author: 'Author 3',
            genres: [
                {id: 6, name: 'fiction'}
            ],
            rating: 3.50,
            numberOfReviews: 25,
            description: 'Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. ',
            photo: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg'
        },
        username: 'user1'
    }
];
