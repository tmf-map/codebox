function throttle(fn, wait) {
    let pre;
    return function(...args) {
        const now = Date.now();
        if(!pre || now - pre >= wait) {
            pre = now;
            fn.apply(this, args);
        }
    }
}

module.exports = throttle;
