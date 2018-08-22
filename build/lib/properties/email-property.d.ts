import { RegExpProperty, RegExpPropertyOptions } from "./regexp-property";
export declare const defaultEmailPropertyOptions: RegExpPropertyOptions;
export declare function emailPropertyFactory(value: string, name?: string, displayName?: string, options?: RegExpPropertyOptions, defaultName?: string): RegExpProperty;
