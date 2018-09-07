import { EventEmitter } from "eventemitter3";
import { Normalizer } from "./normalizers";
import { Validator, ValidatorError } from "./validators";
export interface PropertyOptions {
    displayName?: string;
    invalidIfNotRequiredAndEmpty?: boolean;
    name: string;
    normalizeAfterSet?: boolean;
    normalizeBeforeValidate?: boolean;
    normalizeIfValid?: boolean;
    required?: boolean;
    stopValidationOnInvalid?: boolean;
    waitInterval?: number;
    waitTimeout?: number;
}
export interface PropertyProvider {
    value: any;
    getErrors(): ValidatorError[];
    getName(): string;
    getOptions(): PropertyOptions;
    isEqual(otherValue: any): boolean;
    isNormalized(): boolean;
    isRequired(): boolean;
    isValid(): boolean;
    isValidating(): boolean;
    normalize(): void;
    reset(): void;
    toString(): string;
    validate(): Promise<boolean>;
    valueOf(): any;
}
export declare class Property<T, O extends PropertyOptions = PropertyOptions> extends EventEmitter implements PropertyProvider {
    protected normalizers: Normalizer<T>[];
    protected validators: Validator<T>[];
    static getNextPropertyCount(): number;
    static getPropertyCount(): number;
    protected static propertyCount: number;
    protected normalized: boolean;
    protected options: O;
    protected valid: boolean;
    protected validated: boolean;
    protected validating: boolean;
    private _value;
    constructor(newValue: T, newOptions: O, normalizers?: Normalizer<T>[], validators?: Validator<T>[]);
    value: T | undefined;
    getErrors(): ValidatorError[];
    getName(): string;
    getOptions(): O;
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
    protected emitValidated(eventId: string, validated: boolean): void;
    protected emitValueChanged(eventId: string, previousValue: T | undefined): void;
    protected initDefaultNormalizers(): void;
    protected initDefaultValidators(): void;
    protected isValueAllowed(newValue: T | undefined): boolean;
    protected _validate(): Promise<boolean>;
    protected _validateOptions(newOptions: O): void;
}
