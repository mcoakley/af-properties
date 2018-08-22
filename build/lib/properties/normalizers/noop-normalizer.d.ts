import { Normalizer, NormalizerOptions } from "./normalizer";
export interface NoopNormalizerOptions extends NormalizerOptions {
}
export declare class NoopNormalizer<T, O extends NoopNormalizerOptions = NoopNormalizerOptions> extends Normalizer<T, O> {
    protected _normalize(value: T): T;
}
