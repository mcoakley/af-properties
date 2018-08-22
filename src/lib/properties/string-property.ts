/**
 * StringProperty
 *
 * A property that will validate and normalize a string value.
 *
 * @author Mike Coakley <mcoakley@acmeframework.com>
 * @version 0.1.0
 */

import { StringNormalizer } from "./normalizers";
import { Property, PropertyOptions } from "./property";
import {
    DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    DEFAULT_NORMALIZE_AFTER_SET,
    DEFAULT_NORMALIZE_BEFORE_VALIDATE,
    DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID,
    DEFAULT_REQUIRED
} from "./property-defs";
import {
    DEFAULT_STRING_MAX_LENGTH,
    DEFAULT_STRING_MIN_LENGTH,
    DEFAULT_STRING_NORMALIZE_TO_LOWER,
    DEFAULT_STRING_NORMALIZE_TO_UPPER,
    DEFAULT_STRING_PROPERTY_NAME,
    DEFAULT_STRING_TRIM_LEFT,
    DEFAULT_STRING_TRIM_RIGHT
} from "./string-property-defs";
import { StringValidator } from "./validators";

export interface StringPropertyOptions extends PropertyOptions {
    // We duplicate the options from our StringValidator and StringNormalizer
    // here SO if you want to simply set the options here, the default
    // StringValidator and StringNormalizer will be created using these
    // options. QoL
    maxLength?: number;
    minLength?: number;
    normalizeToLower?: boolean;
    normalizeToUpper?: boolean;
    trimLeft?: boolean;
    trimRight?: boolean;
}

export const defaultStringPropertyOptions: StringPropertyOptions = {
    displayName: "",
    invalidIfNotRequiredAndEmpty: DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
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

export class StringProperty
    <O extends StringPropertyOptions = StringPropertyOptions>
    extends Property<string, O>
{
    protected initDefaultNormalizers(): void {
        super.initDefaultNormalizers();
        this.normalizers.push(new StringNormalizer({ parent: this }));
    }

    protected initDefaultValidators(): void {
        super.initDefaultValidators();
        this.validators.push(new StringValidator({ parent: this }));
    }
}

export function stringPropertyFactory(
    value: string,
    name?: string,
    displayName?: string,
    options = defaultStringPropertyOptions,
    defaultName = DEFAULT_STRING_PROPERTY_NAME
): StringProperty {
    const pc = StringProperty.getNextPropertyCount();

    options.name = name || options.name || defaultName + "_" + pc;
    options.displayName = displayName || options.displayName || options.name;

    return new StringProperty(value, options);
}
