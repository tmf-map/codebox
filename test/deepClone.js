import test from 'ava';
import deepClone from '../deepClone'

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
test('input simple obj', t => {
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
test('input function', t => {
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
