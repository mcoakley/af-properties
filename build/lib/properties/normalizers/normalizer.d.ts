import { EventEmitter } from "eventemitter3";
import { PropertyProvider } from "../property";
export declare const DEFAULT_NORMALIZER_NAME = "generic_normalizer";
export interface NormalizerOptions {
    displayName?: string;
    name?: string;
    parent?: PropertyProvider;
}
export interface NormalizerProvider {
    getOptions(): NormalizerOptions;
    normalize(value: any): any;
}
export declare abstract class Normalizer<T, O extends NormalizerOptions = NormalizerOptions> extends EventEmitter implements NormalizerProvider {
    static getNextNormalizerCount(): number;
    static getNormalizerCount(): number;
    protected static normalizerCount: number;
    protected lastValue: T | undefined;
    protected options: O;
    constructor(newOptions?: O);
    getOptions(): O;
    normalize(value: T): T;
    protected abstract _normalize(value: T): T;
    protected _validateOptions(newOptions: O | undefined): void;
}
