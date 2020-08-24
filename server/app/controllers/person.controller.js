const Pessoa = require('../models/person.model.js');

// Cria e salva uma nova pessoa.
exports.create = (req, res) => {
    // Valida uma requisicao
    /*if(!req.body.content) {
        return res.status(400).send({
            message: "Conteudo da pessoa nao pode estar vazio"
        });
    }*/

    // Cria a Pessoa
    const pessoa = new Pessoa({
        nome: req.body.nome || "Anonimo", 
        telefone: req.body.telefone,
        CPF: req.body.CPF,
        cursos: req.body.cursos
    });

    // Salva Pessoa no banco de dados.
    pessoa.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro ocorreu ao criar a Pessoa."
        });
    });
};

// Retorna todas as pessoas do banco de dados.
exports.findAll = (req, res) => {
    Pessoa.find()
    .then(pessoas => {
        console.log(pessoas);
        res.send(pessoas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro ocorreu ao recuperar Pessoas."
        });
    });
};

// Procura uma unica Pessoa com a Id.
exports.findOne = (req, res) => {
    Pessoa.findById(req.params.pessoaId)
    .then(pessoa => {
        if(!pessoa) {
            return res.status(404).send({
                message: "Pessoa nao encontrada com a Id " + req.params.pessoaId
            });            
        }
        res.send(pessoa);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Pessoa nao encontrada com a Id " + req.params.pessoaId
            });                
        }
        return res.status(500).send({
            message: "Erro ao recuperar Pessoa com a Id " + req.params.pessoaId
        });
    });
};

// Atualiza uma Pessoa identificada por sua Id.
exports.update = (req, res) => {
    // Valida requisicao
    /*if(!req.body.content) {
        return res.status(400).send({
            message: "Conteudo de Pessoa nao pode ser vazio"
        });
    }*/

    // Ache a Pessoa e a atualize com a requisicao
    Pessoa.findByIdAndUpdate(req.params.pessoaId, {
        nome: req.body.nome || "Anonimo",
        telefone: req.body.telefone,
        CPF: req.body.CPF,
        cursos: req.body.cursos
    }, {new: true})
    .then(pessoa => {
        if(!pessoa) {
            return res.status(404).send({
                message: "Pessoa nao encontrada com a Id " + req.params.pessoaId
            });
        }
        res.send(pessoa);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Pessoa nao encontrada com a Id " + req.params.pessoaId
            });                
        }
        return res.status(500).send({
            message: "Erro atualizando pessoa com a Id " + req.params.pessoaId
        });
    });
};

// Deleta a nota identificada por sua Id.
exports.delete = (req, res) => {
    Pessoa.findByIdAndRemove(req.params.pessoaId)
    .then(pessoa => {
        if(!pessoa) {
            return res.status(404).send({
                message: "Pessoa nao encontrada com a id " + req.params.pessoaId
            });
        }
        res.send({message: "Pessoa deletada com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Pessoa nao encontrada com a id " + req.params.pessoaId
            });                
        }
        return res.status(500).send({
            message: "Nao foi possivel deletar pessoa com a id " + req.params.pessoaId
        });
    });
};
