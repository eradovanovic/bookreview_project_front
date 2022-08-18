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

const api = {
    login
}

export default api;