(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.retryUntilOnline = factory());
}(this, (function () { 'use strict';

function retryUntilOnline(parameters) {
  var defaults = {
    callback: function () {},
    interval: 500,
    tries: -1,
    offlineCallback: function () {}
  };
  var options = Object.assign({}, defaults, parameters);
  if (!navigator.onLine && options.tries !== 0) {
    options.tries--;
    setTimeout(function () { return retryUntilOnline(options); }, options.interval);
    return;
  } else if (options.tries === 0) {
    options.offlineCallback();
    return;
  }
  options.callback();
}

return retryUntilOnline;

})));
