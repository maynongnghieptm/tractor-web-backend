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
const MONGO_DATABASE = process.env.MONGO_DATABASE;

const HEADER = {
    USER_ID: 'x-user-id',
    AUTHORIZATION: 'authorization'
}

const ALL_TRACTOR_COMMAND = '__ALL_ONLINE__'

module.exports = {
    SORT_ORDER,
    USER_ROLE,
    SECRET_KEY,
    MONGO_URI,
    MONGO_DATABASE,
    HEADER,
    ALL_TRACTOR_COMMAND,
}