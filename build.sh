#!/bin/bash

./node_modules/.bin/tsc
cp dist/index.js index.js
cd dist
./../node_modules/.bin/webpack --mode production --output-library-type 'umd' --entry ../index.js --output-path .
mv main.js tsmap.min.js
rm index.js
echo "$(cat tsmap.min.js)" | gzip -9f | wc -c;