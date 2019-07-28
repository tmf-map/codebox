import test from 'ava';
import curry from '../src/curry'

test('add four numbers', t => {
  const addFourNumbers = (a, b, c, d) => a + b + c + d
  const curriedAddFourNumbers = curry(addFourNumbers)
  const f = curriedAddFourNumbers(1, 2)
  const g = f(3)
  t.is(g(4), 10)
})
