import { Validator, ValidatorOptions } from "./validator";
export interface AlwaysValidValidatorOptions extends ValidatorOptions {
}
export declare class AlwaysValidValidator<T, O extends AlwaysValidValidatorOptions = AlwaysValidValidatorOptions> extends Validator<T, O> {
    protected _validate(value: T): Promise<boolean>;
}
