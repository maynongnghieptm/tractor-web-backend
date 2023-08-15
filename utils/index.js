const _ = require('lodash');
const { SORT_ORDER } = require("../constants")

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
}

const getSortBy = (sortBy, order = SORT_ORDER.ASC) => {
    return {
        [sortBy]: order
    }
}

// ['a', 'b'] => {a: 1, b: 1}
const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 1]));
}

const getUnselectData = (unSelect = []) => {
    return Object.fromEntries(unSelect.map(el => [el, 0]));
}

module.exports = {
    getInfoData,
    getSortBy,
    getSelectData,
    getUnselectData
}