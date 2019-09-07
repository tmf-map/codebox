function get (path, data) {
    if (typeof data !== 'object' || data === null) {
        return;
    }
    if (!path || !path.length) {
        return;
    }
    if (Array.isArray(path)) {
        return path.reduce((prev, cur) => prev && prev[cur], data);
    }
    if (typeof path === 'string') {
        return path
            .replace(/\[([^\[\]]*)]/g, '.$1')
            .split('.')
            .reduce((prev, cur) => prev && prev[cur], data);
    }
}

module.exports = get;
