const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// cria a aplicacao express
const app = express();

//o CORS permite que requisicoes possam acessar hosts remotos
app.use(cors());

// analisa requisicoes de content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// analisa requisicoes content-type - application/json
app.use(bodyParser.json());

// Configurando a base de dados
const dbConfig = require('./server/config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Conectando a base de dados
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to data base.");    
}).catch(err => {
    console.log('Error to connect with data base', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.json({"message": "Welcome to your server!"});
});

require('./server/app/routes/person.routes')(app);
require('./server/app/routes/course.routes')(app);

// listen para requisicoes
app.listen(3001, () => {
    console.log("Server activated at port 3001");
});