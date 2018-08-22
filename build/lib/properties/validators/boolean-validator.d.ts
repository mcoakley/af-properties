import { Validator, ValidatorOptions } from "./validator";
export interface BooleanValidatorOptions extends ValidatorOptions {
}
export declare class BooleanValidator<O extends BooleanValidatorOptions = BooleanValidatorOptions> extends Validator<boolean, O> {
    protected _validate(value: boolean): Promise<boolean>;
}
