import { Validator, ValidatorOptions } from "./validator";
export interface RequiredValidatorOptions extends ValidatorOptions {
    invalidIfNotRequiredAndEmpty?: boolean;
}
export declare class RequiredValidator<T, O extends RequiredValidatorOptions = RequiredValidatorOptions> extends Validator<T, O> {
    protected _validate(value: T): Promise<boolean>;
    protected _validateOptions(newOptions: O): void;
}
