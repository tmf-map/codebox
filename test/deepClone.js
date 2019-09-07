import test from 'ava';
import deepClone from '../src/deepClone'

test('input string', t => {
  t.is(deepClone('abc'), 'abc');
});
test('input number', t => {
  t.is(deepClone(-1980), -1980);
});
test('input null', t => {
  t.is(deepClone(null), null);
});
test('input undefined', t => {
  t.is(deepClone(undefined), undefined);
});
test('input false', t => {
  t.is(deepClone(false), false);
});
test('input simple object', t => {
  let obj = {
    a: 1,
    b: 'string',
    c: {
      d: 3,
      e: 4
    },
    f: [1, 2],
    und: undefined,
    nul: null
  };
  let objCopy = deepClone(obj);
  t.false(obj === objCopy);
  t.false(obj.c === objCopy.c);
  t.false(obj.f === objCopy.f);
  t.true(JSON.stringify(obj) === JSON.stringify(objCopy));
  t.true(obj.a === objCopy.a);
  t.true(obj.b === objCopy.b);
  t.true(obj.c.d === objCopy.c.d);
  t.true(obj.und === objCopy.und);
  t.true(obj.nul === objCopy.nul);
});
test.skip('input function', t => {
  let foo1 = () => console.log(1);
  let foo2 = function () {
    console.log(1);
  }
  let foo1Copy = deepClone(foo1);
  let foo2Copy = deepClone(foo2);
  t.false(foo1 === foo1Copy);
  t.false(foo2 === foo2Copy);
  t.true(foo1.toString() === foo1Copy.toString());
  t.true(foo2.toString() === foo2Copy.toString());
});
test('input Date', t => {
  let date = new Date();
  let dateCopy = deepClone(date);
  t.false(date === dateCopy);
  t.true(date.getTime() === dateCopy.getTime());
});
test('input RegExp', t => {
    let reg = new RegExp(/\w/);
    let deepCopy = deepClone(reg);
    t.false(reg === deepCopy);
    t.true('' + reg === '' + deepCopy)
});
test('input Symbol', t => {
  let s1 = Symbol();
  let s2 = deepClone(s1);
  t.true(s1 === s2);
})
test('input Set', t => {
  let s1 = new Set([1, 2, 3, 4]);
  let s2 = deepClone(s1);
  t.false(s1 === s2);
  t.deepEqual(Array.from(s1), Array.from(s2))
})
test.skip('input WeakSet', t => {
  let a = [1, 2];
  let b = [3, 4];
  let ws1 = new WeakSet();
  ws1.add(a);
  ws1.add(b);
  let ws2 = deepClone(ws1);
  t.false(ws1 === ws2);
  t.true(ws2.has(a));
  t.true(ws2.has(b));
  ws1.delete(a);
  t.true(ws2.has(a));
})
test('input Map', t => {
  let m1 = new Map();
  let key = {p: 'Hello World'};
  m1.set(key, 'content');
  let m2 = deepClone(m1);
  t.false(m1 === m2);
  t.false(m2.has(key));
  t.deepEqual([...m1], [...m2]);
});
test('Circular reference', t => {
  let obj = {
    a: 1,
    b: 'string',
  };
  obj.c = obj;
  t.deepEqual(deepClone(obj), obj)
});
test.skip('input WeakMap', t => {
  let wm1 = new WeakMap();
  let key = {p: 'Hello World'};
  wm1.set(key, 'content');
  let wm2 = deepClone(wm1);
  t.false(wm1 === wm2);
  t.false(wm2.has(key));
  t.deepEqual([...wm1], [...wm2]);
});
