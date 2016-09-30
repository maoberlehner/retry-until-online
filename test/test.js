/* eslint-env node, mocha */
const expect = require(`chai`).expect;

const retryUntilOnline = require(`../`);

/** @test {index} */
describe(`retryUntilOnline`, () => {
  it(`should be a function`, () => expect(retryUntilOnline).to.be.a(`function`));

  it(`should call the callback function when going online`, (done) => {
    global.navigator = { onLine: false };

    retryUntilOnline({
      callback: done,
      interval: 100
    });

    setTimeout(() => {
      navigator.onLine = true;
    }, 200);
  });

  it(`should stop trying to call the callback function after 2 tries`, (done) => {
    global.navigator = { onLine: false };

    let callbackCalled = false;

    retryUntilOnline({
      callback: () => {
        callbackCalled = true;
      },
      tries: 2,
      interval: 100
    });

    setTimeout(() => {
      navigator.onLine = true;
    }, 300);

    setTimeout(() => {
      if (callbackCalled) done(`callback was called`);
      else done();
    }, 400);
  });

  it(`should call the offlineCallback function after 2 tries`, (done) => {
    global.navigator = { onLine: false };

    let offlineCallbackCalled = false;

    retryUntilOnline({
      offlineCallback: () => {
        offlineCallbackCalled = true;
      },
      tries: 2,
      interval: 100
    });

    setTimeout(() => {
      if (!offlineCallbackCalled) done(`offlineCallback was not called`);
      else done();
    }, 300);
  });
});
