import { Normalizer, NormalizerOptions } from "./normalizer";
export interface StringNormalizerOptions extends NormalizerOptions {
    normalizeToLower?: boolean;
    normalizeToUpper?: boolean;
    trimLeft?: boolean;
    trimRight?: boolean;
}
export declare const DEFAULT_TRIM_LEFT_MASK: RegExp;
export declare const DEFAULT_TRIM_RIGHT_MASK: RegExp;
export declare class StringNormalizer<O extends StringNormalizerOptions = StringNormalizerOptions> extends Normalizer<string, O> {
    protected _normalize(value: string): string;
    protected _validateOptions(newOptions: O): void;
}
