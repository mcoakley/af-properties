"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_property_defs_1 = require("./number-property-defs");
const property_1 = require("./property");
const property_defs_1 = require("./property-defs");
const validators_1 = require("./validators");
exports.defaultNumberPropertyOptions = {
    displayName: "",
    invalidIfNotRequiredAndEmpty: property_defs_1.DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    maxValue: number_property_defs_1.DEFAULT_NUMBER_MAX_VALUE,
    minValue: number_property_defs_1.DEFAULT_NUMBER_MIN_VALUE,
    name: "",
    normalizeAfterSet: property_defs_1.DEFAULT_NORMALIZE_AFTER_SET,
    normalizeBeforeValidate: property_defs_1.DEFAULT_NORMALIZE_BEFORE_VALIDATE,
    numberBounds: number_property_defs_1.DEFAULT_NUMBER_BOUNDS,
    required: property_defs_1.DEFAULT_REQUIRED,
    stopValidationOnInvalid: property_defs_1.DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID
};
class NumberProperty extends property_1.Property {
    initDefaultValidators() {
        super.initDefaultValidators();
        this.validators.push(new validators_1.NumberValidator({ parent: this }));
    }
}
exports.NumberProperty = NumberProperty;
function numberPropertyFactory(value, name, displayName, options = exports.defaultNumberPropertyOptions, defaultName = number_property_defs_1.DEFAULT_NUMBER_PROPERTY_NAME) {
    const pc = NumberProperty.getNextPropertyCount();
    options.name = name || options.name || defaultName + "_" + pc;
    options.displayName = displayName || options.displayName || options.name;
    return new NumberProperty(value, options);
}
exports.numberPropertyFactory = numberPropertyFactory;
//# sourceMappingURL=number-property.js.map