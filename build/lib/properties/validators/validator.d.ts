import { EventEmitter } from "eventemitter3";
import { PropertyProvider } from "../property";
export declare const VALIDATOR_ENRICHED_DATA_EVENT = "propertyEnrichedData";
export interface ValidatorEnrichedDataEvent<T> {
    context: any;
    displayName: string;
    enrichedData: any;
    name: string;
    value: T;
}
export declare enum ValidatorErrorCodes {
    NoError = 0,
    Empty = 1,
    RequiredAndEmpty = 2,
    Invalid = 3,
    RequiredAndInvalid = 4,
    ValidationFailed = 5
}
export interface ValidatorError {
    code: ValidatorErrorCodes;
    displayName?: string;
    message: string[];
    name: string;
}
export declare const DEFAULT_VALIDATOR_NAME = "generic_validator";
export interface ValidatorOptions {
    displayName?: string;
    name?: string;
    parent?: PropertyProvider;
    required?: boolean;
}
export interface ValidatorProvider {
    getErrors(): ValidatorError[];
    getOptions(): ValidatorOptions;
    isValidating(): boolean;
    isValueAllowed(newValue: any): boolean;
    reset(): void;
    validate(value: any): Promise<boolean>;
}
export declare abstract class Validator<T, O extends ValidatorOptions = ValidatorOptions> extends EventEmitter implements ValidatorProvider {
    static getNextValidatorCount(): number;
    static getValidatorCount(): number;
    protected static validatorCount: number;
    protected errors: ValidatorError[];
    protected lastValid: boolean;
    protected lastValue: T | undefined;
    protected options: O;
    protected validating: boolean;
    constructor(newOptions?: O);
    getErrors(): ValidatorError[];
    getOptions(): O;
    isValidating(): boolean;
    isValueAllowed(newValue: T | undefined): boolean;
    reset(): void;
    validate(value: T): Promise<boolean>;
    protected addEmptyError(message: string[]): void;
    protected addError(message: string[], errorCode: ValidatorErrorCodes): void;
    protected addInvalidError(message: string[]): void;
    protected emitEnrichedData(enrichedData: any, value: T): void;
    protected abstract _validate(value: T): Promise<boolean>;
    protected _validateOptions(newOptions: O | undefined): void;
}
