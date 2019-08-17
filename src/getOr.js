const get = require('./get');

function getOr(def, path, obj) {
    const getResult = get(path, obj);
    return getResult === undefined ? def : getResult;
}

module.exports = getOr;
