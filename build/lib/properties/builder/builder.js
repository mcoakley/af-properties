"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const af_conditionals_1 = require("af-conditionals");
const describe_property_1 = require("./describe-property");
function getPropertyDescription(propertyName, aliasMap) {
    if (!af_conditionals_1.isUsable(propertyName))
        return undefined;
    propertyName = propertyName.toLocaleLowerCase();
    const propertyType = (af_conditionals_1.isUsable(aliasMap) ?
        aliasMap[propertyName] || describe_property_1.propertyAliasMap[propertyName] :
        describe_property_1.propertyAliasMap[propertyName]);
    return describe_property_1.propertyClassificationMap[propertyType];
}
exports.getPropertyDescription = getPropertyDescription;
function propertyBuilder(value, propertyName, displayName, aliasMap) {
    const propertyDescription = getPropertyDescription(propertyName, aliasMap);
    if (af_conditionals_1.isUsable(propertyDescription)) {
        propertyDescription.options.name = propertyName;
        if (!af_conditionals_1.isUsable(propertyDescription.options.mask)) {
            return propertyDescription.factory(value, propertyName, displayName, propertyDescription.options);
        }
        else {
            return propertyDescription.factory(value, propertyDescription.options.mask, propertyName, displayName, propertyDescription.options);
        }
    }
    return undefined;
}
exports.propertyBuilder = propertyBuilder;
//# sourceMappingURL=builder.js.map