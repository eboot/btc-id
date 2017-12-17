btc-id [![npm version](https://badge.fury.io/js/btc-id.svg)](https://badge.fury.io/js/btc-id)
======
A Node.js-based Implementation of Bitcoin Indonesia's Trade API

## Compatibility
This implementation is compatible with Trade API v1.7. All API request methods are implemented using Request and Bluebird.

## Important Notes
* A private and secret key must be set before making any private API requests. See [this link](https://vip.bitcoin.co.id/trade_api).
* Correct order of parallel private API requests cannot be guaranteed because of asynchronous nature of JavaScript and network latency. Some requests will fail because of incorrect nonce. _Tell your nice trading bot to handle errors carefully and just don't go too fast_.
* It is recommended to use proven third party library to parse numbers and do arithmetic calculations, such as `bignumber.js`. You know, JavaScript is bad at math and _I am pretty sure you don't want to lose even only a small fraction of your precious digital golds_.
* I am not responsible for any future profits, losses or damages caused by this library. Cryptocurrency trading is always considered to be high-risk activity. By using this library, it is assumed that you know exactly what you are doing.

## Installation
```
$ npm install btc-id
```
...or if you use Yarn
```
$ yarn add btc-id
```

## Usage
```javascript
const btcid = require('btc-id');
const API = new btcid();
```

## Methods
### General
#### `version`
Get Trade API compatibility version. Example:
```javascript
console.log(API.version); // '1.7'
```

#### `baseUrl`
Get/set base URL for API requests. Example:
```javascript
console.log(API.baseUrl); // 'https://vip.bitcoin.co.id'
API.baseUrl = 'http://a-trading-proxy.com';
console.log(API.baseUrl); // 'http://a-trading-proxy.com'
```

#### `key`
Set API key. Example:
```javascript
API.key = 'AAAAAAAA-BBBBBBBB-CCCCCCCC-DDDDDDDD-EEEEEEEE';
```

#### `secret`
Set secret key. Example:
```javascript
API.secret = '1263e5a57b853024509bf94ff466ec6a2a733ad83a2aa6ceb5cc14301713b4a77f2bb154a66cde73';
```

#### `pair(coinA, coinB)`
An easy way to generate coin pair string for use with API requests. Example:
```javascript
console.log(API.pair('BTC', 'IDR')); // 'btc_idr'
```

### Public API
#### `getTicker(pair)`
Example:
```javascript
API.getTicker(API.pair('BTC','IDR'))
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.error(err);
    });
```

#### `getTrades(pair)`
Example:
```javascript
API.getTrades(API.pair('BTC','IDR'))
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.error(err);
    });
```

#### `getDepth(pair)`
Example:
```javascript
API.getDepth(API.pair('BTC','IDR'))
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.error(err);
    });
```

### Private
#### `getInfo()`
Example:
```javascript
API.getInfo()
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.error(err);
    });
```

#### `getTransHistory()`
Example:
```javascript
API.getTransHistory()
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.error(err);
    });
```

#### `getTradeHistory({pair, [count, from_id, end_id, order, since, end]})`
Example:
```javascript
API.getTradeHistory({pair: API.pair('BTC', 'IDR'), count: 100, order: 'desc'})
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.error(err);
    });
```

#### `getOpenOrders({[pair]})`
Example A (get all open orders of all pairs):
```javascript
API.getOpenOrders({})
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.error(err);
    });
```
Example B (get open orders of specific pair):
```javascript
API.getOpenOrders({pair: API.pair('BTC', 'IDR')})
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.error(err);
    });
```

#### `getOrderHistory({pair, [count, from]})`
Example:
```javascript
API.getOrderHistory({pair: API.pair('BTC', 'IDR'), count: 100})
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.error(err);
    });
```

#### `getOrder({pair, order_id})`
Example:
```javascript
API.getOrder({pair: API.pair('BTC', 'IDR'), order_id: 94428})
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.error(err);
    });
```
