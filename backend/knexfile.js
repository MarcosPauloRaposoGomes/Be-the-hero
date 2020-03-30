// Update with your config settings.
//é nesse arquivo que fica nossas configurações de acesso ao banco de dados dos ambientes da aplicação

module.exports = {
//ambiente de desenvolvimento
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'//arquvio que vai armazenar os dados da minha base
    },
    migrations: {
      directory: './src/database/migrations'//Onde minhas migrations vão ser armazenadas
    },
    useNullAsDefault: true,//Temos passar essa propriedade pq por padrão o sqlite não suporta a inserção de default value "Valores padrão para as colunas do banco de dados" e com essa propriedade atribuimos nulo a essas valores
  },

  //Teste do banco de dados
  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  staging: {
    //ambiente de produção para o time de desenvolvimento, simula a produção para que o time de desenvolvimento simule a aplicação online
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    //ambiente de produção, quando o projeto é jogado online para clientes acessarem nossa aplicação
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
