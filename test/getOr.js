import test from 'ava';

import getOr from '../src/getOr'

test('a regular path and object ', t => {
    let object = { 'arr': [{ 'b': { 'c': 3 } }] };
    t.is(getOr('defalutValue','arr[0].b.c', object), 3);
    t.is(getOr('defalutValue',['arr', 0, 'b', 'c'], object), 3);
});

test('an irregular path', t => {
    let object = { 'arr': [{ 'b': { 'c': 3 } }] };

    t.is(getOr('defalutValue','arr.b.c', object), 'defalutValue');
    t.is(getOr(0,'arr[0].b.d.e', object), 0);
    t.is(getOr(false,'arr[0].b.d.e', object), false);

    let defalutValue = [];
    t.is(getOr(defalutValue,['arr', 'b', 'c'], object), defalutValue);
    t.is(getOr(defalutValue,['arr', 'e', 'd'], object), defalutValue);

    t.is(getOr(false,null, object), false);
    t.is(getOr(false,undefined, object), false);
    t.is(getOr('','', object), '');
});

test('an irregular object', t => {
    let obj = ['a'];
    t.is(getOr(false,'arr.b.c', null), false);
    t.is(getOr('defaultValue','arr.b.c', undefined), 'defaultValue');
    t.is(getOr(obj,'a', obj), obj);
});

test('object contains null value', t => {
    let data = { 'a': [{ 'b': { 'c': 3 , 'd': null} }] };
    t.is(getOr('default','a[0].b.d', data), null);
});

test('a irregular path and object ', t => {
    t.is(getOr(false,undefined, undefined), false);
    t.is(getOr(false,null, null), false);
});
