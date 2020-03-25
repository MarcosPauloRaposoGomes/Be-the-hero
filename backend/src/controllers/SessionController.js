const connection = require('../database/connection');//Importando a conexão com o banco de dados

module.exports = {
    async create( request, response){
        const { id } = request.body;

        const ong = await connection ('ongs')
        .where('id', id)
        .select('name')
        .first();//Como eu estou buscando um id, só vai me retornar um ong como correta e por conta disto só nos importa o primeiro

        if(!ong){
            return response.status(400).json({ error: 'No ONG found with this ID'});//alguma coisa deu errado
        }
        return response.json(ong);
    }
}