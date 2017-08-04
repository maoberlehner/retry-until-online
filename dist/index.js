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
    return function retryUntilOnline(callback, customOptions) {
        var defaults = {
            interval: 500,
            tries: -1,
            offlineCallback: function () {
                // Intentionally left blank.
            },
        };
        var options = Object.assign({}, defaults, customOptions);
        if (!navigator.onLine && options.tries !== 0) {
            options.tries -= 1;
            setTimeout(function () { return retryUntilOnline(callback, options); }, options.interval);
            return;
        }
        else if (options.tries === 0) {
            options.offlineCallback();
            return;
        }
        callback();
    };
});
//# sourceMappingURL=index.js.map