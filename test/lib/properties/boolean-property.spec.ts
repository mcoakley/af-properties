import { expect } from "chai";
import "mocha";

import {
    BooleanProperty,
    booleanPropertyFactory,
    DEFAULT_BOOLEAN_PROPERTY_NAME,
    defaultBooleanPropertyOptions
} from "../../../src/lib";

// tslint:disable:no-unused-expression

describe("BooleanProperty class", function() {
    const PROPERTY_NAME = "String Property";
    const BOOLEAN_DATA = false;

    describe("Test the factory method", function() {
        const dbpo = defaultBooleanPropertyOptions;
        let bp: BooleanProperty;

        function testOptions() {
            const bpo = bp.getOptions();
            expect(bpo).to.deep.equal(dbpo);
        }

        it("creates a BooleanProperty with all defaults", function() {
            bp = booleanPropertyFactory(BOOLEAN_DATA);
            expect(bp).to.be.an.instanceof(BooleanProperty);

            const bc = BooleanProperty.getPropertyCount();
            const dn = DEFAULT_BOOLEAN_PROPERTY_NAME + "_" + bc;
            dbpo.name = dn;
            dbpo.displayName = dn;
            testOptions();
        });

        it("creates a BooleanProperty with a supplied name", function() {
            bp = booleanPropertyFactory(BOOLEAN_DATA, PROPERTY_NAME);
            expect(bp).to.be.an.instanceof(BooleanProperty);

            dbpo.name = PROPERTY_NAME;
            dbpo.displayName = PROPERTY_NAME;
            testOptions();
        });
    });
});
