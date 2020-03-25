
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
        table.increments();//Vai criar uma chave primário de auto incremento
        table.string('title').notNullable(); //notNullable faz com que o campo seja obrigatório de ser preenchido
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();//Criar o relacionamento da ong com o incidente

        table.foreign('ong_id').references('id').inTable('ongs');//Chave estrangeira, toda vez que o ong id estiver preenchido ele precisa ser um id cadastrado na tabela ong
     });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
