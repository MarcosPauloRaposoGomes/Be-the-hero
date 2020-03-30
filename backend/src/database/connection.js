//Conexão do routes com o banco de dados
const knex = require('knex');//importar o knex
const configuration = require('../../knexfile');// ../ serve para voltar uma pasta na hora de buscar o arquivo

const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development;//variáveis ambiente do node test

const connection = knex(config);

module.exports = connection;//Exportar a conexão com o banco de dados, vou importar esse arquivo nos arquivos que precisam de conexão com o banco de dados