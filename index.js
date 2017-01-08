"use strict";
var TSMap = (function () {
    function TSMap(inputMap) {
        var t = this;
        t._items = [];
        t._keys = [];
        t._values = [];
        t.length = 0;
        if (inputMap) {
            inputMap.forEach(function (v, k) {
                t.set(v[0], v[1]);
            });
        }
    }
    /**
     * Converts a JSON object to an map.
     *
     * @param {*} jsonObject
     *
     * @memberOf TSMap
     */
    TSMap.prototype.fromJSON = function (jsonObject) {
        for (var property in jsonObject) {
            if (jsonObject.hasOwnProperty(property)) {
                this.set(property, jsonObject[property]);
            }
        }
        return this;
    };
    /**
     * Outputs the contents of the map to a JSON object
     *
     * @returns {Object}
     *
     * @memberOf TSMap
     */
    TSMap.prototype.toJSON = function () {
        var obj = {};
        var t = this;
        t.keys().forEach(function (k) {
            obj[String(k)] = t.get(k);
        });
        return obj;
    };
    /**
     * Get an array of arrays respresenting the map, kind of like an export function.
     *
     * @returns {(Array<Array<K|V>>)}
     *
     * @memberOf TSMap
     */
    TSMap.prototype.entries = function () {
        return [].slice.call(this._items);
    };
    /**
     * Get an array of keys in the map.
     *
     * @returns {Array<K>}
     *
     * @memberOf TSMap
     */
    TSMap.prototype.keys = function () {
        return [].slice.call(this._keys);
    };
    /**
     * Get an array of the values in the map.
     *
     * @returns {Array<V>}
     *
     * @memberOf TSMap
     */
    TSMap.prototype.values = function () {
        return [].slice.call(this._values);
    };
    /**
     * Check to see if an item in the map exists given it's key.
     *
     * @param {K} key
     * @returns {Boolean}
     *
     * @memberOf TSMap
     */
    TSMap.prototype.has = function (key) {
        return this._keys.indexOf(key) > -1;
    };
    /**
     * Get a specific item from the map given it's key.
     *
     * @param {K} key
     * @returns {V}
     *
     * @memberOf TSMap
     */
    TSMap.prototype.get = function (key) {
        var i = this._keys.indexOf(key);
        return i > -1 ? this._values[i] : undefined;
    };
    /**
     * Set a specific item in the map given it's key, automatically adds new items as needed.
     * Ovewrrites existing items
     *
     * @param {K} key
     * @param {V} value
     *
     * @memberOf TSMap
     */
    TSMap.prototype.set = function (key, value) {
        var t = this;
        // check if key exists and overwrite
        var i = this._keys.indexOf(key);
        if (i > -1) {
            t._items[i][1] = value;
            t._values[i] = value;
        }
        else {
            t._items.push([key, value]);
            t._keys.push(key);
            t._values.push(value);
        }
        t.length = t.size();
        return this;
    };
    /**
     * Provide a number representing the number of items in the map
     *
     * @returns {number}
     *
     * @memberOf TSMap
     */
    TSMap.prototype.size = function () {
        return this._items.length;
    };
    /**
     * Clear all the contents of the map
     *
     * @returns {TSMap<K,V>}
     *
     * @memberOf TSMap
     */
    TSMap.prototype.clear = function () {
        var t = this;
        t._keys.length = t._values.length = t._items.length = 0;
        t.length = t.size();
        return this;
    };
    /**
     * Delete an item from the map given it's key
     *
     * @param {K} key
     * @returns {Boolean}
     *
     * @memberOf TSMap
     */
    TSMap.prototype.delete = function (key) {
        var t = this;
        var i = t._keys.indexOf(key);
        if (i > -1) {
            t._keys.splice(i, 1);
            t._values.splice(i, 1);
            t._items.splice(i, 1);
            t.length = t.size();
            return true;
        }
        return false;
    };
    /**
     * Used to loop through the map.
     *
     * @param {(value:V,key?:K,index?:number) => void} callbackfn
     *
     * @memberOf TSMap
     */
    TSMap.prototype.forEach = function (callbackfn) {
        var t = this;
        var i = 0;
        t._keys.forEach(function (v) {
            callbackfn(t.get(v), v, i);
            i++;
        });
    };
    /**
     * Returns an array containing the returned value of each item in the map.
     *
     * @param {(value:V,key?:K) => void} callbackfn
     * @returns {*}
     *
     * @memberOf TSMap
     */
    TSMap.prototype.map = function (callbackfn) {
        var t = this;
        return this._keys.map(function (itemKey) {
            return callbackfn(t.get(itemKey), itemKey);
        });
    };
    /**
     * Removes items based on a conditional function passed to filter
     *
     * @param {(value:V,key?:K) => Boolean} callbackfn
     * @returns {TSMap<K,V>}
     *
     * @memberOf TSMap
     */
    TSMap.prototype.filter = function (callbackfn) {
        var t = this;
        t._keys.forEach(function (v) {
            if (callbackfn(t.get(v), v) == false)
                t.delete(v);
        });
        return this;
    };
    /**
     * Creates a deep copy of the map, breaking all references to the old map and it's children.
     * Uses JSON.parse so any functions will be stringified and lose their original purpose.
     *
     * @returns {TSMap<K,V>}
     *
     * @memberOf TSMap
     */
    TSMap.prototype.clone = function () {
        return new TSMap(JSON.parse(JSON.stringify(this._items)));
    };
    return TSMap;
}());
exports.TSMap = TSMap;
