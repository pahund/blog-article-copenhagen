function isScrolledDown() {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
}

function hasAutoReload() {
    return document.getElementById("autoreload").checked;
}

function withTimeout(ms) {
    return function (func) {
        window.setTimeout(func, ms);
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
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) === "true";
    //return document.cookie.replace("(?:(?:^|.*;\s*)" + name + "\s*\=\s*([^;]*).*$)|^.*$", "$1") === "true";
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

(function () {
    console.log("[PH_LOG] loadCookie('autoReload'): ", loadCookie('autoReload')); // PH_TODO: REMOVE
    console.log("[PH_LOG] loadCookie('scrolledDown'): ", loadCookie('scrolledDown')); // PH_TODO: REMOVE
    if (wasScrolledDown()) {
        withTimeout(10)(scrollDown);
    }
    if (hadAutoReload()) {
        console.log("[PH_LOG] phugg"); // PH_TODO: REMOVE
        document.getElementById("autoreload").checked = true;
    }
    window.setInterval(
        function executeInterval() {
            if (hasAutoReload()) {
                saveAutoReload();
                saveScrolledDown();
                reloadPage();
            }
        } , 1000);
}());
