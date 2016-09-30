export default function retryUntilOnline(parameters) {
  const defaults = {
    callback: () => {},
    interval: 500,
    tries: -1,
    offlineCallback: () => {}
  };
  const options = Object.assign({}, defaults, parameters);
  if (!navigator.onLine && options.tries !== 0) {
    options.tries--;
    setTimeout(() => retryUntilOnline(options), options.interval);
    return;
  } else if (options.tries === 0) {
    options.offlineCallback();
    return;
  }
  options.callback();
}
