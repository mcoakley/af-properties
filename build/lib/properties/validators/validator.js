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
const eventemitter3_1 = require("eventemitter3");
const property_defs_1 = require("../property-defs");
exports.VALIDATOR_ENRICHED_DATA_EVENT = "propertyEnrichedData";
var ValidatorErrorCodes;
(function (ValidatorErrorCodes) {
    ValidatorErrorCodes[ValidatorErrorCodes["NoError"] = 0] = "NoError";
    ValidatorErrorCodes[ValidatorErrorCodes["Empty"] = 1] = "Empty";
    ValidatorErrorCodes[ValidatorErrorCodes["RequiredAndEmpty"] = 2] = "RequiredAndEmpty";
    ValidatorErrorCodes[ValidatorErrorCodes["Invalid"] = 3] = "Invalid";
    ValidatorErrorCodes[ValidatorErrorCodes["RequiredAndInvalid"] = 4] = "RequiredAndInvalid";
    ValidatorErrorCodes[ValidatorErrorCodes["ValidationFailed"] = 5] = "ValidationFailed";
})(ValidatorErrorCodes = exports.ValidatorErrorCodes || (exports.ValidatorErrorCodes = {}));
exports.DEFAULT_VALIDATOR_NAME = "generic_validator";
class Validator extends eventemitter3_1.EventEmitter {
    constructor(newOptions) {
        super();
        this.errors = [];
        this.lastValid = false;
        this.validating = false;
        this._validateOptions(newOptions);
        delete (this.options.parent);
    }
    static getNextValidatorCount() {
        return ++Validator.validatorCount;
    }
    static getValidatorCount() {
        return Validator.validatorCount;
    }
    getErrors() {
        return this.errors;
    }
    getOptions() {
        return JSON.parse(JSON.stringify(this.options));
    }
    isValidating() {
        return this.validating;
    }
    isValueAllowed(newValue) {
        return af_conditionals_1.isUsable.test(newValue);
    }
    reset() {
        this.errors = [];
        this.lastValid = false;
        this.lastValue = undefined;
    }
    validate(value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.validating) {
                throw new Error("You have called validate() while another" +
                    " validate() call is running.");
            }
            if (value === this.lastValue) {
                return Promise.resolve(this.lastValid);
            }
            this.validating = true;
            this.reset();
            try {
                this.lastValid = yield this._validate(value);
                this.lastValue = value;
                return Promise.resolve(this.lastValid);
            }
            finally {
                this.validating = false;
            }
        });
    }
    addEmptyError(message) {
        this.addError(message, (this.options.required ?
            ValidatorErrorCodes.RequiredAndEmpty :
            ValidatorErrorCodes.Empty));
    }
    addError(message, errorCode) {
        this.errors.push({
            code: errorCode,
            displayName: this.options.displayName,
            message,
            name: this.options.name
        });
    }
    addInvalidError(message) {
        this.addError(message, (this.options.required ?
            ValidatorErrorCodes.RequiredAndInvalid :
            ValidatorErrorCodes.Invalid));
    }
    emitEnrichedData(enrichedData, value) {
        const event = {
            context: this,
            displayName: this.options.displayName,
            enrichedData,
            name: this.options.name,
            value
        };
        this.emit(exports.VALIDATOR_ENRICHED_DATA_EVENT, event, this);
    }
    _validateOptions(newOptions) {
        const gc = Validator.getNextValidatorCount();
        const defaultOptions = {
            displayName: exports.DEFAULT_VALIDATOR_NAME + "_" + gc,
            name: exports.DEFAULT_VALIDATOR_NAME + "_" + gc,
            parent: undefined,
            required: property_defs_1.DEFAULT_REQUIRED
        };
        if (af_conditionals_1.isUsable.test(newOptions)) {
            this.options = newOptions;
            if (af_conditionals_1.isUsable.test(this.options.parent)) {
                const parentOptions = this.options.parent.getOptions();
                this.options.displayName =
                    this.options.displayName || parentOptions.displayName;
                this.options.name =
                    this.options.name || parentOptions.name;
                if (!af_conditionals_1.isUsable.test(this.options.required)) {
                    this.options.required = parentOptions.required;
                }
            }
        }
        else {
            this.options = defaultOptions;
        }
        this.options.displayName =
            this.options.displayName || this.options.name ||
                defaultOptions.displayName;
        this.options.name = this.options.name || defaultOptions.name;
        if (!af_conditionals_1.isUsable.test(this.options.required)) {
            this.options.required = defaultOptions.required;
        }
    }
}
Validator.validatorCount = 0;
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map