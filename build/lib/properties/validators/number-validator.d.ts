import { NumberBoundTypes } from "../number-property-defs";
import { Validator, ValidatorOptions } from "./validator";
export interface NumberValidatorOptions extends ValidatorOptions {
    maxValue?: number;
    minValue?: number;
    numberBounds?: NumberBoundTypes;
}
export declare class NumberValidator<O extends NumberValidatorOptions = NumberValidatorOptions> extends Validator<number, O> {
    protected _validate(value: number): Promise<boolean>;
    protected _validateOptions(newOptions: O): void;
}
