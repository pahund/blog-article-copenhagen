/**
 * Starts an HTTP server and a file watcher. The file watcher detects changes
 * to HTML files in the project. The HTTP server responds to requests with a
 * JSON object that contains the property changed=true if the HTML file that
 * corresponds to the requests referrer has changed.
 */

"use strict";

const watch = require("watch"),
    http = require("http"),
    changedFiles = {};

function handleChange(fileName) {
    const htmlFileName = getHtmlFileName(fileName);
    if (!htmlFileName) {
        return;
    }
    changedFiles[htmlFileName] = true;
}

function badRequest(response) {
    response.writeHead(400);
    response.end();
}

function getHtmlFileName(string) {
    const htmlFileName = string.replace(/^.*\/([^.]+\.html)$/, "$1");
    return htmlFileName.endsWith(".html") ? htmlFileName : undefined;
}

watch.createMonitor(process.cwd(), monitor => monitor.on("changed", handleChange));

// Configure our HTTP server to respond with Hello World to all requests.
const server = http.createServer((request, response) => {
    const referrer = request.headers.referer;
    if (!referrer) {
        return badRequest(response);
    }
    const htmlFileName = getHtmlFileName(referrer);
    if (!htmlFileName) {
        return badRequest(response);
    }
    let changed = changedFiles[htmlFileName] || false;
    if (changed) {
        changedFiles[htmlFileName] = false;
    }
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.end("handleJsonP({ changed: " + changed + " });\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
