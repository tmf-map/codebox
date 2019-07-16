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
test('input obj', t => {
  let obj = {
    a: 1,
    b: () => console.log(1),
    c: {
      d: 3,
      e: 4
    },
    f: [1, 2],
    und: undefined,
    nul: null
  }
  let objCopy = deepClone(obj);
	t.false(obj === objCopy);
	t.false(obj.c === objCopy.c);
	t.false(obj.b === objCopy.b);
  t.false(obj.f === objCopy.f);
  t.is(obj.nul, null);
  t.is(obj.und, undefined);
});
test('input Date', t => {
  let date = new Date();
  let dateCopy = deepClone(date);
  t.false(date === dateCopy);
  // t.true(date.getTime() === dateCopy.getTime());
})
