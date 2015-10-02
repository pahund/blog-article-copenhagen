function isScrolledDown() {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
}

function withTimeout(ms) {
    return function (func) {
        window.setTimeout(func, ms);
    };
}
function scrollDown() {
    window.scrollTo(0, document.body.scrollHeight);
}

function saveScrolledDown() {
    document.cookie = "scrolledDown=" + isScrolledDown();
}

function wasScrolledDown() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)scrolledDown\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "true";
}

function reloadPage() {
    document.location.reload();
}

(function () {
    if (wasScrolledDown()) {
        withTimeout(10)(scrollDown);
    }
    window.setInterval(
        function executeInterval() {
            saveScrolledDown();
            reloadPage();
        } , 1000);
}());
