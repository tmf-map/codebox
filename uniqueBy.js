const users = [
  { id: 1, name: "a" },
  { id: 2, name: "a" },
  { id: 3, name: "b" },
  { id: 4, name: "v" }
];

Array.prototype.uniqBy = function(uniqKey) {
  let uniqList = []
  for(let i = 0; i < this.length; i++) {
    let item = this[i][uniqKey]
    uniqList.includes(item) ? delete this[i] : uniqList.push(item)
  }
  return this;
};

console.log(users.uniqBy('name'))
