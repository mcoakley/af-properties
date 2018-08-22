/**
 * EmailProperty
 *
 * @author Mike Coakley <mcoakley@acmeframework.com>
 * @version 0.1.0
 */

import {
    DEFAULT_EMAIL_MASK,
    DEFAULT_EMAIL_PROPERTY_NAME,
    MAXIMUM_EMAIL_ADDRESS_LEN,
    MINIMUM_EMAIL_ADDRESS_LEN
} from "./email-property-defs";
import {
    DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    DEFAULT_NORMALIZE_AFTER_SET,
    DEFAULT_NORMALIZE_BEFORE_VALIDATE,
    DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID,
    DEFAULT_REQUIRED
} from "./property-defs";
import {
    RegExpProperty,
    regexpPropertyFactory,
    RegExpPropertyOptions
} from "./regexp-property";
import {
    DEFAULT_STRING_NORMALIZE_TO_LOWER,
    DEFAULT_STRING_NORMALIZE_TO_UPPER,
    DEFAULT_STRING_TRIM_LEFT,
    DEFAULT_STRING_TRIM_RIGHT
 } from "./string-property-defs";

export const defaultEmailPropertyOptions: RegExpPropertyOptions = {
    displayName: "",
    invalidIfNotRequiredAndEmpty: DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    mask: DEFAULT_EMAIL_MASK,
    maxLength: MAXIMUM_EMAIL_ADDRESS_LEN,
    minLength: MINIMUM_EMAIL_ADDRESS_LEN,
    name: "",
    normalizeAfterSet: DEFAULT_NORMALIZE_AFTER_SET,
    normalizeBeforeValidate: DEFAULT_NORMALIZE_BEFORE_VALIDATE,
    normalizeToLower: DEFAULT_STRING_NORMALIZE_TO_LOWER,
    normalizeToUpper: DEFAULT_STRING_NORMALIZE_TO_UPPER,
    required: DEFAULT_REQUIRED,
    stopValidationOnInvalid: DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID,
    trimLeft: DEFAULT_STRING_TRIM_LEFT,
    trimRight: DEFAULT_STRING_TRIM_RIGHT
};

export function emailPropertyFactory(
    value: string,
    name?: string,
    displayName?: string,
    options = defaultEmailPropertyOptions,
    defaultName = DEFAULT_EMAIL_PROPERTY_NAME
): RegExpProperty {
    return regexpPropertyFactory(
        value,
        undefined,
        name,
        displayName,
        options,
        defaultName
    );
}
