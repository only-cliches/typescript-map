export class TSMap<K,V> {

    public length:number;

    /**
     * Used to hold any array of the map items.
     * 
     * @internal
     * @type {(Array<Array<K|V>>)}
     * @memberOf TSMap
     */
    private _items:Array<Array<K|V>>;

    /**
     * Used to hold an array of keys in the map
     * 
     * @internal
     * @type {Array<K>}
     * @memberOf TSMap
     */
    private _keys:Array<K>;

    /**
     * Used to hold an array of values in the map
     * 
     * @internal
     * @type {Array<V>}
     * @memberOf TSMap
     */
    private _values:Array<V>;

    constructor(inputMap?:Array<Array<K|V>>) {
        let t = this;

        t._items = [];
        t._keys = [];
        t._values = [];
        t.length = 0;

        if(inputMap) {
            inputMap.forEach((v,k) => {
                t.set(<K> v[0],<V> v[1]);
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
    public fromJSON(jsonObject:any): TSMap<K,V> {
        for (let property in jsonObject) {  
            if (jsonObject.hasOwnProperty(property)) {
                this.set(<any> property, jsonObject[property]);
            }
        }        
        return this;
    }


    /**
     * Outputs the contents of the map to a JSON object
     * 
     * @returns {Object}
     * 
     * @memberOf TSMap
     */
    public toJSON():Object {
        let obj = {};
        let t = this;
        t.keys().forEach((k) => {
            obj[String(k)] = t.get(k);
        });
        return obj;
    }

    /**
     * Get an array of arrays respresenting the map, kind of like an export function.
     * 
     * @returns {(Array<Array<K|V>>)}
     * 
     * @memberOf TSMap
     */
    public entries():Array<Array<K|V>> {
        return [].slice.call(this._items);
    }

    /**
     * Get an array of keys in the map.
     * 
     * @returns {Array<K>}
     * 
     * @memberOf TSMap
     */
    public keys():Array<K> {
        return [].slice.call(this._keys);
    }

    /**
     * Get an array of the values in the map.
     * 
     * @returns {Array<V>}
     * 
     * @memberOf TSMap
     */
    public values():Array<V> {
        return [].slice.call(this._values);
    }

    /**
     * Check to see if an item in the map exists given it's key.
     * 
     * @param {K} key
     * @returns {Boolean}
     * 
     * @memberOf TSMap
     */
    public has(key:K):Boolean {
        return this._keys.indexOf(key) > -1;
    }

    /**
     * Get a specific item from the map given it's key.
     * 
     * @param {K} key
     * @returns {V}
     * 
     * @memberOf TSMap
     */
    public get(key:K):V {
        let i = this._keys.indexOf(key);
        return i > -1 ? this._values[i] : undefined;        
    }

    /**
     * Set a specific item in the map given it's key, automatically adds new items as needed. 
     * Ovewrrites existing items
     * 
     * @param {K} key
     * @param {V} value
     * 
     * @memberOf TSMap
     */
    public set(key:K, value:V): TSMap<K,V> {
        let t = this;
        // check if key exists and overwrite
        let i = this._keys.indexOf(key);
        if (i > -1) {
            t._items[i][1] = value;
            t._values[i] = value;
        } else {
            t._items.push([key, value]);
            t._keys.push(key);
            t._values.push(value);
        }
        t.length = t.size();
        return this;
    }

    /**
     * Provide a number representing the number of items in the map
     * 
     * @returns {number}
     * 
     * @memberOf TSMap
     */
    public size():number {
        return this._items.length;
    }


    /**
     * Clear all the contents of the map
     * 
     * @returns {TSMap<K,V>}
     * 
     * @memberOf TSMap
     */
    public clear(): TSMap<K,V> {
        let t = this;
        t._keys.length = t.length = t._values.length = t._items.length = 0;
        return this;
    }

    /**
     * Delete an item from the map given it's key
     * 
     * @param {K} key
     * @returns {Boolean}
     * 
     * @memberOf TSMap
     */
    public delete(key:K):Boolean {
        let t = this;
        let i = t._keys.indexOf(key);
        if (i > -1) {
            t._keys.splice(i, 1);
            t._values.splice(i, 1);
            t._items.splice(i, 1);
            t.length = t.size();
            return true;
        }
        return false;
    }

    /**
     * Used to loop through the map.  
     * 
     * @param {(value:V,key?:K,index?:number) => void} callbackfn
     * 
     * @memberOf TSMap
     */
    public forEach(callbackfn:(value:V,key?:K,index?:number) => void):void {
        let t = this;
        let i = 0;
        t._keys.forEach((v) => {
            callbackfn(t.get(v),v,i);
            i++;
        });
    }

    /**
     * Returns an array containing the returned value of each item in the map.
     * 
     * @param {(value:V,key?:K,index?:number) => any} callbackfn
     * @returns {Array<any>}
     * 
     * @memberOf TSMap
     */
    public map(callbackfn:(value:V,key?:K,index?:number) => any):Array<any> {
        let t = this;
        let i = -1;
        return this.keys().map((itemKey) =>{
            i++;
            return callbackfn(t.get(itemKey),itemKey,i);
        });
    }


    /**
     * Removes items based on a conditional function passed to filter
     * 
     * @param {(value:V,key?:K,index?:number) => Boolean} callbackfn
     * @returns {TSMap<K,V>}
     * 
     * @memberOf TSMap
     */
    public filter(callbackfn:(value:V,key?:K,index?:number) => Boolean):TSMap<K,V> {
        let t = this;
        let i = 0;
        t._keys.forEach((v) => {
            if(callbackfn(t.get(v),v,i) === false) t.delete(v); 
            i++;
        });
        return this;
    }

    /**
     * Creates a deep copy of the map, breaking all references to the old map and it's children.
     * Uses JSON.parse so any functions will be stringified and lose their original purpose.
     * 
     * @returns {TSMap<K,V>}
     * 
     * @memberOf TSMap
     */
    public clone():TSMap<K,V> {
        return new TSMap<K,V>(<any> JSON.parse(JSON.stringify(this._items)));
    }
}