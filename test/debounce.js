import test from 'ava';
import debounce from '../src/debounce'

test.cb('push elem with debounce wrapper', t => {
  let mockEvent = [1000, 1080, 2040, 2150, 2868, 3010];
  let actualResult = [];
  let expectedResult = [3010];
  function pushElem(v) {
    actualResult.push(v);
  }
  let pushElemEnhancer = debounce(pushElem, 1000);
  mockEvent.forEach(time => {
    setTimeout(() => {
      pushElemEnhancer(time);
    }, time)
  })
  setTimeout(() => {
    t.deepEqual(actualResult, expectedResult);
    t.end();
  }, 5000)
});
