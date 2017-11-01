(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    return function retryUntilOnline(options) {
        var defaults = {
            callback: function () { return undefined; },
            offlineCallback: function () { return undefined; },
            interval: 500,
            maxTries: -1,
            navigator: window.navigator,
        };
        var _a = Object.assign({}, defaults, options), callback = _a.callback, offlineCallback = _a.offlineCallback, interval = _a.interval, maxTries = _a.maxTries, navigator = _a.navigator;
        var tries = 0;
        var resolveCallbackIfOnline = function (resolve, reject) {
            tries += 1;
            if (navigator.onLine) {
                return resolve(callback());
            }
            if (tries === maxTries) {
                return reject(offlineCallback());
            }
            setTimeout(function () { return resolveCallbackIfOnline(resolve, reject); }, interval);
        };
        return new Promise(function (resolve, reject) { return resolveCallbackIfOnline(resolve, reject); });
    };
});
//# sourceMappingURL=index.js.map