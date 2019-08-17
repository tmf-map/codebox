import test from 'ava';
import get from '../src/get'

test('a regular path and object ', t => {
    let object = { 'arr': [{ 'b': { 'c': 3 } }] };
    t.is(get('arr[0].b.c', object), 3);
    t.is(get(['arr', 0, 'b', 'c'], object), 3);
});

test('an irregular path', t => {
    let object = { 'arr': [{ 'b': { 'c': 3 } }] };

    t.is(get('arr.b.c', object), undefined);
    t.is(get('arr[0].b.d.e', object), undefined);
    t.is(get('arr[0].b.d.e', object), undefined);

    t.is(get(['arr', 'b', 'c'], object), undefined);
    t.is(get(['arr', 'e', 'd'], object), undefined);
    t.is(get([], object), undefined);

    t.is(get(null, object), undefined);
    t.is(get(undefined, object), undefined);
    t.is(get('', object), undefined);
});

test('an irregular object', t => {
    t.is(get('arr.b.c', null), undefined);
    t.is(get('arr.b.c', undefined), undefined);
    t.is(get('a',['a']), undefined);
    t.is(get('a', 'abc'), undefined)
});

test('a irregular path and object ', t => {
    t.is(get(undefined, undefined), undefined);
    t.is(get(null, null), undefined);
});
