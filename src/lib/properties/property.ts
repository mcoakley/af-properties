/**
 * Property module
 *
 * @author Mike Coakley https://github.com/mcoakley
 * @version 0.1.0
 */
import { isArray, isEmpty, isUsable } from "af-conditionals";
import waitUntil from "async-wait-until";
import { EventEmitter } from "eventemitter3";
import cloneDeep from "lodash/cloneDeep";

import { Normalizer } from "./normalizers";
import {
    DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY,
    DEFAULT_NORMALIZE_AFTER_SET,
    DEFAULT_NORMALIZE_BEFORE_VALIDATE,
    DEFAULT_NORMALIZE_IF_VALID,
    DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID,
    DEFAULT_PROPERTY_WAIT_INTERVAL,
    DEFAULT_PROPERTY_WAIT_TIMEOUT,
    DEFAULT_REQUIRED,
    PROPERTY_NORMALIZE_EVENT,
    PROPERTY_VALIDATION_CACHED_EVENT,
    PROPERTY_VALIDATION_EVENT,
    PROPERTY_VALUE_SET_EVENT,
    PropertyValidationEvent,
    PropertyValueChangeEvent,
} from "./property-defs";
import { RequiredValidator, Validator, ValidatorError } from "./validators";


export interface PropertyOptions {
    displayName?: string;
    invalidIfNotRequiredAndEmpty?: boolean;
    name: string;
    normalizeAfterSet?: boolean;
    normalizeBeforeValidate?: boolean;
    normalizeIfValid?: boolean;
    required?: boolean;
    stopValidationOnInvalid?: boolean;
    waitInterval?: number;
    waitTimeout?: number;
}

export interface PropertyProvider {
    value: any;

    getErrors(): ValidatorError[];
    getName(): string;
    getOptions(): PropertyOptions;
    isEqual(otherValue: any): boolean;
    isNormalized(): boolean;
    isRequired(): boolean;
    isValid(): boolean;
    isValidating(): boolean;
    normalize(): void;
    reset(): void;
    toString(): string;
    validate(): Promise<boolean>;
    valueOf(): any;
}

