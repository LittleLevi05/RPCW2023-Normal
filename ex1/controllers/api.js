var Contrato = require('../models/contrato')

module.exports.getContratos = () =>{
    return Contrato
        .find()
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.getContratoById = id => {
    return Contrato
        .findOne({
            _id:id,
        })
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getContratosInstituicaoContratante = nipc => {
    return Contrato
        .find({
            NIPCInstituicao:nipc,
        })
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getCursos = () => {
    return Contrato
        .distinct("Curso")
        .then(dados => {
            console.log(dados)
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getInstituicoes = () => {
    return Contrato
        .distinct("NomeInstituicao")
        .then(dados => {
            console.log(dados)
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addContrato = contrato =>{
    return Contrato
        .create(contrato)
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.removeContrato = id => {
    return Contrato.
        deleteOne({
            _id:id
        })
        .then(docs => {
            return docs
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getContratosDoAno = ano => {
    return Contrato
        .aggregate([
                {
                    $addFields: {
                        DataInicioContrato: {
                            $toDate: "$DataInicioContrato"
                        }
                    }
                },
                {
                    $match: {
                        DataInicioContrato: {
                          $gte: new Date(Number(ano), 0, 1),
                          $lt: new Date(Number(ano) + 1, 0, 1)
                        }
                      }                      
                },
            ])
            .then(dados => {
                console.log(dados)
                return dados
            })
            .catch(erro => {
                console.log(erro)
                return erro
            })
}