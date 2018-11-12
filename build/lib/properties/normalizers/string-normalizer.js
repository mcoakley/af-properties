"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const af_conditionals_1 = require("af-conditionals");
const string_property_defs_1 = require("../string-property-defs");
const normalizer_1 = require("./normalizer");
exports.DEFAULT_TRIM_LEFT_MASK = /^[ \t]*/;
exports.DEFAULT_TRIM_RIGHT_MASK = /[ \t]*$/;
class StringNormalizer extends normalizer_1.Normalizer {
    _normalize(value) {
        let newValue = value;
        if (this.options.normalizeToLower) {
            newValue = newValue.toLowerCase();
        }
        else if (this.options.normalizeToUpper) {
            newValue = newValue.toUpperCase();
        }
        if (this.options.trimLeft) {
            newValue = newValue.replace(exports.DEFAULT_TRIM_LEFT_MASK, "");
        }
        if (this.options.trimRight) {
            newValue = newValue.replace(exports.DEFAULT_TRIM_RIGHT_MASK, "");
        }
        return newValue;
    }
    _validateOptions(newOptions) {
        super._validateOptions(newOptions);
        const haveParent = af_conditionals_1.isUsable(this.options.parent);
        let parentOptions;
        if (haveParent)
            parentOptions = this.options.parent.getOptions();
        let defaultNormalizeToLower = string_property_defs_1.DEFAULT_STRING_NORMALIZE_TO_LOWER;
        let defaultNormalizeToUpper = string_property_defs_1.DEFAULT_STRING_NORMALIZE_TO_UPPER;
        let defaultTrimLeft = string_property_defs_1.DEFAULT_STRING_TRIM_LEFT;
        let defaultTrimRight = string_property_defs_1.DEFAULT_STRING_TRIM_RIGHT;
        if (haveParent) {
            if (af_conditionals_1.isUsable(parentOptions.normalizeToLower)) {
                defaultNormalizeToLower = parentOptions.normalizeToLower;
            }
            if (af_conditionals_1.isUsable(parentOptions.normalizeToUpper)) {
                defaultNormalizeToUpper = parentOptions.normalizeToUpper;
            }
            if (af_conditionals_1.isUsable(parentOptions.trimLeft)) {
                defaultTrimLeft = parentOptions.trimLeft;
            }
            if (af_conditionals_1.isUsable(parentOptions.trimRight)) {
                defaultTrimRight = parentOptions.trimRight;
            }
        }
        if (!af_conditionals_1.isUsable(this.options.normalizeToLower)) {
            this.options.normalizeToLower = defaultNormalizeToLower;
        }
        if (!af_conditionals_1.isUsable(this.options.normalizeToUpper)) {
            this.options.normalizeToUpper = defaultNormalizeToUpper;
        }
        if (!af_conditionals_1.isUsable(this.options.trimLeft)) {
            this.options.trimLeft = defaultTrimLeft;
        }
        if (!af_conditionals_1.isUsable(this.options.trimRight)) {
            this.options.trimRight = defaultTrimRight;
        }
        if (this.options.normalizeToLower && this.options.normalizeToUpper) {
            throw new TypeError("You must provide a valid options object.");
        }
    }
}
exports.StringNormalizer = StringNormalizer;
//# sourceMappingURL=string-normalizer.js.map