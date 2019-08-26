const get = require('./get');

function getOr(def, path, data) {
    const getResult = get(path, data);
    return getResult === undefined ? def : getResult;
}

module.exports = getOr;
