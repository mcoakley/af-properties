import { isUsable } from "af-conditionals";

import { PropertyProvider } from "../property";
import { RegExpPropertyOptions } from "../regexp-property";
import {
    propertyAliasMap,
    propertyClassificationMap,
    PropertyDescription,
    PropertyMap,
} from "./describe-property";

export function getPropertyDescription(
    propertyName: string,
    aliasMap?: PropertyMap
): PropertyDescription | undefined {
    if (!isUsable(propertyName)) return undefined;

    propertyName = propertyName.toLocaleLowerCase();
    const propertyType = (isUsable(aliasMap) ?
        aliasMap![propertyName] || propertyAliasMap[propertyName] :
        propertyAliasMap[propertyName]
    );
    return propertyClassificationMap[propertyType];
}

export function propertyBuilder(
    value: any,
    propertyName: string,
    displayName?: string,
    aliasMap?: PropertyMap
): PropertyProvider | undefined {
    const propertyDescription = getPropertyDescription(propertyName, aliasMap);
    if (isUsable(propertyDescription)) {
        propertyDescription!.options.name = propertyName;
        if (!isUsable(
            (propertyDescription!.options as RegExpPropertyOptions).mask)
        ) {
            return propertyDescription!.factory(
                value,
                propertyName,
                displayName,
                propertyDescription!.options
            );
        } else {
            return propertyDescription!.factory(
                value,
                (propertyDescription!.options as RegExpPropertyOptions).mask,
                propertyName,
                displayName,
                propertyDescription!.options
            );
        }
    }
    return undefined;
}
