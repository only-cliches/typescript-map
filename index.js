module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	var tsMap = (function () {
	    function tsMap(inputMap) {
	        var t = this;
	        t._items = [];
	        t._keys = [];
	        t._values = [];
	        t.length = 0;
	        if (inputMap) {
	            inputMap.forEach(function (k, v) {
	                t.set(v[0], v[1]);
	            });
	        }
	    }
	    tsMap.prototype.fromJSON = function (jsonObject) {
	        for (var property in jsonObject) {
	            if (jsonObject.hasOwnProperty(property)) {
	                this.set(property, jsonObject[property]);
	            }
	        }
	    };
	    tsMap.prototype.toJSON = function () {
	        var obj = {};
	        var t = this;
	        t.keys().forEach(function (k) {
	            obj[String(k)] = t.get(k);
	        });
	        return obj;
	    };
	    tsMap.prototype.entries = function () {
	        return [].slice.call(this._items);
	    };
	    tsMap.prototype.keys = function () {
	        return [].slice.call(this._keys);
	    };
	    tsMap.prototype.values = function () {
	        return [].slice.call(this._values);
	    };
	    tsMap.prototype.has = function (key) {
	        return this._keys.indexOf(key) > -1;
	    };
	    tsMap.prototype.get = function (key) {
	        var i = this._keys.indexOf(key);
	        return i > -1 ? this._values[i] : undefined;
	    };
	    tsMap.prototype.set = function (key, value) {
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
	    tsMap.prototype.size = function () {
	        return this._items.length;
	    };
	    tsMap.prototype.clear = function () {
	        var t = this;
	        t._keys.length = t._values.length = t._items.length = 0;
	        t.length = t.size();
	    };
	    tsMap.prototype.delete = function (key) {
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
	    tsMap.prototype.forEach = function (callbackfn) {
	        var t = this;
	        t._keys.forEach(function (v) {
	            callbackfn(t.get(v), v);
	        });
	    };
	    tsMap.prototype.map = function (callbackfn) {
	        var t = this;
	        return this._keys.map(function (itemKey) {
	            return callbackfn(t.get(itemKey), itemKey);
	        });
	    };
	    tsMap.prototype.filter = function (callbackfn) {
	        var t = this;
	        t._keys.forEach(function (v) {
	            if (callbackfn(t.get(v), v) == false)
	                t.delete(v);
	        });
	        return this;
	    };
	    tsMap.prototype.clone = function () {
	        return new tsMap(JSON.parse(JSON.stringify(this._items)));
	    };
	    return tsMap;
	}());
	exports.tsMap = tsMap;


/***/ }
/******/ ]);