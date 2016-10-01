export default function retryUntilOnline(callback = () => {}, opts) {
  opts.interval = opts.interval !== undefined ? opts.interval : 500;
  opts.tries = opts.tries !== undefined ? opts.tries : -1;
  opts.offlineCallback = opts.offlineCallback !== undefined ? opts.offlineCallback : (() => {});

  if (!navigator.onLine && opts.tries !== 0) {
    opts.tries--;
    setTimeout(() => retryUntilOnline(callback, opts), opts.interval);
    return;
  } else if (opts.tries === 0) {
    opts.offlineCallback();
    return;
  }
  callback();
}
