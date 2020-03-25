//mudança no arquivo json, subtitui o teste por "scripts": "start": "nodemon index.js" serve para atualizar o servidor a cada alteração na aplicação automaticamente
const express = require ('express'); //Estou importando todas as funcionalidades do modulo express para a variável express. É um pacote e por isso só usamos o nome "express"

const cors = require('cors');//Vai determinar quem pode acessar nossa aplicação(qual front end vai poder acessar nossa aplicação e etc)

const routes = require('./routes'); //Importando as rotas da aplicação para o index. É um arquivo por isso eu passo o caminho relativo

const app = express (); //Variável que vai armazenar a aplicação

app.use(cors());//Modo desenvolvimento

app.use(express.json());//Antes de todas as requisição o express vai ir no corpo da requisição para transformar o json para um objeto javascript para ficar entendiviel pela aplicação

app.use(routes);//chamando as rotas da aplicação

app.listen(3333); //Acessar a aplicação pela porta 3333 via localhost no navegador 