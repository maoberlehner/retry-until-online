import retryUntilOnline = require('../src');

// TODO set lower interval for faster tests

describe(`retryUntilOnline()`, () => {
  test(`It should be a function.`, () => expect(typeof retryUntilOnline).toBe(`function`));

  test(`It should return a promise.`, () => {
    expect(retryUntilOnline()).toBeInstanceOf(Promise);
  });

  test(`It should call the given callback function if online.`, () => {
    expect.assertions(1);

    const callback = jest.fn();
    const navigator = { onLine: true };

    retryUntilOnline({ callback, navigator })
      .then(() => expect(callback).toBeCalled());
  });

  test(`It should call the given callback function if state changes from offline to online.`, (done) => {
    const callback = jest.fn();
    const navigator = { onLine: false };

    setTimeout(() => {
      navigator.onLine = true;
    }, 10);

    retryUntilOnline({ callback, navigator, interval: 50 })
      .then(() => {
        expect(callback).toBeCalled();
        done();
      });
  });

  test(`It should stop trying and reject after the given maximum of tries.`, (done) => {
    const callback = jest.fn();
    const navigator = { onLine: false };

    retryUntilOnline({ callback, maxTries: 2, navigator, interval: 50 })
      .catch(() => {
        expect(callback).not.toBeCalled();
        done();
      });
  });

  test(`It should call the offline callback after the given maximum of tries.`, (done) => {
    const offlineCallback = jest.fn();
    const navigator = { onLine: false };

    retryUntilOnline({ offlineCallback, maxTries: 2, navigator, interval: 50 })
      .catch(() => {
        expect(offlineCallback).toBeCalled();
        done();
      });
  });

  test(`It should resolve with the callback return value.`, (done) => {
    const callback = jest.fn().mockReturnValue('foo');
    const navigator = { onLine: true };

    retryUntilOnline({ callback, navigator })
      .then((value) => {
        expect(value).toBe('foo');
        done();
      });
  });

  test(`It should reject with the callback return value.`, (done) => {
    const offlineCallback = jest.fn().mockReturnValue('foo');
    const navigator = { onLine: false };

    retryUntilOnline({ offlineCallback, maxTries: 1, navigator })
      .catch((value) => {
        expect(value).toBe('foo');
        done();
      });
  });
});
