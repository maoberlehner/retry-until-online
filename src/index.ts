export = function retryUntilOnline(
  callback: () => any,
  customOptions?: {
    interval?: number;
    tries?: number;
    offlineCallback?: () => any;
  },
) {
  const defaults = {
    interval: 500,
    tries: -1,
    offlineCallback: () => {},
  };
  const options = Object.assign({}, defaults, customOptions);

  if (!navigator.onLine && options.tries !== 0) {
    options.tries -= 1;
    setTimeout(() => retryUntilOnline(callback, options), options.interval);
    return;
  } else if (options.tries === 0) {
    options.offlineCallback();
    return;
  }
  callback();
}
