const Curso = require('../models/course.model.js');

// Cria e salva uma nova curso.
exports.create = (req, res) => {
    // Valida uma requisicao
    /*if(!req.body.content) {
        return res.status(400).send({
            message: "Conteudo da curso nao pode estar vazio"
        });
    }*/

    // Cria o Curso
    const curso = new Curso({
        nome: req.body.nome || "Curso sem nome", 
        pessoas: req.body.pessoas
    });

    // Salva Curso no banco de dados.
    curso.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro ocorreu ao criar a Curso."
        });
    });
};

// Retorna todas os cursos do banco de dados.
exports.findAll = (req, res) => {
    Curso.find()
    .then(cursos => {
        res.send(cursos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro ocorreu ao recuperar Cursos."
        });
    });
};

// Procura um unico Curso com a Id.
exports.findOne = (req, res) => {
    Curso.findById(req.params.cursoId)
    .then(curso => {
        if(!curso) {
            return res.status(404).send({
                message: "Curso nao encontrado com a Id " + req.params.cursoId
            });            
        }
        res.send(curso);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Curso nao encontrado com a Id " + req.params.cursoId
            });                
        }
        return res.status(500).send({
            message: "Erro ao recuperar Curso com a Id " + req.params.cursoId
        });
    });
};

// Atualiza uma Curso identificada por sua Id.
exports.update = (req, res) => {
    // Valida requisicao
    /*if(!req.body.content) {
        return res.status(400).send({
            message: "Conteudo de Curso nao pode ser vazio"
        });
    }*/

    // Ache a Curso e a atualize com a requisicao
    Curso.findByIdAndUpdate(req.params.cursoId, {
        nome: req.body.nome || "Curso sem nome",
        pessoas: req.body.pessoas
    }, {new: true})
    .then(curso => {
        if(!curso) {
            return res.status(404).send({
                message: "Curso nao encontrada com a Id " + req.params.cursoId
            });
        }
        res.send(curso);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Curso nao encontrada com a Id " + req.params.cursoId
            });                
        }
        return res.status(500).send({
            message: "Erro atualizando nota com a Id " + req.params.cursoId
        });
    });
};

// Deleta a nota identificada por sua Id.
exports.delete = (req, res) => {
    Curso.findByIdAndRemove(req.params.cursoId)
    .then(curso => {
        if(!curso) {
            return res.status(404).send({
                message: "Curso nao encontrada com a id " + req.params.cursoId
            });
        }
        res.send({message: "Curso deletada com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Curso nao encontrada com a id " + req.params.cursoId
            });                
        }
        return res.status(500).send({
            message: "Nao foi possivel deletar curso com a id " + req.params.cursoId
        });
    });
};