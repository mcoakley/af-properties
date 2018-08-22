"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_1 = require("./property");
const property_defs_1 = require("./property-defs");
const validators_1 = require("./validators");
exports.DEFAULT_BOOLEAN_PROPERTY_NAME = "boolean_property";
exports.defaultBooleanPropertyOptions = {
    displayName: "",
    invalidIfNotRequiredAndEmpty: property_defs_1.DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    name: "",
    normalizeAfterSet: property_defs_1.DEFAULT_NORMALIZE_AFTER_SET,
    normalizeBeforeValidate: property_defs_1.DEFAULT_NORMALIZE_BEFORE_VALIDATE,
    required: property_defs_1.DEFAULT_REQUIRED,
    stopValidationOnInvalid: property_defs_1.DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID,
};
class BooleanProperty extends property_1.Property {
    initDefaultValidators() {
        super.initDefaultValidators();
        this.validators.push(new validators_1.BooleanValidator({ parent: this }));
    }
}
exports.BooleanProperty = BooleanProperty;
function booleanPropertyFactory(value, name, displayName, options = exports.defaultBooleanPropertyOptions, defaultName = exports.DEFAULT_BOOLEAN_PROPERTY_NAME) {
    const bc = BooleanProperty.getNextPropertyCount();
    options.name = name || options.name || defaultName + "_" + bc;
    options.displayName = displayName || options.displayName || options.name;
    return new BooleanProperty(value, options);
}
exports.booleanPropertyFactory = booleanPropertyFactory;
//# sourceMappingURL=boolean-property.js.map