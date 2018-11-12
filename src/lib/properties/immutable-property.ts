/**
 * ImmutableProperty
 *
 * A property that provides a constant value.
 *
 * @author Mike Coakley <mcoakley@acmeframework.com>
 * @version 0.1.0
 */
import { isUsable } from "af-conditionals";
import EventEmitter from "eventemitter3";

import { PropertyProvider } from "./property";
import { ValidatorError } from "./validators";


export const DEFAULT_IMMUTABLE_PROPERTY_NAME = "immutable_property";

export interface ImmutablePropertyOptions {
    displayName?: string;
    name: string;
}

export class ImmutableProperty<T>
    extends EventEmitter.EventEmitter
    implements PropertyProvider {
    public static getNextPropertyCount(): number {
        return ++ImmutableProperty.propertyCount;
    }

    public static getPropertyCount(): number {
        return ImmutableProperty.propertyCount;
    }

    protected static propertyCount = 0;

    private _value: T;
    private _name: string;
    private _displayName: string;

    constructor(newValue: T, newName: string, newDisplayName?: string) {
        super();

        if (!isUsable(newName)) {
            throw new TypeError(
                "Must supply a valid options to the constructor."
            );
        }
        this._name = newName;
        this._displayName = newDisplayName || newName;

        if (!this.isValueAllowed(newValue)) {
            throw new TypeError(this._displayName + " is not usable.");
        }
        this._value = newValue;
    }

    public get value(): T {
        return this._value;
    }

    public getErrors(): ValidatorError[] {
        return [];
    }

    public getName(): string {
        return this._name;
    }

    public getOptions(): ImmutablePropertyOptions {
        return {
            displayName: this._displayName,
            name: this._name
        };
    }

    public isEqual(otherValue: T): boolean {
        return this._value === otherValue;
    }

    public isNormalized(): boolean {
        return true;
    }

    public isRequired(): boolean {
        return false;
    }

    public isValid(): boolean {
        return true;
    }

    public isValidating(): boolean {
        return false;
    }

    public normalize(): void {
        // the value is assumed normal as the developer submitted it
    }

    public reset(): void {
        return; // Nothing to do...
    }

    public toString(): string {
        return String(this.value);
    }

    public async validate(): Promise<boolean> {
        return Promise.resolve(true);
    }

    public valueOf(): T {
        return this.value;
    }

    protected isValueAllowed(newValue: T): boolean {
        return isUsable(newValue);
    }
}

export function immutablePropertyFactory<T>(
    value: T,
    name?: string,
    displayName?: string,
    defaultName = DEFAULT_IMMUTABLE_PROPERTY_NAME
): ImmutableProperty<T> {
    const ic = ImmutableProperty.getNextPropertyCount();
    name = name || defaultName + "_" + ic;
    displayName = displayName || name;
    return new ImmutableProperty<T>(value, name, displayName);
}
