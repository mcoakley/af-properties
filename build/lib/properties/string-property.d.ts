import { Property, PropertyOptions } from "./property";
export interface StringPropertyOptions extends PropertyOptions {
    maxLength?: number;
    minLength?: number;
    normalizeToLower?: boolean;
    normalizeToUpper?: boolean;
    trimLeft?: boolean;
    trimRight?: boolean;
}
export declare const defaultStringPropertyOptions: StringPropertyOptions;
export declare class StringProperty<O extends StringPropertyOptions = StringPropertyOptions> extends Property<string, O> {
    protected initDefaultNormalizers(): void;
    protected initDefaultValidators(): void;
}
export declare function stringPropertyFactory(value: string, name?: string, displayName?: string, options?: StringPropertyOptions, defaultName?: string): StringProperty;
