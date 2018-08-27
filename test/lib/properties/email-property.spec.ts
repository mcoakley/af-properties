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

    /*
     * The test email addresses given below are inspired (and some directly
     * copied) from https://en.wikipedia.org/wiki/Email_address.
     *
     * The list below does not contain an exhaustive list presently
     * (08/26/2018 MJC) but such a list is intended.
     *
     * The commented out addresses current do not pass for their intended
     * use (i.e. valid for goodTestEmails and invalid for badTestEmails).
     * Future work will be performed in order to ensure that this validity
     * is as accurate as possible. However, the current passing tests
     * represent the vast majority of cases on the public internet and
     * cover a large portion of potential edge cases.
     *
     * TODO: Build test cases and code to cover all possible email address
     * formats allowed by the RFC's.
     */
    describe("Tests various email formats for validation", function() {
        const goodTestEmails = [
            "test@example.com",
            "test+me@example.com",
            "test_me+you@example.com",
            "\"test..me\"@example.com",
            "!#$%&'*+-/=?^_`{|}~@example.com",
            "\".test.me\"@example.com",
            "\"test.me.\"@example.com",
            "\"(comment)test.me\"@example.com",
            "\"test.me(comment)\"@example.com",
            "x@example.com",
            // "\"very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual\"@strange.example.com",
            "test-me+you@example.com",
            // "test@example",
            // "\"()<>[]:,;@\\\"!#$%&'-/=?^_`{}| ~.a\"@example.org",
            "example@s.example",
            "test@[192.168.1.1]",
            // "test@[2001:DB8::1]",
            // "\" \"@example.com"
        ];

        const badTestEmails = [
            "test..me@example.com",
            ".test.me@example.com",
            "test.me.@example.com",
            "test(comment).me@example.com",
            "(comment)test.me@example.com",
            "test.me(comment)@example.com",
            "test.example.com",
            "test@me@example.com",
            "a\"b(c)d,e:f;g<h>i[j\k]l@example.com",
            "just\"not\"right@example.com",
            "this is\"not\allowed@example.com",
            "this\ still\"not\\allowed@example.com",
            // "1234567890123456789012345678901234567890123456789012345678901234+x@example.com",
            "test.me@example..com"
        ];

        goodTestEmails.forEach(async (value: string): Promise<void> => {
            it(`expects the email address ${value} to be valid`, async function() {
                const ep = emailPropertyFactory(value, PROPERTY_NAME);
                expect(await ep.validate()).to.be.true;
            });
        });

        badTestEmails.forEach(async (value: string): Promise<void> => {
            it(`expects the email address ${value} to be invalid`, async function() {
                const ep = emailPropertyFactory(value, PROPERTY_NAME);
                expect(await ep.validate()).to.be.false;
            });
        });
    });
});
