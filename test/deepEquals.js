import test from 'ava';
import deepEqual from '../src/deepEqual'

test('String', t => {
    t.is(deepEqual('abc','abc'), true);
    t.is(deepEqual('abc','ab'), false);
});
test('Number', t => {
    t.is(deepEqual(100, 100), true);
    t.is(deepEqual(12, 1), false);
});
test('null', t => {
    t.is(deepEqual(null, {}), false);
    t.is(deepEqual(null, null), true);
    t.is(deepEqual(null, undefined), false);
});
test('undefined', t => {
    t.is(deepEqual(undefined, undefined), true);
    t.is(deepEqual(undefined, 0), false);
});
test('Bool', t => {
    t.is(deepEqual(false, false), true);
    t.is(deepEqual(false, true), false);
});
test('Date', t => {
    const a = new Date();
    const b = new Date();
    const c = new Date(+a + 1000);
    t.is(deepEqual(a, b), true);
    t.is(deepEqual(a, c), false);
});
test('RagExp', t => {
    const a = new RegExp('test');
    const b = new RegExp('test');
    t.is(deepEqual(a, b), true);
    t.is(deepEqual(a, /^test$/), false);
});
test('Set', t => {
    const a = new Set([1, 'da', null, {a: 'test', b: [1, 'a']}]);
    const b = new Set([1, 'da', null, {a: 'test', b: [1, 'a']}]);
    const c = new Set([1, 'da', null, {a: 'test', b: [1, 'b']}]);
    t.is(deepEqual(a, b), true);
    t.is(deepEqual(a, c), false);
});
test('Map', t => {
    const a = new Map([[{a: 'b'}, {c: 'd'}],['test', null]]);
    const b = new Map([[{a: 'b'}, {c: 'd'}],['test', null]]);
    const c = new Map([[{a: 'e'}, {c: 'd'}],['test', null]]);
    t.is(deepEqual(a, b), true);
    t.is(deepEqual(a, c), false);
});
test('Array', t => {
    const a = ['a', 1, null, undefined, {a: 'b', b: {c: [1,2,3]}}, new Set(), new Map()];
    const b = ['a', 1, null, undefined, {a: 'b', b: {c: [1,2,3]}}, new Set(), new Map()];
    const c = ['a', 1, null, undefined, new Set(), new Map(), {a: 'b', b: {c: [1,2,3]}}];
    const d = ['a', 1, null, undefined, {a: 'b'}, new Set(), new Map()];
    t.is(deepEqual(a, b), true);
    t.is(deepEqual(a, c), false);
    t.is(deepEqual(b, c), false);
});
test('object', t => {
    const a = {a: 'b', b: 'c'};
    const b = {b: 'c', a: 'b'};
    const c = {a: 'b'};
    t.is(deepEqual(a, b), true);
    t.is(deepEqual(a, c), false);
});