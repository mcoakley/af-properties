"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_property_defs_1 = require("./email-property-defs");
const property_defs_1 = require("./property-defs");
const regexp_property_1 = require("./regexp-property");
const string_property_defs_1 = require("./string-property-defs");
exports.defaultEmailPropertyOptions = {
    displayName: "",
    invalidIfNotRequiredAndEmpty: property_defs_1.DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    mask: email_property_defs_1.DEFAULT_EMAIL_MASK,
    maxLength: email_property_defs_1.MAXIMUM_EMAIL_ADDRESS_LEN,
    minLength: email_property_defs_1.MINIMUM_EMAIL_ADDRESS_LEN,
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
function emailPropertyFactory(value, name, displayName, options = exports.defaultEmailPropertyOptions, defaultName = email_property_defs_1.DEFAULT_EMAIL_PROPERTY_NAME) {
    return regexp_property_1.regexpPropertyFactory(value, undefined, name, displayName, options, defaultName);
}
exports.emailPropertyFactory = emailPropertyFactory;
//# sourceMappingURL=email-property.js.map