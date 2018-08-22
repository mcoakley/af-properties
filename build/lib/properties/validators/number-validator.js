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
const number_property_defs_1 = require("../number-property-defs");
const validator_1 = require("./validator");
class NumberValidator extends validator_1.Validator {
    _validate(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let valid = true;
            if (valid && this.options.minValue !== number_property_defs_1.DEFAULT_NUMBER_MIN_VALUE) {
                valid = value >= this.options.minValue;
                if (!valid) {
                    this.addInvalidError([
                        this.options.displayName + " cannot be less than the minimum value. (" +
                            this.options.minValue + ")"
                    ]);
                }
            }
            if (valid && this.options.maxValue !== number_property_defs_1.DEFAULT_NUMBER_MAX_VALUE) {
                valid = value <= this.options.maxValue;
                if (!valid) {
                    this.addInvalidError([
                        this.options.displayName + " cannot be greater than the maximum value. (" +
                            this.options.maxValue + ")"
                    ]);
                }
            }
            return Promise.resolve(valid);
        });
    }
    _validateOptions(newOptions) {
        super._validateOptions(newOptions);
        const haveParent = af_conditionals_1.isUsable.test(this.options.parent);
        let parentOptions;
        if (haveParent)
            parentOptions = this.options.parent.getOptions();
        let defaultNumberBounds = number_property_defs_1.DEFAULT_NUMBER_BOUNDS;
        if (haveParent) {
            defaultNumberBounds =
                parentOptions.numberBounds || defaultNumberBounds;
        }
        this.options.numberBounds =
            this.options.numberBounds || defaultNumberBounds;
        const defaultMaxValue = (this.options.numberBounds === number_property_defs_1.NumberBoundTypes.max_safe_integer ?
            Number.MAX_SAFE_INTEGER : (this.options.numberBounds === number_property_defs_1.NumberBoundTypes.infinity ?
            Number.POSITIVE_INFINITY : number_property_defs_1.DEFAULT_NUMBER_MAX_VALUE));
        const defaultMinValue = (this.options.numberBounds === number_property_defs_1.NumberBoundTypes.max_safe_integer ?
            Number.MIN_SAFE_INTEGER : (this.options.numberBounds === number_property_defs_1.NumberBoundTypes.infinity ?
            Number.NEGATIVE_INFINITY : number_property_defs_1.DEFAULT_NUMBER_MAX_VALUE));
        if (haveParent) {
            this.options.maxValue =
                parentOptions.maxValue || defaultMaxValue;
            this.options.minValue =
                parentOptions.minValue || defaultMinValue;
        }
        this.options.maxValue = this.options.maxValue || defaultMaxValue;
        this.options.minValue = this.options.minValue || defaultMinValue;
        if (this.options.minValue !== number_property_defs_1.DEFAULT_NUMBER_MIN_VALUE &&
            this.options.maxValue !== number_property_defs_1.DEFAULT_NUMBER_MAX_VALUE) {
            if (this.options.minValue > this.options.maxValue) {
                throw new RangeError("When set, minValue must be less than maxValue.");
            }
        }
        if (this.options.numberBounds === number_property_defs_1.NumberBoundTypes.max_safe_integer) {
            if (this.options.minValue < Number.MIN_SAFE_INTEGER ||
                this.options.maxValue > Number.MAX_SAFE_INTEGER) {
                throw new RangeError("Bounded by MIN/MAX Javascript safe " +
                    "integers and minValue or maxValue are outside that range.");
            }
        }
    }
}
exports.NumberValidator = NumberValidator;
//# sourceMappingURL=number-validator.js.map