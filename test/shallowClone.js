import test from 'ava';
import shallowClone from '../src/shallowClone'

test('input string', t => {
    t.is(shallowClone('abc'), 'abc');
});
test('input number', t => {
    t.is(shallowClone(-1980), -1980);
});
test('input null', t => {
    t.is(shallowClone(null), null);
});
test('input undefined', t => {
    t.is(shallowClone(undefined), undefined);
});
test('input false', t => {
    t.is(shallowClone(false), false);
});
test('input Date', t => {
    let date = new Date();
    let dateCopy = shallowClone(date);
    t.false(date === dateCopy);
    t.true(date.getTime() === dateCopy.getTime());
});
test('input RegExp', t => {
    let reg = new RegExp(/\w/);
    let regCopy = shallowClone(reg);
    t.false(reg === regCopy);
    t.true('' + reg === '' + regCopy)
});
test('input simple Set', t => {
    let s1 = new Set([1, 2, 3, [4,5]]);
    let s2 = shallowClone(s1);
    t.false(s1 === s2);
    t.true([...s1].join() === [...s2].join());
    s2.delete(1);
    t.true(s1.size === s2.size + 1);
});
test('input  Set', t => {
    let s1 = new Set([{a: 10}]);
    let s2 = shallowClone(s1);
    t.false(s1 === s2);
    s1.forEach(value => value.a = 20);
    t.true([...s1][0] === [...s2][0]);
});
test('input Map', t => {
    let s1 = new Map([[{a: 10}, {b: 20}]]);
    let s2 = shallowClone(s1);
    t.false(s1 === s2);
    s1.forEach((value, key)=> {key.a = 1; value.b = 2});
    t.true([...s1][0][0]['a'] === [...s2][0][0]['a']);
    t.true([...s1][0][1]['b'] ===[...s2][0][1]['b']);
});
test('input Array', t => {
    let obj = [1, {a: 3}, [5, 6]];
    let objCopy = shallowClone(obj);
    t.false(obj === objCopy);
    t.true(obj[0] === objCopy[0]);
    t.true(obj[1] === objCopy[1]);
    t.true(obj[2] === objCopy[2]);
    obj[1]['a'] = 2;
    t.is(objCopy[1]['a'], 2);
    obj[2][0] = 6;
    t.is(objCopy[2][0], 6);
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
    let objCopy = shallowClone(obj);
    t.false(obj === objCopy);
    t.true(obj.c === objCopy.c);
    t.true(obj.f === objCopy.f);
    t.true(JSON.stringify(obj) === JSON.stringify(objCopy));
    t.true(obj.a === objCopy.a);
    t.true(obj.b === objCopy.b);
    t.true(obj.und === objCopy.und);
    t.true(obj.nul === objCopy.nul);
    t.true(obj.c.d === objCopy.c.d);
    obj.c.d = 5;
    t.true(obj.c.d === objCopy.c.d);
});
