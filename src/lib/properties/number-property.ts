import {
    DEFAULT_NUMBER_BOUNDS,
    DEFAULT_NUMBER_MAX_VALUE,
    DEFAULT_NUMBER_MIN_VALUE,
    DEFAULT_NUMBER_PROPERTY_NAME,
    NumberBoundTypes
} from "./number-property-defs";
import { Property, PropertyOptions } from "./property";
import {
    DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    DEFAULT_NORMALIZE_AFTER_SET,
    DEFAULT_NORMALIZE_BEFORE_VALIDATE,
    DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID,
    DEFAULT_REQUIRED
} from "./property-defs";
import { NumberValidator } from "./validators";

export interface NumberPropertyOptions extends PropertyOptions {
    maxValue?: number;
    minValue?: number;
    numberBounds?: NumberBoundTypes;
}

export const defaultNumberPropertyOptions: NumberPropertyOptions = {
    displayName: "",
    invalidIfNotRequiredAndEmpty: DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    maxValue: DEFAULT_NUMBER_MAX_VALUE,
    minValue: DEFAULT_NUMBER_MIN_VALUE,
    name: "",
    normalizeAfterSet: DEFAULT_NORMALIZE_AFTER_SET,
    normalizeBeforeValidate: DEFAULT_NORMALIZE_BEFORE_VALIDATE,
    numberBounds: DEFAULT_NUMBER_BOUNDS,
    required: DEFAULT_REQUIRED,
    stopValidationOnInvalid: DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID
};

export class NumberProperty
    <O extends NumberPropertyOptions = NumberPropertyOptions>
    extends Property<number, O>
{
    protected initDefaultValidators(): void {
        super.initDefaultValidators();
        this.validators.push(new NumberValidator({ parent: this }));
    }
}

export function numberPropertyFactory(
    value: number,
    name?: string,
    displayName?: string,
    options = defaultNumberPropertyOptions,
    defaultName = DEFAULT_NUMBER_PROPERTY_NAME,
): NumberProperty {
    const pc = NumberProperty.getNextPropertyCount();

    options.name = name || options.name || defaultName + "_" + pc;
    options.displayName = displayName || options.displayName || options.name;

    return new NumberProperty(value, options);
}
