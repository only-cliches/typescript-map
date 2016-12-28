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
    TSMap.prototype.fromJSON = function (jsonObject) {
        for (var property in jsonObject) {
            if (jsonObject.hasOwnProperty(property)) {
                this.set(property, jsonObject[property]);
            }
        }
    };
    TSMap.prototype.toJSON = function () {
        var obj = {};
        var t = this;
        t.keys().forEach(function (k) {
            obj[String(k)] = t.get(k);
        });
        return obj;
    };
    TSMap.prototype.entries = function () {
        return [].slice.call(this._items);
    };
    TSMap.prototype.keys = function () {
        return [].slice.call(this._keys);
    };
    TSMap.prototype.values = function () {
        return [].slice.call(this._values);
    };
    TSMap.prototype.has = function (key) {
        return this._keys.indexOf(key) > -1;
    };
    TSMap.prototype.get = function (key) {
        var i = this._keys.indexOf(key);
        return i > -1 ? this._values[i] : undefined;
    };
    TSMap.prototype.set = function (key, value) {
        var t = this;
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
    };
    TSMap.prototype.size = function () {
        return this._items.length;
    };
    TSMap.prototype.clear = function () {
        var t = this;
        t._keys.length = t._values.length = t._items.length = 0;
        t.length = t.size();
    };
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
    TSMap.prototype.forEach = function (callbackfn) {
        var t = this;
        t._keys.forEach(function (v) {
            callbackfn(t.get(v), v);
        });
    };
    TSMap.prototype.map = function (callbackfn) {
        var t = this;
        return this._keys.map(function (itemKey) {
            return callbackfn(t.get(itemKey), itemKey);
        });
    };
    TSMap.prototype.filter = function (callbackfn) {
        var t = this;
        t._keys.forEach(function (v) {
            if (callbackfn(t.get(v), v) == false)
                t.delete(v);
        });
        return this;
    };
    TSMap.prototype.clone = function () {
        return new TSMap(JSON.parse(JSON.stringify(this._items)));
    };
    return TSMap;
}());
exports.TSMap = TSMap;
