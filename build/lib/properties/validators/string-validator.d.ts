import { Validator, ValidatorOptions } from "./validator";
export interface StringValidatorOptions extends ValidatorOptions {
    maxLength?: number;
    minLength?: number;
}
export declare class StringValidator<O extends StringValidatorOptions = StringValidatorOptions> extends Validator<string, O> {
    protected _validate(value: string): Promise<boolean>;
    protected _validateOptions(newOptions: O): void;
}
