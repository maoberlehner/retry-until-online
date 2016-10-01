# retry-until-online
Delay the execution of a function until the browser is back online.

Imagine a user is traveling by train and browsing your webshop on his phone. He finds what he is looking for and taps the "Buy now" button. But suddenly: a tunnel. The connection is lost and the AJAX request (for putting the product in the cart) fails.

By wrapping AJAX requests with the `retryUntilOnline` function you can prevent failing AJAX requests. Like in the tunnel example, the connection may be only lost for some seconds `retryUntilOnline` will execute the AJAX request as soon as the connection is restored.

## Demo
[Find a demo of the concept on codepen.io](http://codepen.io/moberlehner/pen/gwgdJm)

## Usage
```bash
# Install the module.
npm install retry-until-online --save
```

```js
// Load the module.
var retryUntilOnline = require('retry-until-online');

// Delay the execution of the jQuery AJAX request until the browser is back online.
retryUntilOnline(function () {
  $.ajax({ url: 'test.html' });
});
```

### Options
```js
var retryUntilOnline = require('retry-until-online');
var options = {
  interval: 500, // Interval for checking the online status.
  tries: -1, // How many times the online status should be checked before giving up (-1 = unlimited).
  offlineCallback: function () {} // Callback function that is executed if `tries` reaches 0.
};

retryUntilOnline(function () {
  // Some code that requires a connection to the internet (e.g. AJAX).
}, options);
```

## About
### Author
Markus Oberlehner  
Twitter: https://twitter.com/MaOberlehner  
PayPal.me: https://paypal.me/maoberlehner

### License
MIT
