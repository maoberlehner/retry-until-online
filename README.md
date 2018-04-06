# retry-until-online

[![Build Status](https://travis-ci.org/maoberlehner/retry-until-online.svg?branch=master)](https://travis-ci.org/maoberlehner/retry-until-online)
[![Coverage Status](https://coveralls.io/repos/github/maoberlehner/retry-until-online/badge.svg?branch=master)](https://coveralls.io/github/maoberlehner/retry-until-online?branch=master)
[![GitHub stars](https://img.shields.io/github/stars/maoberlehner/retry-until-online.svg?style=social&label=Star)](https://github.com/maoberlehner/retry-until-online)

Delay the execution of a function until the browser is back online.

Imagine a user is traveling by train and browsing your webshop on his phone. He finds what he is looking for and taps the "Buy now" button. But suddenly: a tunnel. The connection is lost and the AJAX request (for putting the product in the cart) fails.

By wrapping AJAX requests with the `retryUntilOnline` function you can prevent failing AJAX requests. Like in the tunnel example, the connection may be only lost for some seconds `retryUntilOnline` will execute the AJAX request as soon as the connection is restored.

## Usage

```bash
# Install the module.
npm install retry-until-online --save
```

```js
// Load the module.
import retryUntilOnline from 'retry-until-online';

// Delay the execution of a jQuery AJAX request until the browser is back online.
retryUntilOnline({ callback: () => $.ajax({ url: 'test.html' }) })
  .then((value) => {
    // This is called after the callback function was called,
    // `value` is the return value of the callback function.
  })
  .catch((value) => {
    // This is called when `maxTries` is reached and the offline
    // callback function was called, `value` is the return value
    // of the offline callback function.
  });
```

### Options

```js
import retryUntilOnline from 'retry-until-online';

const options = {
  callback: () => undefined, // Callback function which is called if online.
  offlineCallback: () => undefined, // Callback function that is executed if `tries` reaches 0.
  interval: 500, // Interval for checking the online status.
  maxTries: -1, // How often the online status should be checked before giving up (-1 = unlimited).
};

retryUntilOnline(options);
```

## About

### Author

Markus Oberlehner  
Website: https://markus.oberlehner.net  
Twitter: https://twitter.com/MaOberlehner  
PayPal.me: https://paypal.me/maoberlehner

### License

MIT
