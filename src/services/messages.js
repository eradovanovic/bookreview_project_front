const messages = {
    email: {
        policy: 'This is not valid format of email.'
    },

    password: {
        policy: 'Password should contain digits, upper and lower case letters and special characters.'
    },

    passwordConfirmation: {
        match: 'Passwords need to match.'
    },

    api: {
        400: 'Bad request.',
        401: 'Login failed.',
        500: 'Registration failed'
    },

    required: 'This value is required',

    unknown: 'Unexpected error occured'
}

export const message = (context, area, code, defaultMessage, constraints) =>
    messageProvider.message(messages, context, area, code, defaultMessage, constraints)

export const formErrors = (formName, errors) =>
    messageProvider.formErrors(messages, formName, errors)