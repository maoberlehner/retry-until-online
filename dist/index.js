(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.retryUntilOnline = factory());
}(this, (function () { 'use strict';

function retryUntilOnline(callback, opts) {
  if ( callback === void 0 ) callback = function () {};

  opts.interval = opts.interval !== undefined ? opts.interval : 500;
  opts.tries = opts.tries !== undefined ? opts.tries : -1;
  opts.offlineCallback = opts.offlineCallback !== undefined ? opts.offlineCallback : (function () {});

  if (!navigator.onLine && opts.tries !== 0) {
    opts.tries--;
    setTimeout(function () { return retryUntilOnline(callback, opts); }, opts.interval);
    return;
  } else if (opts.tries === 0) {
    opts.offlineCallback();
    return;
  }
  callback();
}

return retryUntilOnline;

})));
