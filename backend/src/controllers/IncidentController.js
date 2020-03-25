const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1} = request.query;

        const [count] =  await connection('incidents')//[count] significa a casa 0 do vetor
        .count();      


        const incidents = await connection('incidentes')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//relacionar dados de duas tabelas
        .limit(5)//Limitar apenas 5 casos por página
        .offset((page - 1)*5)
        .select([
            'incidets.*',
            'ongs.name',
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);//Vai retornar para o header da resposta/requisiçao o número total de elementos cadastrados

        return response.json(incidents);
    },
    
    async create(request, response){
        const { title, discription, value} = request.body;
        const ong_id =request.headers.authorization;//Acessar todas as informações do usuário logado na aplicação que ta criando o post
    
    const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({id});
    },

    async delete(request, response){
        const { id } = request.params;//pegar o id pelo parametro de rota
        const ong_id = request.headers.authorization;//id da ong logada para verificar se o id acima realmente foi criado pela ong que quer deletá-lo

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(incident.ong_id!= ong_id){
            return response.status(401).json({erro: 'Operation not permited.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};