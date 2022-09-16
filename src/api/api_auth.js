import {mockUsers} from "./mockAuth";

const userInfoObject = (user) => {
    return {
        name: user.name,
        surname: user.surname,
        photo: user.photo,
        email: user.email,
        username: user.username,
        type: user.type
    }
}

const login = (username, password) => {
    const userRes = mockUsers.find(u => u.username === username && u.password === password);
    if (userRes){
        return new Promise((res, rej) => {
            res({
                user: userInfoObject(userRes),
                token: 'fake token'});
        })
    }
    else {
        const error = new Error('Wrong username or password!');
        error.code = 401;
        return Promise.reject(error);
    }
}

const register = (name, surname, email, photo, username, password) => {
    const userRes = mockUsers.find(u => u.username === username || u.email === email);
    if(userRes){
        const error = new Error('Username or email is already in use!');
        error.code = 409;
        return Promise.reject(error);
    }
    else {
        const newUser = {
            name: name,
            surname: surname,
            email: email,
            photo: photo,
            username: username,
            password: password,
            type: 'user'
        };
        mockUsers.push(newUser);
        return new Promise((res, rej) => {
            res({
                    user: userInfoObject(newUser),
                    token: 'fake token'
                });
        })
    }
}

const getUserByUsername = username => {
    const user = mockUsers.find(user => user.username === username);
    if (user) {
        return new Promise((res, rej) => {
            res(userInfoObject(user));
        })
    }
    else {
        return new Promise((res, rej) => {
            res(user);
        })
    }
}

const updateUser = (username, name, surname, email, photo) => {
    const index = mockUsers.findIndex(u => u.username === username);
    const user = mockUsers.find(u => email !== mockUsers[index].email && u.email === email);
    if (!user) {
        mockUsers[index].name = name;
        mockUsers[index].surname = surname;
        mockUsers[index].photo = photo;
        mockUsers[index].email = email;
        return new Promise((res, rej) => {
            res(userInfoObject(mockUsers[index]));
        })
    }
    else {
        const error = new Error("This mail is already in use!")
        error.code = 409;
        return Promise.reject(error);
    }
}

const changePassword = (username, oldPassword, password) => {
    const index = mockUsers.findIndex(u => u.username === username);
    if (mockUsers[index].password === oldPassword) {
        mockUsers[index].password = password;
        return new Promise((res, rej) => {
            res(userInfoObject(mockUsers[index]));
        })
    }
    else {
        const error = new Error("Incorrect old password!")
        error.code = 401;
        return Promise.reject(error);
    }
}

const deleteUser = username => {
    const index = mockUsers.findIndex(user => user.username === username);
    mockUsers.splice(index, 1);
    return new Promise((res, rej) => {
        res(username);
    })
}

const api = {
    login,
    register,
    getUserByUsername,
    updateUser,
    changePassword,
    deleteUser
}

export default api;