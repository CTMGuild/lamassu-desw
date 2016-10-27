var _ = require('lodash');

var common = require('./lib/common');
//var ticker = require('./lib/ticker').ticker;
//var trader = require('./lib/trader');
var wallet = require('./lib/wallet');


module.exports = {
  NAME: 'DeSW',
  SUPPORTED_MODULES: ['wallet'],
  config: common.config,
  /* Wallet dependencies. */
  sendBitcoins: wallet.sendBitcoins,
  newAddress: wallet.newAddress,
  /* Trader and Wallet dependencies. */
  balance: common.balance
}
