import {mockUsers} from "./mockAuth";

const login = (username, password) => {
    const userRes = mockUsers.find(u => u.username === username && u.password === password);
    if(userRes){
        return new Promise((res, rej) => {
            res({user:userRes, token: 'fake token'});
        })
    }
    else {
        return Promise.reject('api error message');
    }
}

const register = (name, surname, email, photo, username, password) => {
    const userRes = mockUsers.find(u => u.username === username || u.email === email);
    if(userRes){
        return Promise.reject('api error message');
    }
    else {
        return new Promise((res, rej) => {
            res({
                    user: {
                        name: name,
                        surname: surname,
                        email: email,
                        username: username,
                        password: password,
                        type: 'user'
                    },
                    token: 'fake token'
                });
        })
    }
}

const getUserByUsername = username => {
    const user = mockUsers.find(user => user.username === username);
    return new Promise((res, rej) => {
        res(user);
    })
}

const updateUser = username => {

}

const changePassword = (username, password) => {

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