import {mockUsers} from "./mockAuth";

const login = (username, password) => {
    const userRes = mockUsers.filter(u => u.username === username && u.password === password);
    if(userRes && userRes.length > 0){
        return new Promise((res, rej) => {
            res({user:userRes[0], token: 'fake token'});
        })
    }
    else {
        return Promise.reject('api error message');
    }
}

const register = (name, surname, email, photo, username, password) => {
    const userRes = mockUsers.filter(u => u.username === username || u.email === email);
    if(userRes && userRes.length > 0){
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

const api = {
    login,
    register
}

export default api;