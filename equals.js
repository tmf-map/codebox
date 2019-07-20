const equals = (a, b) => {
  // 三等判断出是true，那肯定是true
  if (a === b) return true;

  // 三等判断出是false，只要其中一个是原始类型，那这个false是有效的
  // ps：如果a,b都是函数的话统统不等，lodash是这个效果
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a === null || b === null) return false;

  // 相同类的实例才继续，否则就没必要比了
  if (a.__proto__ !== b.__proto__) return false;
  if (a instanceof RegExp) return ''+a === ''+b;
  if (a instanceof Date) return a.getTime() ===  b.getTime();
  
  // 先看看a, b的大小，不一样也没必要比了
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;

  // 对其属性再进行递归比较
  return keys.every(k => equals(a[k], b[k]));
};

console.log(equals(1, 1))
console.log(equals(undefined, null))
console.log(equals(null, {}))
console.log(equals({}, {}))
console.log(equals([], {}))
console.log(equals(new Date('2019-09-01'), new Date('2019-09-01')))
console.log(equals(/dede/, /dede/))
