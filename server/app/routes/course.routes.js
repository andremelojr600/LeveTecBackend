module.exports = (app) => {
    const cursos = require('../controllers/course.controller.js');


    app.post('/cursos', cursos.create);

    // Retorna todos os Cursos
    app.get('/cursos', cursos.findAll);

    // Retorna um unico curso com a Id
    app.get('/cursos/:cursoId', cursos.findOne);

    app.put('/cursos/:cursoId', cursos.update);

    app.delete('/cursos/:cursoId', cursos.delete);

}