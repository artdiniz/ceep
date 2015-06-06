var mongoose  = require('mongoose'),
    debug     = require('debug')('ceep:db'),
    config    = require('config');

'use strict';
function _connection(vars) {
  var username  = vars.MONGO_USERNAME || config.get('mongo.username'),
      password  = vars.MONGO_PASSWORD || config.get('mongo.password'),
      host      = vars.MONGO_HOST     || config.get('mongo.host'),
      port      = vars.MONGO_PORT     || config.get('mongo.port'),
      database  = vars.MONGO_DATABASE || config.get('mongo.database'),

      auth = username ? username + ':' + password + '@' : '';

  return 'mongodb://' + auth + host + ':' + port + '/' + database;
}

mongoose.connect(_connection(process.env));
var db = mongoose.connection;

db.on('error', function(err) {
  debug(err);
});

db.once('open', function (callback) {
  debug('connected to mongodb');
});

module.exports = mongoose;
