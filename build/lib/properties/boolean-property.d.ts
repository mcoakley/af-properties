import { Property, PropertyOptions } from "./property";
export declare const DEFAULT_BOOLEAN_PROPERTY_NAME = "boolean_property";
export interface BooleanPropertyOptions extends PropertyOptions {
}
export declare const defaultBooleanPropertyOptions: BooleanPropertyOptions;
export declare class BooleanProperty<O extends BooleanPropertyOptions = BooleanPropertyOptions> extends Property<boolean, O> {
    protected initDefaultValidators(): void;
}
export declare function booleanPropertyFactory(value: boolean, name?: string, displayName?: string, options?: BooleanPropertyOptions, defaultName?: string): BooleanProperty;
