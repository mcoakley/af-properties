"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_property_1 = require("../boolean-property");
const email_property_defs_1 = require("../email-property-defs");
const immutable_property_1 = require("../immutable-property");
const number_property_1 = require("../number-property");
const number_property_defs_1 = require("../number-property-defs");
const regexp_property_1 = require("../regexp-property");
const regexp_property_defs_1 = require("../regexp-property-defs");
const string_property_1 = require("../string-property");
const string_property_defs_1 = require("../string-property-defs");
exports.propertyClassificationNames = [
    "boolean",
    "immutable",
    "number",
    "regexp",
    "string",
    "email",
    "geohash",
    "ip_address",
    "latitude",
    "longitude",
    "name_first",
    "name_last",
    "name_middle",
    "name_prefix",
    "name_suffix",
    "country",
    "county",
    "zip_code",
    "postal_code",
    "state_province",
    "city",
    "address_line",
    "phone_number",
    "phone_number_extension",
    "date_birth",
    "date_anniversary"
];
exports.propertyAliasMap = {
    address: "address_line",
    address1: "address_line",
    address2: "address_line",
    address3: "address_line",
    address_line: "address_line",
    addressline: "address_line",
    age: "number",
    anniversary: "date_anniversary",
    birthdate: "date_birth",
    birthday: "date_birth",
    boolean: "boolean",
    borough: "city",
    city: "city",
    count: "number",
    country: "country",
    countrycode: "country",
    county: "county",
    date_anniversary: "date_anniversary",
    dateanniversary: "date_anniversary",
    datebirth: "date_birth",
    datebirthdate: "date_birth",
    datebirthday: "date_birth",
    email: "email",
    emailaddress: "email",
    fax: "phone_number",
    fax_number: "phone_number",
    faxnumber: "phone_number",
    first_name: "name_first",
    firstname: "name_first",
    immutable: "immutable",
    ip_address: "ip_address",
    ipaddress: "ip_address",
    last_name: "name_list",
    lastname: "name_last",
    lat: "latitude",
    latitude: "latitude",
    longitude: "longitude",
    middle_name: "name_middle",
    middleinitial: "name_middle",
    middlename: "name_middle",
    mobile: "phone_number",
    mobile_number: "phone_number",
    mobilenumber: "phone_number",
    name_first: "name_first",
    name_last: "name_last",
    name_middle: "name_middle",
    name_prefix: "name_prefix",
    name_suffix: "name_suffix",
    number: "number",
    phone: "phone_number",
    phone_number: "phone_number",
    phone_number_extension: "phone_number_extention",
    phoneext: "phone_number_extension",
    phonenumber: "phone_number",
    phonenumberext: "phone_number_extension",
    phonenumberextension: "phone_number_extension",
    postal: "postal_code",
    postal_code: "postal_code",
    postalcode: "postal_code",
    province: "state_province",
    regexp: "regexp",
    state: "state_province",
    state_province: "state_province",
    stateprovince: "state_province",
    string: "string",
    work: "phone_number",
    work_ext: "phone_number_extension",
    work_extension: "phone_number_extension",
    work_fax: "phone_number",
    work_fax_number: "phone_number",
    work_number: "phone_number",
    workext: "phone_number_extension",
    workextension: "phone_number_extension",
    workfax: "phone_number",
    workfaxNumber: "phone_number",
    worknumber: "phone_number",
    zip: "zip_code",
    zip_code: "zip_code",
    zipcode: "zip_code",
};
exports.propertyClassificationMap = {
    address_line: {
        classification: "address_line",
        descriptionName: "address_line",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "Address",
            maxLength: 255,
            name: "address_line"
        },
    },
    boolean: {
        classification: "boolean",
        descriptionName: "boolean",
        factory: boolean_property_1.booleanPropertyFactory,
        options: {
            displayName: "Boolean",
            name: boolean_property_1.DEFAULT_BOOLEAN_PROPERTY_NAME,
            required: false
        },
    },
    city: {
        classification: "city",
        descriptionName: "City",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "City",
            maxLength: 255,
            minLength: 1,
            name: "city"
        },
    },
    country: {
        classification: "country",
        descriptionName: "Country",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "Country",
            maxLength: 255,
            minLength: 1,
            name: "country"
        },
    },
    date_anniversary: {
        classification: "date_anniversary",
        descriptionName: "Anniversary",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "Anniversary",
            maxLength: 10,
            minLength: 6,
            name: "anniversary"
        },
    },
    date_birth: {
        classification: "date_birth",
        descriptionName: "Birthday",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "Birthday",
            maxLength: 10,
            minLength: 6,
            name: "birthday"
        },
    },
    email: {
        classification: "email",
        descriptionName: "emailAddress",
        factory: regexp_property_1.regexpPropertyFactory,
        options: {
            displayName: "Email Address",
            mask: email_property_defs_1.DEFAULT_EMAIL_MASK,
            maxLength: email_property_defs_1.MAXIMUM_EMAIL_ADDRESS_LEN,
            minLength: email_property_defs_1.MINIMUM_EMAIL_ADDRESS_LEN,
            name: email_property_defs_1.DEFAULT_EMAIL_PROPERTY_NAME,
            normalizeToLower: true
        },
    },
    geohash: {
        classification: "geohas",
        descriptionName: "GeoHash",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "GeoHash",
            minLength: 1,
            name: "geohash"
        },
    },
    immutable: {
        classification: "immutable",
        descriptionName: "immutable",
        factory: immutable_property_1.immutablePropertyFactory,
        options: {
            displayName: "Immutable",
            name: immutable_property_1.DEFAULT_IMMUTABLE_PROPERTY_NAME
        },
    },
    ip_address: {
        classification: "ip_address",
        descriptionName: "IP Address",
        factory: regexp_property_1.regexpPropertyFactory,
        options: {
            displayName: "IP Address",
            mask: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
            maxLength: 15,
            minLength: 7,
            name: "ip_address"
        },
    },
    latitude: {
        classification: "latitude",
        descriptionName: "Latitude",
        factory: regexp_property_1.regexpPropertyFactory,
        options: {
            displayName: "Latitude",
            mask: /^(\-?\d+(\.\d+)?)$/,
            name: "latitude"
        },
    },
    longitude: {
        classification: "longitude",
        descriptionName: "Longitude",
        factory: regexp_property_1.regexpPropertyFactory,
        options: {
            displayName: "Longitude",
            mask: /^(\-?\d+(\.\d+)?)$/,
            name: "longitude"
        },
    },
    name_first: {
        classification: "name_first",
        descriptionName: "First Name",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "First Name",
            maxLength: 255,
            minLength: 1,
            name: "name_first"
        },
    },
    name_last: {
        classification: "name_last",
        descriptionName: "Last Name",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "Last Name",
            maxLength: 255,
            minLength: 1,
            name: "name_last"
        },
    },
    name_middle: {
        classification: "name_middle",
        descriptionName: "Middle Name",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "Middle Name",
            maxLength: 255,
            minLength: 1,
            name: "name_middle"
        },
    },
    name_prefix: {
        classification: "name_prefix",
        descriptionName: "Name Prefix",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "Name Prefix",
            maxLength: 255,
            minLength: 1,
            name: "name_prefix"
        },
    },
    name_suffix: {
        classification: "name_suffix",
        descriptionName: "Name Suffix",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "Name Suffix",
            maxLength: 255,
            minLength: 1,
            name: "name_suffix"
        },
    },
    number: {
        classification: "number",
        descriptionName: "number",
        factory: number_property_1.numberPropertyFactory,
        options: {
            displayName: "Number",
            name: number_property_defs_1.DEFAULT_NUMBER_PROPERTY_NAME
        },
    },
    phone_number: {
        classification: "phone_number",
        descriptionName: "Phone Number",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "Phone Number",
            maxLength: 15,
            minLength: 7,
            name: "phone_number"
        },
    },
    phone_number_extension: {
        classification: "phone_number_extension",
        descriptionName: "Phone Number Extension",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "Phone Number Extension",
            maxLength: 10,
            minLength: 1,
            name: "phone_number_extension"
        },
    },
    postal_code: {
        classification: "postal_code",
        descriptionName: "Postal Code",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "Postal Code",
            maxLength: 15,
            minLength: 6,
            name: "postal_code"
        },
    },
    regexp: {
        classification: "regexp",
        descriptionName: "regexp",
        factory: regexp_property_1.regexpPropertyFactory,
        options: {
            displayName: "RegExp",
            mask: regexp_property_defs_1.DEFAULT_REGEXP_MASK,
            name: regexp_property_defs_1.DEFAULT_REGEXP_PROPERTY_NAME
        },
    },
    state_province: {
        classification: "state_province",
        descriptionName: "State or Province",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "State/Province",
            maxLength: 255,
            minLength: 1,
            name: "state_province"
        },
    },
    string: {
        classification: "string",
        descriptionName: "string",
        factory: string_property_1.stringPropertyFactory,
        options: {
            displayName: "String",
            minLength: 1,
            name: string_property_defs_1.DEFAULT_STRING_PROPERTY_NAME
        },
    }
};
//# sourceMappingURL=describe-property.js.map