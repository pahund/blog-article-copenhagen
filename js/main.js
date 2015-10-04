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
 *
 * Auto reloading only happens if the page has actually changed. For this to work, you need
 * to run a Node.js server that watches the file system for changes. The server is pinged
 * by this script for changes, if the server answers "yes, there is a change", the reload
 * happens.
 */
(function (window, document) {

    "use strict";

    var autoReloadCheckbox = document.getElementById("autoreload"),
        reloadInterval = 100;

    function jsonp(src, options) {
        var callbackName = options.callbackName || "handleJsonP",
            onSuccess = options.onSuccess || function () {},
            onTimeout = options.onTimeout || function () {},
            timeout = options.timeout || 1; // sec

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = src;

        var timeoutTrigger = window.setTimeout(function () {
            window[callbackName] = function () {};
            document.getElementsByTagName("head")[0].removeChild(script);
            onTimeout();
        }, timeout * 1000);

        window[callbackName] = function (data) {
            window.clearTimeout(timeoutTrigger);
            document.getElementsByTagName("head")[0].removeChild(script);
            onSuccess(data);
        };

        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function disableAutoReloadCheckbox() {
        autoReloadCheckbox.setAttribute("disabled", "disabled");
    }

    function enableAutoReloadCheckbox() {
        autoReloadCheckbox.removeAttribute("disabled");
    }

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
            jsonp("http://localhost:8000", {
                onSuccess: function (pageHas) {
                    enableAutoReloadCheckbox();
                    if (pageHas.changed) {
                        saveScrolledDown();
                        reloadPage();
                    }
                },
                onTimeout: function () {
                    disableAutoReloadCheckbox();
                }
            });
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
