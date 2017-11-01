export = function retryUntilOnline(options?: {
  callback?: (...args: any[]) => any,
  offlineCallback?: (...args: any[]) => any,
  interval?: number,
  maxTries?: number,
  navigator?: object,
}) {
  const defaults = {
    callback: () => undefined,
    offlineCallback: () => undefined,
    interval: 500,
    maxTries: -1,
    navigator: window.navigator,
  };
  const {
    callback,
    offlineCallback,
    interval,
    maxTries,
    navigator,
  } = Object.assign({}, defaults, options);

  let tries = 0;

  const resolveCallbackIfOnline = (
    resolve: (value?: any) => void,
    reject: (value?: any) => void,
  ) => {
    tries += 1;

    if (navigator.onLine) {
      return resolve(callback());
    }

    if (tries === maxTries) {
      return reject(offlineCallback());
    }

    setTimeout(() => resolveCallbackIfOnline(resolve, reject), interval);
  };

  return new Promise((resolve, reject) => resolveCallbackIfOnline(resolve, reject));
};
