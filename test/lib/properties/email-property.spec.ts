import { expect } from "chai";
import "mocha";

import {
    DEFAULT_EMAIL_PROPERTY_NAME,
    defaultEmailPropertyOptions,
    emailPropertyFactory,
    RegExpProperty
} from "../../../src/lib";

// tslint:disable:no-unused-expression

describe("EmailProperty class", function() {
    const PROPERTY_NAME = "RegExp Property";
    const EMAIL_DATA = "test@example.com";

    describe("Test the factory method", function() {
        const depo = defaultEmailPropertyOptions;
        let ep: RegExpProperty;

        function testOptions() {
            const epo = ep.getOptions();
            expect(epo).to.deep.equal(depo);
        }

        it("creates a RegExpProperty with defaults for an email address",
        function() {
            ep = emailPropertyFactory(EMAIL_DATA);
            expect(ep).to.be.an.instanceof(RegExpProperty);

            const rec = RegExpProperty.getPropertyCount();
            const dn = DEFAULT_EMAIL_PROPERTY_NAME + "_" + rec;
            depo.name = dn;
            depo.displayName = dn;
            testOptions();
        });

        it("creates a RegExpProperty with a supplied name", function() {
            ep = emailPropertyFactory(EMAIL_DATA, PROPERTY_NAME);
            expect(ep).to.be.an.instanceof(RegExpProperty);

            depo.name = PROPERTY_NAME;
            depo.displayName = PROPERTY_NAME;
            testOptions();
        });
    });
});
