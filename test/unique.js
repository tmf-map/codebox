import test from 'ava';
import unique from '../unique'

test('remove duplicates from unsorted array', t => {
  t.deepEqual(unique([3,2,2,3]), [3, 2]);
});
test('remove duplicates from sorted array', t => {
  t.deepEqual(unique([1,2,2,3]), [1, 2, 3]);
});
