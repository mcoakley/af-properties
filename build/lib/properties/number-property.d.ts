import { NumberBoundTypes } from "./number-property-defs";
import { Property, PropertyOptions } from "./property";
export interface NumberPropertyOptions extends PropertyOptions {
    maxValue?: number;
    minValue?: number;
    numberBounds?: NumberBoundTypes;
}
export declare const defaultNumberPropertyOptions: NumberPropertyOptions;
export declare class NumberProperty<O extends NumberPropertyOptions = NumberPropertyOptions> extends Property<number, O> {
    protected initDefaultValidators(): void;
}
export declare function numberPropertyFactory(value: number, name?: string, displayName?: string, options?: NumberPropertyOptions, defaultName?: string): NumberProperty;
