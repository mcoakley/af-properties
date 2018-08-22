"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_defs_1 = require("./property-defs");
const regexp_property_defs_1 = require("./regexp-property-defs");
const string_property_1 = require("./string-property");
const string_property_defs_1 = require("./string-property-defs");
const validators_1 = require("./validators");
exports.defaultRegExpPropertyOptions = {
    displayName: "",
    invalidIfNotRequiredAndEmpty: property_defs_1.DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    mask: regexp_property_defs_1.DEFAULT_REGEXP_MASK,
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
class RegExpProperty extends string_property_1.StringProperty {
    initDefaultValidators() {
        super.initDefaultValidators();
        this.validators.push(new validators_1.RegExpValidator({ parent: this }));
    }
}
exports.RegExpProperty = RegExpProperty;
function regexpPropertyFactory(value, mask, name, displayName, options = exports.defaultRegExpPropertyOptions, defaultName = regexp_property_defs_1.DEFAULT_REGEXP_PROPERTY_NAME) {
    const pc = RegExpProperty.getNextPropertyCount();
    options.name = name || options.name || defaultName + "_" + pc;
    options.displayName = displayName || options.displayName || options.name;
    options.mask = mask || options.mask;
    return new RegExpProperty(value, options);
}
exports.regexpPropertyFactory = regexpPropertyFactory;
//# sourceMappingURL=regexp-property.js.map