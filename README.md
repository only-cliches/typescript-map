# typescript-map
ES6 Map implemented in Typescript.

This is not an ES6 Map polyfill, it is not a pure implementation (but it's close!).
I just needed a way to declare maps in my code in a safe, reusable way without taking dozens of kilobytes.

Just over 1kb gzipped. :)

# Installation
npm install https://github.com/ClickSimply/typescript-map

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
1. Download `dist/index.min.js`
2. Include it in your head: `<script src="index.min.js"></script>`.  You may want to rename the file before dropping into your project.

# Usage


```
var myMap = new tsMap();
myMap.set('foo','bar');
console.log(myMap.get('foo')) //<= "bar"

//Typescript
var myMap = new tsMap<String,Number>();
myMap.set('foo',2);
....

//ES6 Maps take an array of arrays as the optional init object:
var myMap = new tsMap([
    ['foo','bar'],
    ['key','value']
])

//Alternatively you can import JSON using the helper function:
var myMap = new tsMap().fromJSON({
    foo:'bar',
    key:'value'
});

```

Everything is documented and the definitions file is pretty clear.  If you need a full doc on using Maps look elsewhere.

# Building
`npm install && npm run build`

# License
MIT