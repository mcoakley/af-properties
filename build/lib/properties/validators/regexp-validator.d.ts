import { StringValidator, StringValidatorOptions } from "./string-validator";
export interface RegExpValidatorOptions extends StringValidatorOptions {
    mask?: RegExp;
}
export declare class RegExpValidator<O extends RegExpValidatorOptions = RegExpValidatorOptions> extends StringValidator<O> {
    protected _validate(value: string): Promise<boolean>;
    protected _validateOptions(newOptions: O): void;
}
