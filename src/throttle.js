function throttle(fn, wait) {
    let pre = 0;
    return function(...args) {
        const now = Date.now();
        if(now - pre >= wait) {
            pre = now;
            fn.apply(this, args);
        }
    }
}

module.exports = throttle;
