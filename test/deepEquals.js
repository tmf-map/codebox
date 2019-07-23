import test from 'ava';
import deepEqual from '../src/deepEqual'

test('String', t => {
    t.true(deepEqual('abc','abc'));
    t.false(deepEqual('abc','ab'));
});
test('Number', t => {
    t.true(deepEqual(100, 100));
    t.false(deepEqual(12, 1));
});
test('null', t => {
    t.false(deepEqual(null, {}));
    t.true(deepEqual(null, null));
    t.false(deepEqual(null, undefined));
});
test('undefined', t => {
    t.true(deepEqual(undefined, undefined));
    t.false(deepEqual(undefined, 0));
});
test('Bool', t => {
    t.true(deepEqual(false, false));
    t.false(deepEqual(false, true));
});
test('Symbol', t => {
    t.true(deepEqual(Symbol.for('test'), Symbol.for('test')));
    t.false(deepEqual(Symbol('test'), Symbol('test')));
});
test('Date', t => {
    const a = new Date();
    const b = new Date(+a);
    const c = new Date(+a + 1000);
    t.true(deepEqual(a, b));
    t.false(deepEqual(a, c));
});
test('RagExp', t => {
    const a = new RegExp('test');
    const b = new RegExp('test');
    t.true(deepEqual(a, b));
    t.false(deepEqual(a, /^test$/));
});
test('Set', t => {
    const a = new Set([1, 'da', null, {a: 'test', b: [1, 'a']}]);
    const b = new Set([1, 'da', null, {a: 'test', b: [1, 'a']}]);
    const c = new Set([1, 'da', null, {a: 'test', b: [1, 'b']}]);
    t.true(deepEqual(a, b));
    t.false(deepEqual(a, c));
});
test('Map', t => {
    const a = new Map([[{a: 'b'}, {c: 'd'}],['test', null]]);
    const b = new Map([[{a: 'b'}, {c: 'd'}],['test', null]]);
    const c = new Map([[{a: 'e'}, {c: 'd'}],['test', null]]);
    t.true(deepEqual(a, b));
    t.false(deepEqual(a, c));
});
test('Array', t => {
    const a = ['a', 1, null, undefined, {a: 'b', b: {c: [1,2,3]}}, new Set(), new Map()];
    const b = ['a', 1, null, undefined, {a: 'b', b: {c: [1,2,3]}}, new Set(), new Map()];
    const c = ['a', 1, null, undefined, new Set(), new Map(), {a: 'b', b: {c: [1,2,3]}}];
    const d = ['a', 1, null, undefined, {a: 'b'}, new Set(), new Map()];
    t.true(deepEqual(a, b));
    t.false(deepEqual(a, c));
    t.false(deepEqual(b, c));
});
test('object', t => {
    const a = {a: 'b', b: 'c'};
    const b = {b: 'c', a: 'b'};
    const c = {a: 'b'};
    t.true(deepEqual(a, b));
    t.false(deepEqual(a, c));
});
