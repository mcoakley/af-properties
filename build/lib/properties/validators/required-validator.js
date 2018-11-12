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
const property_defs_1 = require("../property-defs");
const validator_1 = require("./validator");
class RequiredValidator extends validator_1.Validator {
    _validate(value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (af_conditionals_1.isEmpty(value) &&
                (this.options.required ||
                    this.options.invalidIfNotRequiredAndEmpty)) {
                this.addEmptyError([
                    this.options.displayName + " is empty and is required."
                ]);
                return Promise.resolve(false);
            }
            return Promise.resolve(true);
        });
    }
    _validateOptions(newOptions) {
        super._validateOptions(newOptions);
        const haveParent = af_conditionals_1.isUsable(this.options.parent);
        let parentOptions;
        if (haveParent)
            parentOptions = this.options.parent.getOptions();
        let defaultInvalidIfNotRequiredAndEmpty = property_defs_1.DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY;
        if (haveParent &&
            af_conditionals_1.isUsable(parentOptions.invalidIfNotRequiredAndEmpty)) {
            defaultInvalidIfNotRequiredAndEmpty =
                parentOptions.invalidIfNotRequiredAndEmpty;
        }
        if (!af_conditionals_1.isUsable(this.options.invalidIfNotRequiredAndEmpty)) {
            this.options.invalidIfNotRequiredAndEmpty =
                defaultInvalidIfNotRequiredAndEmpty;
        }
    }
}
exports.RequiredValidator = RequiredValidator;
//# sourceMappingURL=required-validator.js.map