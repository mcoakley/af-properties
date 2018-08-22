"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizer_1 = require("./normalizer");
class NoopNormalizer extends normalizer_1.Normalizer {
    _normalize(value) {
        return value;
    }
}
exports.NoopNormalizer = NoopNormalizer;
//# sourceMappingURL=noop-normalizer.js.map