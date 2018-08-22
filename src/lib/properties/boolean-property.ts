/**
 * BooleanProperty
 *
 * A property that will validate and normalize a boolean value.
 *
 * @author Mike Coakley <mcoakley@acmeframework.com>
 * @version 0.1.0
 */

import { Property, PropertyOptions } from "./property";
import {
    DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    DEFAULT_NORMALIZE_AFTER_SET,
    DEFAULT_NORMALIZE_BEFORE_VALIDATE,
    DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID,
    DEFAULT_REQUIRED
} from "./property-defs";
import { BooleanValidator } from "./validators";

export const DEFAULT_BOOLEAN_PROPERTY_NAME = "boolean_property";

export interface BooleanPropertyOptions extends PropertyOptions {}

export const defaultBooleanPropertyOptions: BooleanPropertyOptions = {
    displayName: "",
    invalidIfNotRequiredAndEmpty: DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    name: "",
    normalizeAfterSet: DEFAULT_NORMALIZE_AFTER_SET,
    normalizeBeforeValidate: DEFAULT_NORMALIZE_BEFORE_VALIDATE,
    required: DEFAULT_REQUIRED,
    stopValidationOnInvalid: DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID,
};

export class BooleanProperty
    <O extends BooleanPropertyOptions = BooleanPropertyOptions>
    extends Property<boolean, O>
{
    protected initDefaultValidators(): void {
        super.initDefaultValidators();
        this.validators.push(new BooleanValidator({ parent: this }));
    }
}

export function booleanPropertyFactory(
    value: boolean,
    name?: string,
    displayName?: string,
    options = defaultBooleanPropertyOptions,
    defaultName = DEFAULT_BOOLEAN_PROPERTY_NAME
): BooleanProperty {
    const bc = BooleanProperty.getNextPropertyCount();

    options.name = name || options.name || defaultName + "_" + bc;
    options.displayName = displayName || options.displayName || options.name;

    return new BooleanProperty(value, options);
}
