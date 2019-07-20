function throttle(fn, wait, ...args) {
    let pre = 0;
    return function() {
        const now = Date.now();
        if(now - pre >= wait) {
            pre = now;
            fn.apply(this, args);
        }
    }
}
