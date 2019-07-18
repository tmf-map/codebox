function deepClone(obj) {
  // Primitive Type
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const Constructor = obj.constructor;
  // Date
  if (obj instanceof Date) {
    return new Constructor(obj.getTime());
  }
  //RegExp
  if(obj instanceof RegExp) {
    return new Constructor(obj);
  }
  // Set
  if(obj instanceof Set) {
    let objClone = new Set();
    obj.forEach(item => objClone.add(deepClone(item)));
    return objClone;
  }
  // Map
  if(obj instanceof Map) {
    let objClone = new Map();
    obj.forEach((value, key) => objClone.set(deepClone(key), deepClone(value)));
    return objClone
  }
  // Array Object
  const keys = Object.keys(obj);
  let objClone = Array.isArray(obj) ? [] : {};
  if (keys.length < 1) {
    return objClone
  }
  keys.forEach(key => objClone[key] = deepClone(obj[key]));
  return objClone;
}

module.exports = deepClone;
