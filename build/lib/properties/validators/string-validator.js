"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const af_conditionals_1 = require("af-conditionals");
const string_property_defs_1 = require("../string-property-defs");
const validator_1 = require("./validator");
class StringValidator extends validator_1.Validator {
    _validate(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let valid = true;
            if (valid && this.options.minLength > 0) {
                valid = value.length >= this.options.minLength ||
                    !this.options.required && value.length === 0;
                if (!valid) {
                    this.addInvalidError([
                        this.options.displayName +
                            " is shorter than the minimum length."
                    ]);
                }
            }
            if (valid && this.options.maxLength > 0) {
                valid = value.length <= this.options.maxLength;
                if (!valid) {
                    this.addInvalidError([
                        this.options.displayName +
                            " is longer than the maximum length."
                    ]);
                }
            }
            return Promise.resolve(valid);
        });
    }
    _validateOptions(newOptions) {
        super._validateOptions(newOptions);
        const haveParent = af_conditionals_1.isUsable(this.options.parent);
        let parentOptions;
        if (haveParent)
            parentOptions = this.options.parent.getOptions();
        let defaultMaxLength = string_property_defs_1.DEFAULT_STRING_MAX_LENGTH;
        let defaultMinLength = string_property_defs_1.DEFAULT_STRING_MIN_LENGTH;
        if (haveParent) {
            defaultMaxLength =
                parentOptions.maxLength || defaultMaxLength;
            defaultMinLength =
                parentOptions.minLength || defaultMinLength;
        }
        this.options.maxLength = this.options.maxLength || defaultMaxLength;
        this.options.minLength = this.options.minLength || defaultMinLength;
        if (this.options.maxLength > 0 &&
            (this.options.minLength > this.options.maxLength)) {
            throw new TypeError("You must provide a valid options object.");
        }
    }
}
exports.StringValidator = StringValidator;
//# sourceMappingURL=string-validator.js.map