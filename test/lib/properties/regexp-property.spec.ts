import { expect } from "chai";
import "mocha";

import {
    DEFAULT_REGEXP_PROPERTY_NAME,
    defaultRegExpPropertyOptions,
    RegExpProperty,
    regexpPropertyFactory
} from "../../../src/lib";

// tslint:disable:no-unused-expression

describe("RegExpProperty class", function() {
    const PROPERTY_NAME = "RegExp Property";
    const REGEXP_DATA = "Hello World";

    describe("Test the factory method", function() {
        const drepo = defaultRegExpPropertyOptions;
        let rep: RegExpProperty;

        function testOptions() {
            const repo = rep.getOptions();
            expect(repo).to.deep.equal(drepo);
        }

        it("creates a RegExpProperty with all defaults", function() {
            rep = regexpPropertyFactory(REGEXP_DATA);
            expect(rep).to.be.an.instanceof(RegExpProperty);

            const rec = RegExpProperty.getPropertyCount();
            const dn = DEFAULT_REGEXP_PROPERTY_NAME + "_" + rec;
            drepo.name = dn;
            drepo.displayName = dn;
            testOptions();
        });

        it("creates a RegExpProperty with a supplied name", function() {
            rep = regexpPropertyFactory(REGEXP_DATA, undefined, PROPERTY_NAME);
            expect(rep).to.be.an.instanceof(RegExpProperty);

            drepo.name = PROPERTY_NAME;
            drepo.displayName = PROPERTY_NAME;
            testOptions();
        });
    });
});
