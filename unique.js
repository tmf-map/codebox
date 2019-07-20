function unique(arr) {
  let newArr = [];
  arr.forEach(v => {
    !newArr.includes(v) && newArr.push(v);
  })
  return newArr;
}

module.exports = unique
