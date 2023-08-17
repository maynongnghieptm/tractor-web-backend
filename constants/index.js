const SORT_ORDER = {
    ASC: 1,
    DESC: -1
}

const USER_ROLE = {
    ADMIN: 'ADMIN',
    USER: 'USER'
}

const SECRET_KEY = process.env.SECRET_KEY;
const MONGO_URI = process.env.MONGO_URI;

const HEADER = {
    USER_ID: 'x-user-id',
    AUTHORIZATION: 'authorization'
}

module.exports = {
    SORT_ORDER,
    USER_ROLE,
    SECRET_KEY,
    MONGO_URI,
    HEADER,
}