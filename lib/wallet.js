var client = require('./common').client;

exports.sendBitcoins = function (address, satoshis, fee, cb) {
  var amount = (satoshis / 1e8).toFixed(8);
  var currency = 'BTC'; // TODO make variable
  var network = 'bitcoin'; // TODO make variable
  var reference = 'lamassu tx'; // TODO make variable
  client.send(address, amount, currency, network, reference, function(err, body) {
    if (err) {
      return cb(err);
    }
    cb(null, body.data.id);
  });
};

exports.newAddress = function (info, cb) {
  var currency = 'BTC'; // TODO make variable
  var network = 'bitcoin'; // TODO make variable
  client.getAddress(network, currency, function(err, body) {
    if (err) {
      return cb(err);
    }
    cb(null, body.data.address);
  });
};
