var mongojs = require('mongojs'),
    debug   = require('debug')('dragons:db'),
    config  = require('config');

'use strict';
function _connection(vars) {
  var username  = vars.MONGO_USERNAME || config.get('mongo.username')
      ,password  = vars.MONGO_PASSWORD || config.get('mongo.password')
      ,host      = vars.MONGO_HOST     || config.get('mongo.host')
      ,port      = vars.MONGO_PORT     || config.get('mongo.port')
      ,database  = vars.MONGO_DATABASE || config.get('mongo.database')

      auth = username ? username + ':' + password + '@' : '';

  return 'mongodb://' + auth + host + ':' + port + '/' + database;
};

var db = mongojs(_connection(process.env));

db.on('error', function(err) {
  debug(err);
});

module.exports = db;