module.exports = (app) => {
    const pessoas = require('../controllers/person.controller.js');

    // Cria uma nova Pessoa
    app.post('/pessoas', pessoas.create);

    // Retorna todas as Pessoas
    app.get('/pessoas', pessoas.findAll);

    // Retorna um unica Pessoa com a Id
    app.get('/pessoas/:pessoaId', pessoas.findOne);

    // Atualiza uma Pessoa com a Id
    app.put('/pessoas/:pessoaId', pessoas.update);

    // Deleta uma Pessoa com a Id
    app.delete('/pessoas/:pessoaId', pessoas.delete);

}