const validateUsername = (username) => {
    return /^[a-zA-z0-9_-]*$/.test(username) && username.length >= 4
}

const validateEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
}

const validatePassword = (password) => {
    return password.length >= 6 && !/\s/g.test(password);
}

module.exports = {validateUsername, validateEmail, validatePassword}