"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumberBoundTypes;
(function (NumberBoundTypes) {
    NumberBoundTypes[NumberBoundTypes["unbounded"] = 0] = "unbounded";
    NumberBoundTypes[NumberBoundTypes["max_safe_integer"] = 1] = "max_safe_integer";
    NumberBoundTypes[NumberBoundTypes["infinity"] = 2] = "infinity";
})(NumberBoundTypes = exports.NumberBoundTypes || (exports.NumberBoundTypes = {}));
exports.DEFAULT_NUMBER_MAX_VALUE = 0;
exports.DEFAULT_NUMBER_MIN_VALUE = 0;
exports.DEFAULT_NUMBER_BOUNDS = NumberBoundTypes.unbounded;
exports.DEFAULT_NUMBER_PROPERTY_NAME = "number_property";
//# sourceMappingURL=number-property-defs.js.map