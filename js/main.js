/**
 * This script allows the author of a blog page to constantly reload the page,
 * so that she never needs to hit the browser's reload button after saving changes
 * to the HTML file she is working on.
 *
 * The auto reloading function is turned on and of with a checkbox that has ID #autoreload.
 *
 * The current scrolling position of the page is maintained, unless the page was scrolled
 * to the bottom. In this case, the page is scrolled to the bottom after reloading, thus
 * making sure the author does not have to manually scroll down when she adds new text
 * at the end.
 */
(function (window, document) {

    "use strict";

    var autoReloadCheckbox = document.getElementById("autoreload"),
        reloadInterval = 1000;

    function isScrolledDown() {
        return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    }

    function hasAutoReload() {
        return autoReloadCheckbox.checked;
    }

    function withTimeout(ms) {
        return function (func) {
            window.setTimeout(func, ms);
        };
    }

    function withInterval(ms) {
        return function (func) {
            window.setInterval(func, ms);
        };
    }

    function scrollDown() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    function saveCookie(name, value) {
        document.cookie = name + "=" + value;
    }

    function saveScrolledDown() {
        saveCookie("scrolledDown", isScrolledDown());
    }

    function saveAutoReload() {
        saveCookie("autoReload", hasAutoReload());
    }

    function loadCookie(name) {
        return decodeURIComponent(
            document.cookie.replace(
                new RegExp("(?:(?:^|.*;)\\s*" +
                            encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") +
                            "\\s*\\=\\s*([^;]*).*$)|^.*$"
                ), "$1"
            )
        ) === "true";
    }

    function wasScrolledDown() {
        return loadCookie("scrolledDown");
    }

    function hadAutoReload() {
        return loadCookie("autoReload");
    }

    function reloadPage() {
        document.location.reload();
    }

    function executeInterval() {
        if (hasAutoReload()) {
            saveScrolledDown();
            reloadPage();
        }
    }

    function onDocumentReady(func) {
        if (document.readyState !== "loading") {
            func();
        } else {
            document.addEventListener("DOMContentLoaded", func);
        }
    }

    function init() {
        if (wasScrolledDown()) {
            withTimeout(10)(scrollDown);
        }

        if (hadAutoReload()) {
            autoReloadCheckbox.checked = true;
        }

        autoReloadCheckbox.onclick = saveAutoReload;

        withInterval(reloadInterval)(executeInterval);
    }

    onDocumentReady(init);

}(window, document));
