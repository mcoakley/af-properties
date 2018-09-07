export declare const PROPERTY_NORMALIZE_EVENT = "propertyNormalize";
export declare const PROPERTY_VALIDATION_CACHED_EVENT = "propertyValidationCached";
export declare const PROPERTY_VALIDATION_EVENT = "propertyValidation";
export declare const PROPERTY_VALUE_SET_EVENT = "propertySetValue";
export interface PropertyValueChangeEvent<T> {
    context: any;
    displayName: string;
    name: string;
    previousValue: T | undefined;
    value: T;
}
export interface PropertyValidationEvent<T> {
    context: any;
    displayName: string;
    name: string;
    validated: boolean;
    value: T;
}
export declare const DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY: boolean;
export declare const DEFAULT_NORMALIZE_AFTER_SET: boolean;
export declare const DEFAULT_NORMALIZE_BEFORE_VALIDATE: boolean;
export declare const DEFAULT_NORMALIZE_IF_VALID: boolean;
export declare const DEFAULT_REQUIRED: boolean;
export declare const DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID: boolean;
export declare const DEFAULT_PROPERTY_WAIT_INTERVAL = 10;
export declare const DEFAULT_PROPERTY_WAIT_TIMEOUT = 500;
