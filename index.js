const crypto = require('crypto');
const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));

function _pair(coinA, coinB) {
    return coinA.toLowerCase() + '_' + coinB.toLowerCase();
}

function _handleResponse(response) {
    let body = JSON.parse(response.body);
    if (body.error) {
        return Promise.reject(body);
    } else {
        return Promise.resolve(body);
    }
}

function _handleResponsePrivate(response) {
    return _handleResponse(response)
        .then(function(body) {
            return body.return;
        });
}

module.exports = class BitcoinIndonesiaAPI {
    constructor() {
        this._version = '1.7';
        this._key = null;
        this._secret = null;
        this._baseUrl = 'https://vip.bitcoin.co.id';
    }

    get version() {
        return this._version;
    }

    set key(key) {
        this._key = key;
    }

    set secret(secret) {
        this._secret = secret;
    }

    get baseUrl() {
        return this._baseUrl;
    }

    set baseUrl(url) {
        this._baseUrl = url;
    }

    pair(coinA, coinB) {
        return _pair(coinA, coinB);
    }

    // NOTE: Public methods
    getTicker(pair) {
        return request.getAsync(this._baseUrl + '/api/' + pair + '/ticker')
            .then(function(response) {
                return _handleResponse(response);
            });
    }

    getTrades(pair) {
        return request.getAsync(this._baseUrl + '/api/' + pair + '/trades')
            .then(function(response) {
                return _handleResponse(response);
            });
    }

    getDepth(pair) {
        return request.getAsync(this._baseUrl + '/api/' + pair + '/depth')
            .then(function(response) {
                return _handleResponse(response);
            });
    }

    // NOTE: Private methods
    _postRequest(method, parameters) {
        if (!this._key || !this._secret) {
            return Promise.reject('Please set API key and secret key!');
        }

        let params = parameters || {};
        params.method = method;
        params.nonce = Date.now();
        let data = '';

        Object.keys(params).forEach(function(key, idx) {
            if (idx > 0) {
                data += '&'
            }
            data += key + '=' + params[key];
        });

        const signed_data = crypto.createHmac('sha512', this._secret).update(data).digest('hex');

        return request.postAsync({
                url: this._baseUrl + '/tapi',
                form: params,
                headers: {
                    Sign: signed_data,
                    Key: this._key
                }
            })
            .then(function(response) {
                return _handleResponsePrivate(response);
            });
    }

    getInfo() {
        return this._postRequest('getInfo');
    }

    getTransHistory() {
        return this._postRequest('transHistory');
    }

    getTradeHistory({
        pair = _pair('btc', 'idr'),
        count = 1000,
        from_id,
        end_id,
        order = 'desc',
        since,
        end
    }) {
        return this._postRequest('tradeHistory', arguments[0]);
    }

    getOpenOrders({
        pair
    }) {
        return this._postRequest('openOrders', arguments[0]);
    }

    getOrderHistory({
        pair = _pair('btc', 'idr'),
        count = 100,
        from
    }) {
        return this._postRequest('orderHistory', arguments[0]);
    }

    getOrder({
        pair,
        order_id
    }) {
        return this._postRequest('getOrder', arguments[0]);
    }
}
