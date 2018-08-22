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
const eventemitter3_1 = __importDefault(require("eventemitter3"));
exports.DEFAULT_IMMUTABLE_PROPERTY_NAME = "immutable_property";
class ImmutableProperty extends eventemitter3_1.default.EventEmitter {
    constructor(newValue, newName, newDisplayName) {
        super();
        if (!af_conditionals_1.isUsable.test(newName)) {
            throw new TypeError("Must supply a valid options to the constructor.");
        }
        this._name = newName;
        this._displayName = newDisplayName || newName;
        if (!this.isValueAllowed(newValue)) {
            throw new TypeError(this._displayName + " is not usable.");
        }
        this._value = newValue;
    }
    static getNextPropertyCount() {
        return ++ImmutableProperty.propertyCount;
    }
    static getPropertyCount() {
        return ImmutableProperty.propertyCount;
    }
    get value() {
        return this._value;
    }
    getErrors() {
        return [];
    }
    getName() {
        return this._name;
    }
    getOptions() {
        return {
            displayName: this._displayName,
            name: this._name
        };
    }
    isEqual(otherValue) {
        return this._value === otherValue;
    }
    isNormalized() {
        return true;
    }
    isRequired() {
        return false;
    }
    isValid() {
        return true;
    }
    isValidating() {
        return false;
    }
    normalize() {
    }
    reset() {
        return;
    }
    toString() {
        return String(this.value);
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(true);
        });
    }
    valueOf() {
        return this.value;
    }
    isValueAllowed(newValue) {
        return af_conditionals_1.isUsable.test(newValue);
    }
}
ImmutableProperty.propertyCount = 0;
exports.ImmutableProperty = ImmutableProperty;
function immutablePropertyFactory(value, name, displayName, defaultName = exports.DEFAULT_IMMUTABLE_PROPERTY_NAME) {
    const ic = ImmutableProperty.getNextPropertyCount();
    name = name || defaultName + "_" + ic;
    displayName = displayName || name;
    return new ImmutableProperty(value, name, displayName);
}
exports.immutablePropertyFactory = immutablePropertyFactory;
//# sourceMappingURL=immutable-property.js.map