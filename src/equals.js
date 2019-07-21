function equals(value, other) {
    if(value === other) return true;
    if(typeof value !== 'object' || typeof other !== 'object') return false;
    if(value === null || other === null) return false;
    if(value.__proto__ !== other.__proto__) return false;
    if(value instanceof RegExp) return '' + value === '' + other;
    if(value instanceof Date) return + value === + other;
    if(value instanceof Set || value instanceof Map) return equals([...value],[...other]);
    const keys = Object.keys(value);
    if(keys.length !== Object.keys(other).length) return false;
    if(keys.length === 0) return true;
    return keys.every(k => equals(value[k], other[k]));
}
