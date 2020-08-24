  
const Curso = require('../models/course.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const PessoaSchema = mongoose.Schema({
    nome: String,
    telefone: String,
    CPF: String,
    cursos: [ {type : mongoose.Schema.ObjectId, ref: 'Curso' } ]
});

module.exports = mongoose.model('Pessoa', PessoaSchema);