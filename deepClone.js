function deepClone(obj) {
  // 原始类型，直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  // Date
  if (obj instanceof Date) {
    // ...
  }
  // 引用类型
  const keys = Object.keys(obj);
  if (keys.length < 1) {
    return Array.isArray(obj) ? [] : {};
  }
  return keys.map(key => deepClone(obj[key]))
}

module.exports = deepClone;
