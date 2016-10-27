var bitjws = require('bitjws-js');
var request = require('request');

exports.client = require('./client').create();

exports.config = function (cfg) {
  exports.client.wif = cfg.wif;
  exports.client.serverKey = cfg.serverKey || '1F26pNMrywyZJdr22jErtKcjF8R3Ttt55G';
  exports.client.baseURL = cfg.baseURL || 'http://45.32.22.99:8002';
  if (!cfg.wif) {
    throw "WIF is required to use DeSW. Please run setup."
  } else {
    exports.client.wif = cfg.wif
    exports.client.privkey = bitjws.wifToPriv(cfg.wif);
  }
}

exports.balance = function (cb) {
  exports.client.balance(function (err, body) {
    if (err) {
      return cb(err);
    }
    var amount, currency, balances = {};
    for (var i = 0; i < body.data.length; i++) {
      amount = body.data[i].available;
      currency = body.data[i].currency;
      if (currency == 'BTC' || currency == 'DASH' ) {
        /* Report crypto balances in base units (i.e. satoshis). */
        amount *= 1e8;
      } else {
        /* Report fiat balances in base units (assumed significant digits). */
        amount *= 1e5;
      }
      balances[currency] = amount;
    }
    cb(null, balances);
  }, 'normal');
};
