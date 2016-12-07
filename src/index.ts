//Original code pulled from https://github.com/eriwen/es6-map-shim/

// Object.is polyfill, courtesy of @WebReflection
var is = Object['is'] || function(a, b) {
    return a === b ?
        a !== 0 || 1 / a == 1 / b :
        a != a && b != b;
};

// More reliable indexOf, courtesy of @WebReflection
var betterIndexOf = function(value) {
    if(value != value || value === 0) {
        for(var i = this.length; i-- && !is(this[i], value););
    } else {
        i = [].indexOf.call(this, value);
    }
    return i;
};


/**
 * MapIterator used for iterating over all entries in given map.
 *
 * @param map {Map} to iterate
 * @param kind {String} identifying what to yield. Possible values
 *      are 'keys', 'values' and 'keys+values'
 * @constructor
 */
var MapIterator = function(map, kind) {
    var _index = 0;

    return Object.create({}, {
        next: {
            value: function() {
                // check if index is within bounds
                if (_index < map.items().length) {
                    switch(kind) {
                        case 'keys': return map.keys()[_index++];
                        case 'values': return map.values()[_index++];
                        case 'keys+values': return [].slice.call(map.items()[_index++]);
                        default: throw new TypeError('Invalid iterator type');
                    }
                }
                // TODO: make sure I'm interpreting the spec correctly here
                throw new Error('Stop Iteration');
            }
        },
        iterator: {
            value: function() {
                return this;
            }
        },
        toString: {
            value: function() {
                return '[object Map Iterator]';
            }
        }
    });
};

export class tsMap<K,V> {

    /**
     * Used to hold any array of the map items.
     * 
     * @internal
     * @type {(Array<K|V>[])}
     * @memberOf tsMap
     */
    private _items:Array<K|V>[];

    /**
     * Used to hold an array of keys in the map
     * 
     * @internal
     * @type {K[]}
     * @memberOf tsMap
     */
    private _keys:K[];

    /**
     * Used to hold an array of values in the map
     * 
     * @internal
     * @type {V[]}
     * @memberOf tsMap
     */
    private _values:V[];

    constructor(inputMap?:Array<Array<K|V>>) {
        this._items = [];
        this._keys = [];
        this._values = [];

        let t = this;
        if(inputMap) {
            inputMap.forEach((k,v) => {
                t.set(v[0],v[1]);
            });
        }
    }

    /**
     * Converts a JSON object to an map.
     * 
     * @param {*} jsonObject
     * 
     * @memberOf tsMap
     */
    public fromJSON(jsonObject:any) {
        for (var property in jsonObject) {  
            if (jsonObject.hasOwnProperty(property)) {
                this.set(<any> property, jsonObject[property]);
            }
        }        
    }

    /**
     * Outputs the contents of the map to a JSON object
     * 
     * @returns {*}
     * 
     * @memberOf tsMap
     */
    public toJSON():any {
        let obj = {};
        let t = this;
        this.keys().forEach((k) => {
            obj[String(k)] = t.get(k);
        });
        return obj;
    }

    /**
     * Get an array of arrays respresenting the map, kind of like an export function.
     * 
     * @returns {(Array<K|V>[])}
     * 
     * @memberOf tsMap
     */
    public items():Array<K|V>[] {
        return [].slice.call(this._items);
    }

    /**
     * Get an array of keys in the map.
     * 
     * @returns {K[]}
     * 
     * @memberOf tsMap
     */
    public keys():K[] {
        return [].slice.call(this._keys);
    }

    /**
     * Get an array of the values in the map.
     * 
     * @returns {V[]}
     * 
     * @memberOf tsMap
     */
    public values():V[] {
        return [].slice.call(this._values);
    }

    /**
     * Check to see if an item in the map exists given it's key.
     * 
     * @param {K} key
     * @returns {boolean}
     * 
     * @memberOf tsMap
     */
    public has(key:K):boolean {
        var index = betterIndexOf.call(this._keys, key);
        return index > -1;
    }

    /**
     * Get a specific item from the map given it's key.
     * 
     * @param {K} key
     * @returns {V}
     * 
     * @memberOf tsMap
     */
    public get(key:K):V {
        var index = betterIndexOf.call(this._keys, key);
        return index > -1 ? this._values[index] : undefined;        
    }

    /**
     * Set a specific item in the map given it's key, automatically adds new items as needed. 
     * Ovewrrites existing items
     * 
     * @param {K} key
     * @param {V} value
     * 
     * @memberOf tsMap
     */
    public set(key:K, value:V):void {
        let t = this;
        // check if key exists and overwrite
        var index = betterIndexOf.call(t._keys, key);
        if (index > -1) {
            t._items[index][1] = value;
            t._values[index] = value;
        } else {
            t._items.push([key, value]);
            t._keys.push(key);
            t._values.push(value);
        }
    }

    /**
     * Provide a number representing the number of items in the map
     * 
     * @returns {Number}
     * 
     * @memberOf tsMap
     */
    public size():Number {
        return this._items.length;
    }

    /**
     * Clear all the contents of the map
     * 
     * @memberOf tsMap
     */
    public clear():void {
         this._keys.length = this._values.length = this._items.length = 0;
    }

    /**
     * Delete an item from the map given it's key
     * 
     * @param {K} key
     * @returns {boolean}
     * 
     * @memberOf tsMap
     */
    public delete(key:K):boolean {
        var index = betterIndexOf.call(this._keys, key);
        if (index > -1) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            this._items.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Used to loop through the map.  
     * 
     * @param {(value:V,key?:K,map?:tsMap<K,V>) => void} callbackfn
     * 
     * @memberOf tsMap
     */
    public forEach(callbackfn:(value:V,key?:K,map?:tsMap<K,V>) => void):void {
        if (typeof callbackfn != 'function') {
            throw new TypeError('Invalid callback function given to forEach');
        }

        function tryNext() {
            try {
                return iter.next();
            } catch(e) {
                return undefined;
            }
        }

        var iter = this.iterator();
        var current = tryNext();
        var next = tryNext();
        while(current !== undefined) {
            callbackfn.apply(arguments[1], [current[1], current[0], this]);
            current = next;
            next = tryNext();
        }
    }

    /**
     * Used internally in the forEach function
     * @internal
     * @returns {*}
     * 
     * @memberOf tsMap
     */
    public iterator():any {
        return MapIterator(this, 'keys+values');
    }
}