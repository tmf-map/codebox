function deepClone(obj, hash = new WeakMap()) {
  // Primitive Type
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  // Date
  if(obj instanceof Date){
    return new Date(obj);
  }
  //RegExp
  if(obj instanceof RegExp){
    return new RegExp(obj);
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
  // search hash map
  if(hash.has(obj)) return hash.get(obj);

  // Array Object
  const keys = Object.keys(obj);
  let objClone = Array.isArray(obj) ? [] : {};
  if (keys.length < 1) {
    return objClone
  }
  // add key->value to hash
  hash.set(obj, objClone);

  keys.forEach(key => {
    objClone[key] = typeof obj[key] === 'object' ? deepClone(obj[key], hash) : deepClone(obj[key]);
  });
  return objClone;
}

module.exports = deepClone;
