import { StringProperty, StringPropertyOptions } from "./string-property";
export interface RegExpPropertyOptions extends StringPropertyOptions {
    mask?: RegExp;
}
export declare const defaultRegExpPropertyOptions: RegExpPropertyOptions;
export declare class RegExpProperty<O extends RegExpPropertyOptions = RegExpPropertyOptions> extends StringProperty<O> {
    protected initDefaultValidators(): void;
}
export declare function regexpPropertyFactory(value: string, mask?: RegExp, name?: string, displayName?: string, options?: RegExpPropertyOptions, defaultName?: string): RegExpProperty;
