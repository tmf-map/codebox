function debounce(fn, wait) {
    let timeout;
    return function(...args) {
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(() => { fn.apply(this, args) }, wait);
    }
}

module.exports = debounce;
