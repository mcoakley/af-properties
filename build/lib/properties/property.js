"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const af_conditionals_1 = require("af-conditionals");
const async_wait_until_1 = __importDefault(require("async-wait-until"));
const eventemitter3_1 = require("eventemitter3");
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const property_defs_1 = require("./property-defs");
const validators_1 = require("./validators");
class Property extends eventemitter3_1.EventEmitter {
    constructor(newValue, newOptions, normalizers = [], validators = []) {
        super();
        this.normalizers = normalizers;
        this.validators = validators;
        this.normalized = false;
        this.valid = false;
        this.validated = false;
        this.validating = false;
        this._validateOptions(newOptions);
        if (!af_conditionals_1.isArray.test(this.normalizers) ||
            this.normalizers.length === 0)
            this.initDefaultNormalizers();
        if (!af_conditionals_1.isArray.test(this.validators) ||
            this.validators.length === 0)
            this.initDefaultValidators();
        this.value = newValue;
    }
    static getNextPropertyCount() {
        return ++Property.propertyCount;
    }
    static getPropertyCount() {
        return Property.propertyCount;
    }
    get value() {
        return this._value;
    }
    set value(newValue) {
        if (!this.isValueAllowed(newValue)) {
            throw new Error(this.options.displayName +
                " is not an allowed value.");
        }
        if (this.isEqual(newValue))
            return;
        const previousValue = this._value;
        this._value = newValue;
        this.reset();
        this.emitValueChanged(property_defs_1.PROPERTY_VALUE_SET_EVENT, previousValue);
        if (this.options.normalizeAfterSet)
            this.normalize();
    }
    getErrors() {
        let allErrors = [];
        this.validators.forEach((validator) => {
            const validatorErrors = validator.getErrors();
            allErrors = allErrors.concat(validatorErrors);
        });
        return allErrors;
    }
    getName() {
        return this.options.name;
    }
    getOptions() {
        return cloneDeep_1.default(this.options);
    }
    isEqual(otherValue) {
        return this.value === otherValue;
    }
    isNormalized() {
        return this.normalized;
    }
    isRequired() {
        return this.options.required;
    }
    isValid() {
        return this.valid;
    }
    isValidating() {
        return this.validating;
    }
    normalize() {
        if (this.isNormalized()
            || (this.isValid() && !this.options.normalizeIfValid)) {
            return;
        }
        const previousValue = this.value;
        this.normalizers.forEach((normalizer) => {
            this.value = normalizer.normalize(this.value);
        });
        this.normalized = true;
        this.emitValueChanged(property_defs_1.PROPERTY_NORMALIZE_EVENT, previousValue);
    }
    reset() {
        this.validators.forEach((validator) => {
            validator.reset();
        });
        this.normalized = false;
        this.valid = false;
        this.validated = false;
    }
    toString() {
        this.normalize();
        return String(this.value);
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.validating) {
                throw new Error("You have called validate() while another" +
                    " validate() call is running.");
            }
            if (this.validated) {
                this.emitValidated(property_defs_1.PROPERTY_VALIDATION_CACHED_EVENT, this.valid);
                return Promise.resolve(this.valid);
            }
            try {
                this.validating = true;
                if (this.options.normalizeBeforeValidate)
                    this.normalize();
                return yield this._validate();
            }
            finally {
                this.validating = false;
            }
        });
    }
    valueOf() {
        this.normalize();
        return this.value;
    }
    emitValidated(eventId, validated) {
        const event = {
            context: this,
            displayName: this.options.displayName,
            name: this.options.name,
            validated,
            value: this.value
        };
        this.emit(eventId, event, this);
    }
    emitValueChanged(eventId, previousValue) {
        const event = {
            context: this,
            displayName: this.options.displayName,
            name: this.options.name,
            previousValue,
            value: this.value
        };
        this.emit(eventId, event, this);
    }
    initDefaultNormalizers() {
        this.normalizers = [];
    }
    initDefaultValidators() {
        this.validators = [];
        this.validators.push(new validators_1.RequiredValidator({ parent: this }));
    }
    isValueAllowed(newValue) {
        let allowed = true;
        for (const validator of this.validators) {
            allowed = validator.isValueAllowed(newValue);
            if (!allowed)
                break;
        }
        return allowed;
    }
    _validate() {
        return __awaiter(this, void 0, void 0, function* () {
            let loopValid = true;
            for (const validator of this.validators) {
                yield async_wait_until_1.default(() => {
                    return !validator.isValidating();
                }, this.options.waitTimeout, this.options.waitInterval);
                const _valid = yield validator.validate(this.value);
                if (loopValid && !_valid) {
                    loopValid = false;
                    if (this.options.stopValidationOnInvalid)
                        break;
                }
            }
            this.valid = loopValid;
            this.validated = true;
            this.emitValidated(property_defs_1.PROPERTY_VALIDATION_EVENT, this.valid);
            return Promise.resolve(this.valid);
        });
    }
    _validateOptions(newOptions) {
        if (!af_conditionals_1.isUsable.test(newOptions) || !af_conditionals_1.isUsable.test(newOptions.name) ||
            af_conditionals_1.isEmpty.test(newOptions.name)) {
            throw new TypeError("Must supply a valid options object.");
        }
        this.options = newOptions;
        this.options.displayName =
            this.options.displayName || this.options.name;
        if (!af_conditionals_1.isUsable.test(this.options.invalidIfNotRequiredAndEmpty)) {
            this.options.invalidIfNotRequiredAndEmpty =
                property_defs_1.DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY;
        }
        if (!af_conditionals_1.isUsable.test(this.options.normalizeAfterSet)) {
            this.options.normalizeAfterSet = property_defs_1.DEFAULT_NORMALIZE_AFTER_SET;
        }
        if (!af_conditionals_1.isUsable.test(this.options.normalizeBeforeValidate)) {
            this.options.normalizeBeforeValidate =
                property_defs_1.DEFAULT_NORMALIZE_BEFORE_VALIDATE;
        }
        if (!af_conditionals_1.isUsable.test(this.options.normalizeIfValid)) {
            this.options.normalizeIfValid = property_defs_1.DEFAULT_NORMALIZE_IF_VALID;
        }
        if (!af_conditionals_1.isUsable.test(this.options.required)) {
            this.options.required = property_defs_1.DEFAULT_REQUIRED;
        }
        if (!af_conditionals_1.isUsable.test(this.options.stopValidationOnInvalid)) {
            this.options.stopValidationOnInvalid =
                property_defs_1.DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID;
        }
        this.options.waitInterval = this.options.waitInterval ||
            property_defs_1.DEFAULT_PROPERTY_WAIT_INTERVAL;
        this.options.waitTimeout = this.options.waitTimeout ||
            property_defs_1.DEFAULT_PROPERTY_WAIT_TIMEOUT;
    }
}
Property.propertyCount = 0;
exports.Property = Property;
//# sourceMappingURL=property.js.map