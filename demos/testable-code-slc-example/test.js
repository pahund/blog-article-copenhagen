/**
 * Slightly less crappy example:
 * we're working around the fact that config.js and makes.js are singletons by using freshy to be able to mock.
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
import freshy from "freshy";
import sinon from "sinon";
import config from "./config";

chai.should();

let result = null;

describe("When I use the makes module", () => {
    describe("to get car makes", () => {
        before(() => {
            sinon.stub(config, "getPath").returns("./test-makes.json");
            const makes = freshy.freshy("./makes");
            result = makes.get("cars");
        });
        describe("the result", () => {
            it("is a list of car makes", () => {
                result[0].name.should.equal("CarMake1");
                result[1].name.should.equal("CarMake2");
                result[2].name.should.equal("CarMake3");
            });
        });
        after(() => config.getPath.restore());
    });
});
