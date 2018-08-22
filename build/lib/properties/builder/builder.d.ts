import { PropertyProvider } from "../property";
import { PropertyDescription, PropertyMap } from "./describe-property";
export declare function getPropertyDescription(propertyName: string, aliasMap?: PropertyMap): PropertyDescription | undefined;
export declare function propertyBuilder(value: any, propertyName: string, displayName?: string, aliasMap?: PropertyMap): PropertyProvider | undefined;
