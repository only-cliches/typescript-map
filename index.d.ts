export declare class tsMap<K, V> {
    constructor(inputMap?: Array<Array<K | V>>);
    fromJSON(jsonObject: any): void;
    toJSON(): any;
    items(): Array<K | V>[];
    keys(): K[];
    values(): V[];
    has(key: K): boolean;
    get(key: K): V;
    set(key: K, value: V): void;
    size(): Number;
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key?: K, map?: tsMap<K, V>) => void): void;
}
