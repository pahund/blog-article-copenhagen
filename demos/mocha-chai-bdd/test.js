/**
 * test.js
 *
 * Run this test with:
 *
 * npm install
 * npm test
 *
 * Prerequisite: Node.js >= 4.0.0
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 06 Nov 2015
 */
"use strict";

const chai = require("chai"),
    programmer = require("./programmer");

let codeQuality;

chai.should();

describe("When I hire a programmer", () => {
    describe("the code quality", () => {
        before(() => codeQuality = programmer.getCodeQuality());
        it("is crappy", () => codeQuality.should.equal("crappy"));
    });
    describe("who to uses test automation", () => {
        before(() => programmer.useTestAutomation());
        describe("the code quality", () => {
            before(() => codeQuality = programmer.getCodeQuality());
            it("is awesome", () => codeQuality.should.equal("awesome"));
        });
    });
});
