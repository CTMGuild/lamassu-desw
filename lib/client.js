var bitjws = require('bitjws-js');
var request = require('request');


module.exports = {

  create: function(options) {
    /* Recognized keys in options:
     *  wif, baseURL, serverKey
     */
    if (options === undefined) {
      options = {}
    }
    if (!options.baseURL) {
      options.baseURL = 'http://45.32.22.99:8002';
    }
    if (!options.serverKey) {
      options.serverKey = '1F26pNMrywyZJdr22jErtKcjF8R3Ttt55G';
    }

    return {
      wif: options.wif,
      serverKey: options.serverKey,
      baseURL: options.baseURL,

      /* Make a call to the DeSW API. */
      call: function(path, params, method, cb) {
        var headers = {'Content-Type': 'application/jose'};
        var message = bitjws.signSerialize(path, params, this.privkey.key, 1800);
        data = {
          url: this.baseURL + path,
          body: message,
          headers: headers,
          method: method.toUpperCase()
        }
        var self = this
        request(data, function(err, raw, body) {
          if(err) {
            cb(err, null);
          } else if (raw.statusCode != 200) {
            cb(body, null);
          } else {
            var decoded = bitjws.validateDeserialize('/response', body, true);
            if(decoded.header.kid != self.serverKey) {
              cb("bad server key " +  decoded.header.kid + " expected " + self.serverKey, null);
            }
            cb(null, decoded.payload);
          }
        });
      },

      /* DeSW API */

      register: function(username, cb) {
        this.call('/user', {'username': username}, 'post', cb);
      },

      accountInfo: function(cb) {
        this.call('/user', {}, 'get', cb);
      },

      balance: function(cb) {
        this.call('/balance', {}, 'get', cb);
      },

      getAddress: function(network, currency, cb) {
        this.call('/address', {'network': network, 'currency': currency}, 'post', cb);
      },

      send: function(address, amount, currency, network, reference, cb) {
        this.call('/debit', {'network': network, 'currency': currency, 'amount': amount, 'address': address, 'reference': reference}, 'post', cb);
      }

    };
  }
};
