function shallowClone(obj) {

    if(typeof obj !== "object" || obj === null) {
        return obj
    }

    if(obj instanceof Set) {
        let objClone = new Set();
        obj.forEach(item => objClone.add(item));
        return objClone;
    }

    if(obj instanceof Map) {
        let objClone = new Map();
        obj.forEach((value, key) => objClone.set(key, value));
        return objClone;
    }

    const keys = Object.keys(obj);
    let objClone = Array.isArray(obj) ? [] : {};
    if (keys.length < 1) {
        return objClone
    }
    keys.forEach(key => objClone[key] = obj[key]);
    return objClone;
}