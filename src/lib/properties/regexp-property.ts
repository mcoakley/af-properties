/**
 * RegExpProperty
 *
 * Provide a property that uses a RegExp to validate the value. In most
 * use cases you can simply supply the RegExp value and the validation
 * method provided here will suit your needs.
 *
 * @author Mike Coakley <mcoakley@acmeframework.com>
 * @version 0.1.0
 */

import {
    DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    DEFAULT_NORMALIZE_AFTER_SET,
    DEFAULT_NORMALIZE_BEFORE_VALIDATE,
    DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID,
    DEFAULT_REQUIRED
} from "./property-defs";
import { DEFAULT_REGEXP_MASK, DEFAULT_REGEXP_PROPERTY_NAME } from "./regexp-property-defs";
import { StringProperty, StringPropertyOptions } from "./string-property";
import {
    DEFAULT_STRING_MAX_LENGTH,
    DEFAULT_STRING_MIN_LENGTH,
    DEFAULT_STRING_NORMALIZE_TO_LOWER,
    DEFAULT_STRING_NORMALIZE_TO_UPPER,
    DEFAULT_STRING_TRIM_LEFT,
    DEFAULT_STRING_TRIM_RIGHT
} from "./string-property-defs";
import { RegExpValidator } from "./validators";

export interface RegExpPropertyOptions extends StringPropertyOptions {
    mask?: RegExp;
}

export const defaultRegExpPropertyOptions: RegExpPropertyOptions = {
    displayName: "",
    invalidIfNotRequiredAndEmpty: DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    mask: DEFAULT_REGEXP_MASK,
    maxLength: DEFAULT_STRING_MAX_LENGTH,
    minLength: DEFAULT_STRING_MIN_LENGTH,
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

export class RegExpProperty
    <O extends RegExpPropertyOptions = RegExpPropertyOptions>
    extends StringProperty<O>
{
    protected initDefaultValidators(): void {
        super.initDefaultValidators();
        this.validators.push(new RegExpValidator({ parent: this }));
    }
}

export function regexpPropertyFactory(
    value: string,
    mask?: RegExp,
    name?: string,
    displayName?: string,
    options = defaultRegExpPropertyOptions,
    defaultName = DEFAULT_REGEXP_PROPERTY_NAME
): RegExpProperty {
    const pc = RegExpProperty.getNextPropertyCount();

    options.name = name || options.name || defaultName + "_" + pc;
    options.displayName = displayName || options.displayName || options.name;
    options.mask = mask || options.mask;

    return new RegExpProperty(value, options);
}
