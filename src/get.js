function get (path, data) {
    if (typeof data !== 'object' || data === null) {
        return
    }
    if (Array.isArray(path)) {
        path = path.join('.')
    }
    if (typeof path === 'string' && path.length) {
        return path
            .replace(/\[([^\[\]]*)]/g, '.$1.')
            .split('.')
            .filter(t => t !== '')
            .reduce((prev, cur) => prev && prev[cur], data)
    }
}

module.exports = get;
