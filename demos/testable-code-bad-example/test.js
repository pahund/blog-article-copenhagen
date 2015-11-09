/**
 * test.js
 *
 * Bad example: we're not really unit testing makes.js, we're also testing makes.json and config.js!
 *
 * Run this test with:
 *
 * npm install
 * npm test
 *
 * Prerequisite: Babel installed globally
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 07 Nov 2015
 */
import chai from "chai";
import makes from "./makes";

chai.should();

let result = null;

describe("When I use the makes module", () => {
    describe("to get car makes", () => {
        before(() => result = makes.get("cars"));
        describe("the result", () => {
            it("is a list of car makes", () => {
                result[0].name.should.equal("Abarth");
                result[1].name.should.equal("AC");
                result[2].name.should.equal("Acura");
            });
        });
    });
});
