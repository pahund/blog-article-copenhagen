/**
 * makes.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 07 Nov 2015
 */

import config from "./config";

let data = null;

function init() {
    data = require(config.getPath());
}

function get(segment) {
    return data ? data[segment] : null;
}

export default {
    init,
    get
};
