export default function retryUntilOnline({
  callback = () => undefined,
  offlineCallback = () => undefined,
  interval = 500,
  maxTries = -1,
  navigator = window.navigator,
} = {}) {
  let tries = 0;

  function resolveCallbackIfOnline(resolve, reject) {
    tries += 1;

    if (navigator.onLine) {
      return resolve(callback());
    }

    if (tries === maxTries) {
      return reject(offlineCallback());
    }

    return setTimeout(() => resolveCallbackIfOnline(resolve, reject), interval);
  }

  return new Promise((resolve, reject) => resolveCallbackIfOnline(resolve, reject));
}
