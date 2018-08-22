"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizers_1 = require("./normalizers");
const property_1 = require("./property");
const property_defs_1 = require("./property-defs");
const string_property_defs_1 = require("./string-property-defs");
const validators_1 = require("./validators");
exports.defaultStringPropertyOptions = {
    displayName: "",
    invalidIfNotRequiredAndEmpty: property_defs_1.DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    maxLength: string_property_defs_1.DEFAULT_STRING_MAX_LENGTH,
    minLength: string_property_defs_1.DEFAULT_STRING_MIN_LENGTH,
    name: "",
    normalizeAfterSet: property_defs_1.DEFAULT_NORMALIZE_AFTER_SET,
    normalizeBeforeValidate: property_defs_1.DEFAULT_NORMALIZE_BEFORE_VALIDATE,
    normalizeToLower: string_property_defs_1.DEFAULT_STRING_NORMALIZE_TO_LOWER,
    normalizeToUpper: string_property_defs_1.DEFAULT_STRING_NORMALIZE_TO_UPPER,
    required: property_defs_1.DEFAULT_REQUIRED,
    stopValidationOnInvalid: property_defs_1.DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID,
    trimLeft: string_property_defs_1.DEFAULT_STRING_TRIM_LEFT,
    trimRight: string_property_defs_1.DEFAULT_STRING_TRIM_RIGHT
};
class StringProperty extends property_1.Property {
    initDefaultNormalizers() {
        super.initDefaultNormalizers();
        this.normalizers.push(new normalizers_1.StringNormalizer({ parent: this }));
    }
    initDefaultValidators() {
        super.initDefaultValidators();
        this.validators.push(new validators_1.StringValidator({ parent: this }));
    }
}
exports.StringProperty = StringProperty;
function stringPropertyFactory(value, name, displayName, options = exports.defaultStringPropertyOptions, defaultName = string_property_defs_1.DEFAULT_STRING_PROPERTY_NAME) {
    const pc = StringProperty.getNextPropertyCount();
    options.name = name || options.name || defaultName + "_" + pc;
    options.displayName = displayName || options.displayName || options.name;
    return new StringProperty(value, options);
}
exports.stringPropertyFactory = stringPropertyFactory;
//# sourceMappingURL=string-property.js.map