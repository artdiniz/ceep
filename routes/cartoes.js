var express = require('express');
var router = express.Router();

var mongoose = require('../db/mongoose')
  , MuralDAO = require('../dao/MuralDAO')(mongoose)
  , MuralController = require('../controller/MuralController')(MuralDAO);

router.get('/instrucoes', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.json({instrucoes: [
    {
		   "conteudo": "Bem vindo ao Ceep!"
      ,"cor": "#FFAA10"
    }
   ,{
		   "conteudo": "O site é otimizado par celulares!"
      ,"cor": "#45AAEE"
    }
   ,{
		   "conteudo": "Para mudar o layout, clique no botão Linha do cabeçalho"
      ,"cor": "#FF1010"
    }
  ]});
});

router.post("/salvar", MuralController.saveOrUpdate.bind(MuralController));

router.get("/carregar", MuralController.find.bind(MuralController));

module.exports = router;
