'use strict'

var _Promise = require('bluebird')
	, debug = require('debug')('ceep:controller');

function MuralController(DAO) {
	this.DAO = _Promise.promisifyAll(DAO);
}

MuralController.prototype.saveOrUpdate = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");

	console.log(req.body)

	var mural = req.body
  var usuario = mural.usuario;

  console.log(mural)

  this.DAO.updateAsync({ usuario: usuario }, mural)
	  .then(function(result) {
	    res.json({usuario: usuario, quantidade: mural.cartoes.length});
	  })
	  .catch(next);
};

MuralController.prototype.find = function(req, res, next) {
	this.DAO.findAsync({usuario: req.query.usuario})
		.then(function(result){
			result = result || {usuario: req.query.usuario, cartoes: []};
			res.jsonp(result);
		})
		.catch(next);
}

module.exports = function(DAO){
	return new MuralController(DAO);
}