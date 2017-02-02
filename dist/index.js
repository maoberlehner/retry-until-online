(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.retryUntilOnline = factory());
}(this, (function () { 'use strict';

function retryUntilOnline(callback, customOptions) {
  if ( callback === void 0 ) callback = function () {};

  var defaults = {
    interval: 500,
    tries: -1,
    offlineCallback: function () {},
  };
  var options = Object.assign({}, defaults, customOptions);

  if (!navigator.onLine && options.tries !== 0) {
    options.tries -= 1;
    setTimeout(function () { return retryUntilOnline(callback, options); }, options.interval);
    return;
  } else if (options.tries === 0) {
    options.offlineCallback();
    return;
  }
  callback();
}

return retryUntilOnline;

})));
