// Emitted Events
export const PROPERTY_NORMALIZE_EVENT = "propertyNormalize";
export const PROPERTY_VALIDATION_CACHED_EVENT = "propertyValidationCached";
export const PROPERTY_VALIDATION_EVENT = "propertyValidation";
export const PROPERTY_VALUE_SET_EVENT = "propertySetValue";

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

export const DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY = false;
export const DEFAULT_NORMALIZE_AFTER_SET = false;
export const DEFAULT_NORMALIZE_BEFORE_VALIDATE = false;
export const DEFAULT_REQUIRED = false;
export const DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID = false;
export const DEFAULT_PROPERTY_WAIT_INTERVAL = 10;
export const DEFAULT_PROPERTY_WAIT_TIMEOUT = 500;
