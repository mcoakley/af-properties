import { PropertyOptions, PropertyProvider } from "../property";
export declare type ClassificationName = string;
export declare const propertyClassificationNames: ClassificationName[];
export interface PropertyMap {
    [propName: string]: ClassificationName;
}
export declare const propertyAliasMap: PropertyMap;
export interface PropertyDescription {
    classification: string;
    descriptionName: string;
    factory: (...args: any[]) => PropertyProvider;
    options: PropertyOptions;
}
export interface PropertyDescriptionMap {
    [propName: string]: PropertyDescription;
}
export declare const propertyClassificationMap: PropertyDescriptionMap;
