function deepEqual(a, b) {
    // 三等判断出是true，那肯定是true
    if (a === b) return true;
    if(Object.is(a, NaN)) return Object.is(b, NaN);

    // 三等判断出是false，只要其中一个是原始类型，那这个false是有效的
    // ps：如果a,b都是函数的话统统不等，lodash是这个效果
    if (typeof a !== 'object' || typeof b !== 'object') return false;
    if (a === null || b === null) return false;

    // 相同类的实例才继续，否则就没必要比了
    if (a.__proto__ !== b.__proto__) return false;
    if (a instanceof RegExp) return '' + a === '' + b;
    if (a instanceof Date) return +a === +b;
    if (a instanceof Set || a instanceof Map) return deepEqual([...a], [...b]);
    
    // 先看看a, b的大小，不一样也没必要比了
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
    
    // a, b都是空对象
    if(keys.length === 0) return true;

    // 对其属性再进行递归比较
    return keys.every(k => deepEqual(a[k], b[k]));
}

module.exports = deepEqual;