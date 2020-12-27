const TSMap = require("./dist/index.js").TSMap;

const sellOrderMap = new TSMap();
sellOrderMap.sortedSet(1, 2);
sellOrderMap.sortedSet(1, 3);
sellOrderMap.sortedSet(4, 5);
sellOrderMap.sortedSet(3, 5);
sellOrderMap.sortedSet(9, 5);
sellOrderMap.sortedSet(7, 5);
sellOrderMap.sortedSet(50, 5);
sellOrderMap.sortedSet(2, 5);
sellOrderMap.delete(4);
console.log(sellOrderMap.entries());