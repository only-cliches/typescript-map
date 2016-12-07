# typescript-map
ES6 Map implemented in Typescript.

This is not an ES6 Map polyfill, it is not a pure implementation (but it's really close!).
I just needed a way to declare maps in my ts code in a safe, reusable way without taking dozens of kilobytes.

Under 800 bytes gzipped. :)

# Installation
`npm install https://github.com/ClickSimply/typescript-map`

The lib creates a single global variable: `tsMap`

If you're using typescript/ES6:
```
import { tsMap } from "typescript-map"
```

If you're using node:
```
var map = require("typescript-map");
```

If you're just using it in the browser:

1. Download `dist/tsmap.min.js`

2. Include it in your head: `<script src="tsmap.min.js"></script>`.  You may want to rename the file before dropping into your project.

# Usage


```
var myMap = new tsMap();
myMap.set('foo','bar');
console.log(myMap.get('foo')) //<= "bar"

//Typescript
var myMap = new tsMap<String,Number>();
myMap.set('foo',2);

//ES6 Maps take an array of arrays as the optional init object:
var myMap = new tsMap([
    ['foo','bar'],
    ['key','value']
])


//Also includes several functions that aren't in the spec:

//Import JSON into the map
var myMap = new tsMap().fromJSON({
    foo:'bar',
    key:'value'
});

//Export the map to JSON
var myJSON = myMap.toJSON();

//Map the map (insert meme here).  Returns an array, not the map.
var anArray = myMap.map(function(value, key) {
    return value + " oh look, another hippy".
});

//Filter the map (removes items in the current map)
myMap.filter(function(value, key) {
    return key%2; //Remove all even objects;
});

```

Everything is documented in the src/index.ts file and the definitions file is pretty clear.  If you need a full doc on using Maps look here:
[MDN Map Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

# Building
`npm install && npm run build`

# License
MIT