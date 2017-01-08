export declare class TSMap<K, V> {
    length: number;
    constructor(inputMap?: Array<Array<K | V>>);
    /**
     * Converts a JSON object to an map.
     *
     * @param {*} jsonObject
     *
     * @memberOf TSMap
     */
    fromJSON(jsonObject: any): TSMap<K, V>;
    /**
     * Outputs the contents of the map to a JSON object
     *
     * @returns {Object}
     *
     * @memberOf TSMap
     */
    toJSON(): Object;
    /**
     * Get an array of arrays respresenting the map, kind of like an export function.
     *
     * @returns {(Array<Array<K|V>>)}
     *
     * @memberOf TSMap
     */
    entries(): Array<Array<K | V>>;
    /**
     * Get an array of keys in the map.
     *
     * @returns {Array<K>}
     *
     * @memberOf TSMap
     */
    keys(): Array<K>;
    /**
     * Get an array of the values in the map.
     *
     * @returns {Array<V>}
     *
     * @memberOf TSMap
     */
    values(): Array<V>;
    /**
     * Check to see if an item in the map exists given it's key.
     *
     * @param {K} key
     * @returns {Boolean}
     *
     * @memberOf TSMap
     */
    has(key: K): Boolean;
    /**
     * Get a specific item from the map given it's key.
     *
     * @param {K} key
     * @returns {V}
     *
     * @memberOf TSMap
     */
    get(key: K): V;
    /**
     * Set a specific item in the map given it's key, automatically adds new items as needed.
     * Ovewrrites existing items
     *
     * @param {K} key
     * @param {V} value
     *
     * @memberOf TSMap
     */
    set(key: K, value: V): TSMap<K, V>;
    /**
     * Provide a number representing the number of items in the map
     *
     * @returns {number}
     *
     * @memberOf TSMap
     */
    size(): number;
    /**
     * Clear all the contents of the map
     *
     * @returns {TSMap<K,V>}
     *
     * @memberOf TSMap
     */
    clear(): TSMap<K, V>;
    /**
     * Delete an item from the map given it's key
     *
     * @param {K} key
     * @returns {Boolean}
     *
     * @memberOf TSMap
     */
    delete(key: K): Boolean;
    /**
     * Used to loop through the map.
     *
     * @param {(value:V,key?:K,index?:number) => void} callbackfn
     *
     * @memberOf TSMap
     */
    forEach(callbackfn: (value: V, key?: K, index?: number) => void): void;
    /**
     * Returns an array containing the returned value of each item in the map.
     *
     * @param {(value:V,key?:K) => void} callbackfn
     * @returns {*}
     *
     * @memberOf TSMap
     */
    map(callbackfn: (value: V, key?: K, index?: number) => any): Array<any>;
    /**
     * Removes items based on a conditional function passed to filter
     *
     * @param {(value:V,key?:K) => Boolean} callbackfn
     * @returns {TSMap<K,V>}
     *
     * @memberOf TSMap
     */
    filter(callbackfn: (value: V, key?: K) => Boolean): TSMap<K, V>;
    /**
     * Creates a deep copy of the map, breaking all references to the old map and it's children.
     * Uses JSON.parse so any functions will be stringified and lose their original purpose.
     *
     * @returns {TSMap<K,V>}
     *
     * @memberOf TSMap
     */
    clone(): TSMap<K, V>;
}
