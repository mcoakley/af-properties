import EventEmitter from "eventemitter3";
import { PropertyProvider } from "./property";
import { ValidatorError } from "./validators";
export declare const DEFAULT_IMMUTABLE_PROPERTY_NAME = "immutable_property";
export interface ImmutablePropertyOptions {
    displayName?: string;
    name: string;
}
export declare class ImmutableProperty<T> extends EventEmitter.EventEmitter implements PropertyProvider {
    static getNextPropertyCount(): number;
    static getPropertyCount(): number;
    protected static propertyCount: number;
    private _value;
    private _name;
    private _displayName;
    constructor(newValue: T, newName: string, newDisplayName?: string);
    readonly value: T;
    getErrors(): ValidatorError[];
    getName(): string;
    getOptions(): ImmutablePropertyOptions;
    isEqual(otherValue: T): boolean;
    isNormalized(): boolean;
    isRequired(): boolean;
    isValid(): boolean;
    isValidating(): boolean;
    normalize(): void;
    reset(): void;
    toString(): string;
    validate(): Promise<boolean>;
    valueOf(): T;
    protected isValueAllowed(newValue: T): boolean;
}
export declare function immutablePropertyFactory<T>(value: T, name?: string, displayName?: string, defaultName?: string): ImmutableProperty<T>;
