export declare class tsMap<K, V> {
    length: Number;
    constructor(inputMap?: Array<Array<K | V>>);
    fromJSON(jsonObject: any): void;
    toJSON(): any;
    entries(): Array<Array<K | V>>;
    keys(): Array<K>;
    values(): Array<V>;
    has(key: K): Boolean;
    get(key: K): V;
    set(key: K, value: V): void;
    size(): Number;
    clear(): void;
    delete(key: K): Boolean;
    forEach(callbackfn: (value: V, key?: K) => void): void;
    map(callbackfn: (value: V, key?: K) => any): Array<any>;
    filter(callbackfn: (value: V, key?: K) => Boolean): tsMap<K, V>;
    clone(): tsMap<K, V>;
}