export class Property
    <T, O extends PropertyOptions = PropertyOptions>
    extends EventEmitter
    implements PropertyProvider {
    public static getNextPropertyCount(): number {
        return ++Property.propertyCount;
    }

    public static getPropertyCount(): number {
        return Property.propertyCount;
    }

    protected static propertyCount = 0;

    protected normalized = false;
    protected options!: O;

    /**
     * valid indicates if the current value has a valid value or not. The
     * value of valid is only considered properly set if validated is true.
     *
     * @protected
     * @type {boolean}
     * @memberof Property
     */
    protected valid = false;

    /**
     * validated indicates that the current value property has been checked via
     * the isValid method. A true value for this property indicates that the
     * current value has been validated and a false value indicates that the
     * current value has not been validated. The reset method resets this value
     * to false. reset is called each time the value property is changed.
     *
     * @protected
     * @type {boolean}
     * @memberof Property
     */
    protected validated = false;

    /**
     * validating indicates is the isValid method is processing a current
     * validation run or not. This boolean flag, when set to true, will not
     * allow the isValid method to be called again. This is needed since the
     * isValid method is asynchronous and should not be reentrant.
     *
     * @protected
     * @type {boolean}
     * @memberof Property
     */
    protected validating = false;

    private _value: T | undefined;

    constructor(
        newValue: T,
        newOptions: O,
        protected normalizers: Normalizer<T>[] = [],
        protected validators: Validator<T>[] = []
    ) {
        super();

        this._validateOptions(newOptions);
        if (!isArray.test(this.normalizers) ||
            this.normalizers.length === 0
        ) this.initDefaultNormalizers();
        if (!isArray.test(this.validators) ||
            this.validators.length === 0
        ) this.initDefaultValidators();

        this.value = newValue;
    }

    public get value(): T | undefined {
        return this._value;
    }

    public set value(newValue: T | undefined) {
        if (!this.isValueAllowed(newValue)) {
            throw new Error(this.options.displayName +
                " is not an allowed value.");
        }
        if (this.isEqual(newValue!)) return;

        const previousValue = this._value;
        this._value = newValue;
        this.reset();
        this.emitValueChanged(PROPERTY_VALUE_SET_EVENT, previousValue);
        if (this.options.normalizeAfterSet) this.normalize();
    }

    public getErrors(): ValidatorError[] {
        let allErrors: ValidatorError[] = [];
        this.validators.forEach((validator: Validator<T>) => {
            const validatorErrors = validator.getErrors();
            allErrors = allErrors.concat(validatorErrors);
        });
        return allErrors;
    }

    public getName(): string {
        return this.options.name;
    }

    public getOptions(): O {
        // We do not want to return a reference to our options, just a copy
        return cloneDeep<O>(this.options);
    }

    public isEqual(otherValue: T): boolean {
        return this.value === otherValue;
    }

    public isNormalized(): boolean {
        return this.normalized;
    }

    public isRequired(): boolean {
        return this.options.required!;
    }

    public isValid(): boolean {
        return this.valid;
    }

    public isValidating(): boolean {
        return this.validating;
    }

    public normalize(): void {
        if (this.isNormalized()
            || (this.isValid() && !this.options.normalizeIfValid)
        ) {
            return;
        }

        const previousValue = this.value;
        this.normalizers.forEach((normalizer: Normalizer<T>) => {
            this.value = normalizer.normalize(this.value!);
        });
        this.normalized = true;
        this.emitValueChanged(PROPERTY_NORMALIZE_EVENT, previousValue);
    }

    public reset(): void {
        this.validators.forEach((validator: Validator<T>) => {
            validator.reset();
        });
        this.normalized = false;
        this.valid = false;
        this.validated = false;
    }

    public toString(): string {
        this.normalize();
        return String(this.value);
    }

    public async validate(): Promise<boolean> {
        if (this.validating) {
            throw new Error("You have called validate() while another" +
                " validate() call is running.");
        }
        if (this.validated) {
            this.emitValidated(PROPERTY_VALIDATION_CACHED_EVENT, this.valid);
            return Promise.resolve(this.valid);
        }

        try {
            // Make sure we don't allow another call to isValid() while we are
            // processing this isValid() run
            this.validating = true;

            if (this.options.normalizeBeforeValidate) this.normalize();

            return await this._validate();
        } finally {
            this.validating = false;
        }
    }

    public valueOf(): T {
        this.normalize();
        return this.value!;
    }

    protected emitValidated(eventId: string, validated: boolean) {
        const event: PropertyValidationEvent<T> = {
            context: this,
            displayName: this.options.displayName!,
            name: this.options.name,
            validated,
            value: this.value!
        };
        this.emit(eventId, event, this);
    }

    protected emitValueChanged(eventId: string, previousValue: T | undefined) {
        const event: PropertyValueChangeEvent<T> = {
            context: this,
            displayName: this.options.displayName!,
            name: this.options.name,
            previousValue,
            value: this.value!
        };
        this.emit(eventId, event, this);
    }

    protected initDefaultNormalizers(): void {
        this.normalizers = [];
    }

    protected initDefaultValidators(): void {
        this.validators = [];

        // We always require the RequiredValidator because...
        // 1. We now have a validator that can answer the isValueAllowed
        //    question
        // 2. The RequiredValidator is written to even handle when a
        //    value is NOT required.
        this.validators.push(new RequiredValidator<T>({ parent: this }));
    }

    protected isValueAllowed(newValue: T | undefined): boolean {
        let allowed = true;
        for (const validator of this.validators) {
            allowed = validator.isValueAllowed(newValue);
            if (!allowed) break;
        }
        return allowed;
    }

    protected async _validate(): Promise<boolean> {
        let loopValid = true;
        for (const validator of this.validators) {
            // Since a validator could be validating due to other causes,
            // we must test here to ensure we don't call the validation
            // while it is currently running.
            await waitUntil((): boolean => {
                return !validator.isValidating();
            }, this.options.waitTimeout, this.options.waitInterval);

            const _valid = await validator.validate(this.value!);

            if (loopValid && !_valid) {
                loopValid = false;
                // By iterating through all of the validators we collect
                // possible errors before returning. If
                // stopValidationOnInvalid is true then we exit early.
                if (this.options.stopValidationOnInvalid) break;
            }
        }
        // We do not want to change valid inside our loop since it
        // is asynchronous, this ensures that we don't provide false
        // positives or negatives
        this.valid = loopValid;
        this.validated = true;

        this.emitValidated(PROPERTY_VALIDATION_EVENT, this.valid);

        return Promise.resolve(this.valid);
    }

    protected _validateOptions(newOptions: O): void {
        if (!isUsable.test(newOptions) || !isUsable.test(newOptions.name) ||
            isEmpty.test(newOptions.name)
        ) {
            throw new TypeError("Must supply a valid options object.");
        }
        this.options = newOptions;
        this.options.displayName =
            this.options.displayName || this.options.name;
        if (!isUsable.test(this.options.invalidIfNotRequiredAndEmpty)) {
            this.options.invalidIfNotRequiredAndEmpty =
                DEFAULT_INVALID_IF_NOT_REQUIRED_AND_EMPTY;
        }
        if (!isUsable.test(this.options.normalizeAfterSet)) {
            this.options.normalizeAfterSet = DEFAULT_NORMALIZE_AFTER_SET;
        }
        if (!isUsable.test(this.options.normalizeBeforeValidate)) {
            this.options.normalizeBeforeValidate =
                DEFAULT_NORMALIZE_BEFORE_VALIDATE;
        }
        if (!isUsable.test(this.options.normalizeIfValid)) {
            this.options.normalizeIfValid = DEFAULT_NORMALIZE_IF_VALID;
        }
        if (!isUsable.test(this.options.required)) {
            this.options.required = DEFAULT_REQUIRED;
        }
        if (!isUsable.test(this.options.stopValidationOnInvalid)) {
            this.options.stopValidationOnInvalid =
                DEFAULT_PROPERTY_STOP_VALIDATION_ON_INVALID;
        }
        this.options.waitInterval = this.options.waitInterval ||
            DEFAULT_PROPERTY_WAIT_INTERVAL;
        this.options.waitTimeout = this.options.waitTimeout ||
            DEFAULT_PROPERTY_WAIT_TIMEOUT;
    }
}
