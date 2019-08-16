import test from 'ava';

import get from '../src/get'

test('path is a string type', t => {
    let object = { 'arr': [{ 'b': { 'c': 3 } }] };
    t.is(get('arr.b.c', object), undefined);
    t.is(get('arr[0].b.d.e', object), undefined);
    t.is(get('arr[0].b.c', object), 3);
});

test('path is a array type', t => {
    let object = { 'arr': [{ 'b': { 'c': 3 } }] };
    t.is(get(['arr', 'b', 'c'], object), undefined);
    t.is(get(['arr', 0, 'b', 'c'], object), 3);
});