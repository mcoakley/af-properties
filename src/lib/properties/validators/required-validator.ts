import { isEmpty, isUsable } from "af-conditionals";

import { PropertyOptions } from "../property";
import { DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY } from "../property-defs";
import { Validator, ValidatorOptions } from "./validator";

export interface RequiredValidatorOptions
    extends ValidatorOptions {
    invalidIfNotRequiredAndEmpty?: boolean;
}

/**
 * A validator class that checks for the required state. While the name may
 * imply that a value validated by this validator would be required by default
 * that is not the case. This validator can emit errors if a value validation errors
 * is empty and the invalidIfNotRequiredAndEmpty is set to true. Where would this
 * be seen? Effectively, with this setup the RequiredValidator is checking that the
 * property is defined and not null. - so not crazy valuable but a potential.
 *
 * @author Mike Coakley https://github.com/mcoakley
 * @date 2018-07-26
 * @export
 * @class RequiredValidator
 * @extends {Validator<T, O>}
 * @template T
 * @template O
 */
export class RequiredValidator
    <T, O extends RequiredValidatorOptions = RequiredValidatorOptions>
    extends Validator<T, O>
{
    protected async _validate(value: T): Promise<boolean> {
        if (isEmpty.test(value) &&
            (this.options.required ||
                this.options.invalidIfNotRequiredAndEmpty)
        ) {
            this.addEmptyError([
                this.options.displayName + " is empty and is required."
            ]);
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }

    protected _validateOptions(newOptions: O) {
        super._validateOptions(newOptions);

        const haveParent = isUsable.test(this.options.parent);
        let parentOptions: PropertyOptions;
        if (haveParent) parentOptions = this.options.parent!.getOptions();

        let defaultInvalidIfNotRequiredAndEmpty =
            DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY;
        if (haveParent &&
            isUsable.test(parentOptions!.invalidIfNotRequiredAndEmpty)) {
            defaultInvalidIfNotRequiredAndEmpty =
                parentOptions!.invalidIfNotRequiredAndEmpty!;
        }
        if (!isUsable.test(this.options.invalidIfNotRequiredAndEmpty)) {
            this.options.invalidIfNotRequiredAndEmpty =
                defaultInvalidIfNotRequiredAndEmpty;
        }
    }
}
