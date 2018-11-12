"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const af_conditionals_1 = require("af-conditionals");
const eventemitter3_1 = require("eventemitter3");
const property_defs_1 = require("../property-defs");
exports.DEFAULT_NORMALIZER_NAME = "generic_normalizer";
class Normalizer extends eventemitter3_1.EventEmitter {
    constructor(newOptions) {
        super();
        this._validateOptions(newOptions);
        delete (this.options.parent);
    }
    static getNextNormalizerCount() {
        return ++Normalizer.normalizerCount;
    }
    static getNormalizerCount() {
        return Normalizer.normalizerCount;
    }
    getOptions() {
        return JSON.parse(JSON.stringify(this.options));
    }
    normalize(value) {
        if (value === this.lastValue)
            return value;
        const previousValue = value;
        const newValue = this._normalize(value);
        this.lastValue = newValue;
        const event = {
            context: this,
            displayName: this.options.displayName,
            name: this.options.name,
            previousValue,
            value: newValue
        };
        this.emit(property_defs_1.PROPERTY_NORMALIZE_EVENT, event, this);
        return newValue;
    }
    _validateOptions(newOptions) {
        const gc = Normalizer.getNextNormalizerCount();
        const defaultOptions = {
            displayName: exports.DEFAULT_NORMALIZER_NAME + "_" + gc,
            name: exports.DEFAULT_NORMALIZER_NAME + "_" + gc,
            parent: undefined
        };
        if (af_conditionals_1.isUsable(newOptions)) {
            this.options = newOptions;
            if (af_conditionals_1.isUsable(newOptions.parent)) {
                const parentOptions = newOptions.parent.getOptions();
                this.options.displayName =
                    this.options.displayName || parentOptions.displayName;
                this.options.name =
                    this.options.name || parentOptions.name;
            }
        }
        else {
            this.options = defaultOptions;
        }
        this.options.displayName =
            this.options.displayName || this.options.name ||
                defaultOptions.displayName;
        this.options.name = this.options.name || defaultOptions.name;
    }
}
Normalizer.normalizerCount = 0;
exports.Normalizer = Normalizer;
//# sourceMappingURL=normalizer.js.map