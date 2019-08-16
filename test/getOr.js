import test from 'ava';

import getOr from '../src/getOr'

test('path is a string type', t => {
    let object = { 'arr': [{ 'a': { 'b': 3 } }] };
    t.is(getOr('default','arr.a.b', object), 'default');
    t.is(getOr('default', 'arr[0].a.d.e', object), 'default');
    t.is(getOr('default','arr[0].a.b', object), 3);
});

test('path is a array type', t => {
    let object = { 'arr': [{ 'a': { 'b': 3 } }] };
    t.is(getOr('default',['arr', 'a', 'b'], object), 'default');
    t.is(getOr('default',['arr', 0, 'a', 'b'], object), 3);
});