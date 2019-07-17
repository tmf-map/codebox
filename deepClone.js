function deepClone(obj) {
  // 原始类型，直接返回
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
  // 引用类型
  const keys = Object.keys(obj);
  let objClone = Array.isArray(obj) ? [] : {};
  if (keys.length < 1) {
    return objClone
  }
  keys.forEach(key => objClone[key] = deepClone(obj[key]));
  return objClone;
}

module.exports = deepClone;
