/**
 * makes.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 07 Nov 2015
 */

import config from "./config";

const data = require(config.path);

function get(segment) {
    return data[segment];
}

export default {
    get
};
