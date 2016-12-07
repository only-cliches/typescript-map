#!/bin/bash

./node_modules/.bin/tsc
cd dist
./../node_modules/.bin/webpack index.js index.min.js
rm index.js
./../node_modules/.bin/uglifyjs -o index.min.js index.min.js
echo "$(cat index.min.js)" | gzip -9f | wc -c;