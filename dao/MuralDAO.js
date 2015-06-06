'use strict'

var debug = require('debug')('ceep:dao');

function MuralDAO(model) {
	this.model = model;
};

MuralDAO.prototype.update = function(query, data, callback) {
  this.model.update(query, data, {upsert: true}).exec(function(err, result) {
    callback(err, result);
  });
};

MuralDAO.prototype.find = function(query, callback) {
  this.model.findOne(query, "usuario cartoes").exec(callback);
};

module.exports = function(mongoose){
	var MuralSchema = new mongoose.Schema({
		created_at: {type: Date, default: Date.now}
		,updated_at: {type: Date, default: Date.now}
		,usuario: {type: String, match: /^.+@.+\..{2,}$/i}
		,cartoes: [{conteudo: String, cor: {type: String, match: /^#(([a-f]|\d){6}|([a-f]|\d){3})$/i}}]
	});

	return new MuralDAO(mongoose.model("Mural", MuralSchema));
};