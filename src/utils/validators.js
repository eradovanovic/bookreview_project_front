const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const emailValid = (email) => {
    return emailRegex.test(email);
}

export const passwordValid = (password) => {
    return passwordRegex.test(password);
}