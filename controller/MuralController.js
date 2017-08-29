'use strict'

var _Promise = require('bluebird')
	, debug = require('debug')('ceep:controller')
	, xml = require('xml');

function MuralController(DAO) {
	this.DAO = _Promise.promisifyAll(DAO);
}

MuralController.prototype.help = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");

	const objAjudas = {
		instrucoes: [
			{
			"conteudo": "Bem vindo ao Ceep!"
			,"cor": "#FFAA10"
			}
			,{
			"conteudo": "O site é otimizado para celulares!"
			,"cor": "#45AAEE"
			}
			,{
				"conteudo": "Para mudar o layout, clique no botão Linha do cabeçalho"
				,"cor": "#FF1010"
			}
	]};

	res.json(objAjudas);
}

MuralController.prototype.helpXML = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");

	const objAjudas = {
		instrucoes: [
			{
			"conteudo": "Bem vindo ao Ceep!"
			,"cor": "#FFAA10"
			}
			,{
			"conteudo": "O site é otimizado para celulares!"
			,"cor": "#45AAEE"
			}
			,{
				"conteudo": "Para mudar o layout, clique no botão Linha do cabeçalho"
				,"cor": "#FF1010"
			}
	]};
	res.set('Content-Type', 'text/xml');
	res.send(xml(objAjudas));
}

MuralController.prototype.saveOrUpdate = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");

	var mural = req.body;
	var usuario = mural.usuario;

	mural.cartoes = mural.cartoes || [];

	this.DAO.updateAsync({ usuario: usuario }, mural)
	        .then(function(result) {
	      		res.json({usuario: usuario, quantidade: mural.cartoes ? mural.cartoes.length : 0});
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