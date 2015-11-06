/**
 * programmer.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 06 Nov 2015
 */
"use strict";

let usesTestAutomation = false;

module.exports = {
    useTestAutomation() {
        usesTestAutomation = true;
    },

    getCodeQuality() {
        return usesTestAutomation ? "awesome": "crappy";
    }
};
