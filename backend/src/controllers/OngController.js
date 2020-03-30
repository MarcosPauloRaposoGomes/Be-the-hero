const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');//Importando a conexão com o banco de dados para realizar operações

const crypto = require('crypto');//importando o pacote de criptografia, iremos usar o método para gerar strings aleatórias

module.exports = {
    async index (request, response) {//podemos usar métodos diferentes para a mesma variável
        const ongs = await connection('ongs').select('*');//* significa todos os campos de todos os registro na tabela ongs
    
        return response.json(ongs);
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;// Acessar a requisição, as informações podem ser armazenadas em uma variável só ou em várias

        const id = generateUniqueId();//Vai gerar 4 bytes de caracteres hexadecimais que vai virar um id

        await connection('ongs').insert({//o await junto com o async vai retornar o resultado da ong recem criada só depois depois do insert ser finalizado
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        //console.log(data);//Mostrar no terminal os parâmetros

        return response.json({ id });//Depois de ler todas as informações da ong o sistema vai gerar o id de login para ela e vai retorná-lo pro cliente
    }
};