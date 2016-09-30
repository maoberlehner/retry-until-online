'use strict';

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

module.exports = retryUntilOnline;
