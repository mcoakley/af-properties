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
const string_validator_1 = require("./string-validator");
class RegExpValidator extends string_validator_1.StringValidator {
    _validate(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const valid = this.options.mask.test(value);
            if (!valid) {
                this.addInvalidError([
                    this.options.displayName + " is not in the required format."
                ]);
            }
            return Promise.resolve(valid);
        });
    }
    _validateOptions(newOptions) {
        super._validateOptions(newOptions);
        const haveParent = af_conditionals_1.isUsable.test(this.options.parent);
        let parentOptions;
        if (haveParent) {
            parentOptions = this.options.parent.getOptions();
        }
        if ((!haveParent && !af_conditionals_1.isUsable.test(this.options.mask)) ||
            (haveParent && !af_conditionals_1.isUsable.test(this.options.mask) &&
                !af_conditionals_1.isUsable.test(parentOptions.mask))) {
            throw new TypeError("You must supply a valid options object");
        }
        if (haveParent) {
            this.options.mask = this.options.mask || parentOptions.mask;
        }
    }
}
exports.RegExpValidator = RegExpValidator;
//# sourceMappingURL=regexp-validator.js.map