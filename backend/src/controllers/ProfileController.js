const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization;
        const incidents =  await connection('incidents')
        .where('ong_id',ong_id)//Estou buscando todos os incidentes que determinada ong criou
        .select('*');//Todos os campos desses incidentes

        return response.json(incidents);
    }
}