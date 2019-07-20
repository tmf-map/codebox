import test from 'ava';
import throttle from '../src/throttle'

test.cb('push elem with throttle wrapper', t => {
  let mockEvent = [1000, 1080, 2040, 2150, 2868, 3010];
  let actualResult = [];
  let expectedResult = [1000, 2040];
  function pushElem(v) {
    actualResult.push(v);
  }
  let pushElemEnhancer = throttle(pushElem, 1000);
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
