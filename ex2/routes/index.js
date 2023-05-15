var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:15015/contracts")
    .then(function(resp){
        var contratos = resp.data
        res.render('index', {d:data, contratos:contratos})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })
});

router.get('/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  console.log(req.params.id)
  axios.get("http://localhost:15015/contracts/" + req.params.id)
    .then(function(resp){
        var contrato = resp.data
        console.log(contrato)
        res.render('contrato', {d:data, contrato:contrato})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })
});

router.get('/inst/:nipc', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  console.log(req.params.nipc)
  axios.get("http://localhost:15015/contracts?inst=" + req.params.nipc)
    .then(function(resp){
        var contratos = resp.data
        console.log(contratos)
        res.render('contratosInstituicao', {d:data, contratos:contratos})
    })
    .catch( erro => {
      res.render('error', {error: erro, message: "Erro!"})
    })
});

module.exports = router;