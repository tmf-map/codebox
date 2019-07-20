function debounce(fn, wait, ...args) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(()=>{ fn.apply(this, args) }, wait)
    }
}
