import test from 'ava';
import shallowEqual from '../src/shallowEqual'

test('string', t => {
    t.true(shallowEqual('abc','abc'));
    t.false(shallowEqual('abc','ab'));
});
test('number', t => {
    t.true(shallowEqual(100, 100));
    t.false(shallowEqual(12, 1));
});
test('all zero should be equal', t => {
    t.true(shallowEqual(-0, +0));
    t.true(shallowEqual(-0, 0));
    t.true(shallowEqual(+0, 0));
});
test('NaN', t => {
    t.true(shallowEqual(NaN, NaN));
    t.false(shallowEqual(NaN, 1));
});
test('null', t => {
    t.false(shallowEqual(null, {}));
    t.true(shallowEqual(null, null));
    t.false(shallowEqual(null, undefined));
});
test('undefined', t => {
    t.true(shallowEqual(undefined, undefined));
    t.false(shallowEqual(undefined, 0));
});
test('boolean', t => {
    t.true(shallowEqual(false, false));
    t.false(shallowEqual(false, true));
});
test('symbol', t => {
    t.true(shallowEqual(Symbol.for('test'), Symbol.for('test')));
    t.false(shallowEqual(Symbol('test'), Symbol('test')));
});
test('Date', t => {
    const a = new Date('2019-2-1');
    const b = new Date('2019-2-1');
    const c = new Date('2019-3-1');
    t.true(shallowEqual(a, b));
    t.false(shallowEqual(a, c));
});
test('RagExp', t => {
    const a = new RegExp('test');
    const b = new RegExp('test');
    t.true(shallowEqual(a, b));
    t.false(shallowEqual(a, /^test$/));
});
test('Set', t => {
    const a = new Set([1, 'da', null, {a: 'test', b: [1, 'a']}]);
    const b = new Set([1, 'da', null, {a: 'test', b: [1, 'a']}]);
    const c = new Set([1, 'da', null, {a: 'test', b: [1, 'b']}]);
    const d = new Set([1, 'da', null]);
    const e = new Set([1, 'da', null]);
    t.false(shallowEqual(a, b));
    t.false(shallowEqual(a, c));
    t.true(shallowEqual(d, e));
});
test('Map', t => {
    const a = new Map([[{a: 'b'}, {c: 'd'}],['test', null]]);
    const b = new Map([[{a: 'b'}, {c: 'd'}],['test', null]]);
    const c = new Map([[{a: 'e'}, {c: 'd'}],['test', null]]);
    const d = new Map([[{a: 'e'}, 123],['test', null]]);
    const e = new Map([[{a: 'e'}, 123],['test', null]]);
    const f = new Map([['a', 123],['test', null]]);
    const g = new Map([['a', 123],['test', null]]);
    const h = new Map([['a', 123]]);
    t.false(shallowEqual(a, b));
    t.false(shallowEqual(a, c));
    // Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
    // 0和-0等，NaN和NaN等，===与Object.is的结合
    t.false(shallowEqual(d, e));
    t.true(shallowEqual(f, g));
    t.false(shallowEqual(g, h));
});
test('Array', t => {
    const a = ['a', 1, null, undefined, {a: 'b', b: {c: [1,2,3]}}, new Set(), new Map()];
    const b = ['a', 1, null, undefined, {a: 'b', b: {c: [1,2,3]}}, new Set(), new Map()];
    const c = ['a', 1, null, undefined, new Set(), new Map(), {a: 'b', b: {c: [1,2,3]}}];
    const d = ['a', 1, null, undefined, {a: 'b'}, new Set(), new Map()];
    const e = [1, 2, 'abc', true, undefined, null];
    const f = [1, 2, 'abc', true, undefined, null];
    t.false(shallowEqual(a, b));
    t.false(shallowEqual(a, c));
    t.false(shallowEqual(b, c));
    t.true(shallowEqual(e, f));
});
test('Function', t => {
    const a = () => {};
    const b = () => {};
    t.false(shallowEqual(a, b));
});
test('Object', t => {
    const a = {a: 'abc', b: {b1: 123}};
    const b = {a: 'abc', b: {b1: 123}};
    const c = {a: 'abc', b: 123};
    const d = {a: 'abc', b: 123};
    t.false(shallowEqual(a, b));
    t.false(shallowEqual(a, c));
    t.true(shallowEqual(c, d));
});
test('empty Object', t => {
    t.true(shallowEqual({}, {}));
});
test('empty Array', t => {
    t.true(shallowEqual([], []));
});
