const express = require('express');
const { celebrate,Segments, Joi} = require('celebrate');

const OngController =  require('./controllers/OngController');

const IncidentController = require('./controllers/IncidentController');

const ProfileController = require('./controllers/ProfileController');

const SessionController =  require('./controllers/SessionController');

const routes = express.Router();//estou desacoplando o modulo de rotas do express para dentro de uma variável

routes.post('/sessions', SessionController.create);//Criar uma sessão para autorizar o login

routes.get('/ongs', OngController.index);//listagem de ongs

routes.post('/ongs', celebrate({
    [Segments.BODY]:Joi.object().keys({//Validar o body da requisição
        name: Joi.string().require(),//O nome tem que ser uma string, ele é obrigatório
        email: Joi.string().require().email(),
        whatsapp: Joi.string().require().min(10).max(11),//minimo 10 caracteres.
        city: Joi.string().require(),
        uf: Joi.string().require().length(2),
    })
}),OngController.create); //Passo a informação da rota, se tem só / quer dizer que é a rota principal, se tiver /contato quer dizer que é a rota do contato

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        Authorization: Joi.string().require(),
    }).unknown(),//Validar os Headers da requisição discartando as outras variáves que não são necessarias
}) ,ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncidentController.create);

routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

module.exports = routes;