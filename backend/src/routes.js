const express = require('express');

const OngController =  require('./controllers/OngController');

const IncidentController = require('./controllers/IncidentController');

const ProfileController = require('./controllers/ProfileController');

const SessionController =  require('./controllers/SessionController');

const routes = express.Router();//estou desacoplando o modulo de rotas do express para dentro de uma variável

routes.post('/sessions', SessionController.create);//Criar uma sessão para autorizar o login

routes.get('/ongs', OngController.index);//listagem de ongs

routes.post('/ongs', OngController.create); //Passo a informação da rota, se tem só / quer dizer que é a rota principal, se tiver /contato quer dizer que é a rota do contato

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.create);

routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;