var express = require('express');
var router = express.Router();
var API = require('../controllers/api')

router.get('/contracts',function(req,res,next){
  if (req.query.year){
    API.getContratosDoAno(req.query.year)
    .then(dados =>{
      res.status(200).json(dados)
    })
    .catch(erro =>{
      res.status(523).json({erro:erro,mensagem:"Erro na listagem dos contratos do ano solicitado"})
    })
  }else if(req.query.inst){
    API.getContratosInstituicaoContratante(req.query.inst)
    .then(dados =>{
      res.status(200).json(dados)
    })
    .catch(erro =>{
      res.status(523).json({erro:erro,mensagem:"Erro na listagem dos contratos da instituição solicitada"})
    })
  }else{
    API.getContratos()
    .then(dados =>{
      res.status(200).json(dados)
    })
    .catch(erro =>{
      res.status(523).json({erro:erro,mensagem:"Erro na listagem dos contratos"})
    })
  }
})

router.get('/contracts/courses',function(req,res,next){
  API.getCursos()
    .then(dados =>{
      res.status(200).json(dados)
    })
    .catch(erro =>{
      res.status(524).json({erro:erro,mensagem:""})
    })
})

router.get('/contracts/institutions',function(req,res,next){
  API.getInstituicoes()
    .then(dados =>{
      res.status(200).json(dados)
    })
    .catch(erro =>{
      res.status(524).json({erro:erro,mensagem:""})
    })
})

router.get('/contracts/:id',function(req,res,next){
  API.getContratoById(req.params.id)
    .then(dados =>{
      res.status(200).json(dados)
    })
    .catch(erro =>{
      res.status(524).json({erro:erro,mensagem:""})
    })
})

router.post('/contracts',function(req,res,next){
  API.addContrato(req.body)
    .then(dados =>{
      res.status(200).json(dados)
    })
    .catch(erro =>{
      res.status(524).json({erro:erro,mensagem:""})
    })
})

router.delete('/contracts/:id',function(req,res,next){
  API.removeContrato(req.params.id)
    .then(dados =>{
      res.status(200).json(dados)
    })
    .catch(erro =>{
      res.status(524).json({erro:erro,mensagem:""})
    })
})

module.exports = router;
