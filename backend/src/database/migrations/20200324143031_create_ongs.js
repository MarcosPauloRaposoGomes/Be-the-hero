
exports.up = function(knex) {//método responsável pela criação da tabela
  return knex.schema.createTable('ongs', function (table){
     table.string('id').primary();//Criar o id da ong automaticamente e não deixar o usuário escolher um
     table.string('name').notNullable(); //notNullable faz com que o campo seja obrigatório de ser preenchido
     table.string('email').notNullable();
     table.string('whatsapp').notNullable();
     table.string('city').notNullable();
     table.string('uf',2).notNullable();//O ",2" idíca o número max de caracteres que podem ser preenchidos por esse campo
  });
};

exports.down = function(knex) {//Se der problema e eu precisar voltar atrás com a criação de alguma tabela
  return knex.schema.dropTable('ongs');
};
