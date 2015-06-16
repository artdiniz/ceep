var express = require('express');
var router = express.Router();

var mongoose = require('../db/mongoose')
  , MuralDAO = require('../dao/MuralDAO')(mongoose)
  , MuralController = require('../controller/MuralController')(MuralDAO);

router.get('/instrucoes', MuralController.help.bind(MuralController));

router.post("/salvar", MuralController.saveOrUpdate.bind(MuralController));

router.get("/carregar", MuralController.find.bind(MuralController));

module.exports = router;
