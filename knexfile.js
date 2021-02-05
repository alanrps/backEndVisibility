require('dotenv').config();

// const db_url = `postgres://postgres:${process.env.DB_PASSWORD}@postgres:5432/visibility`;

const connection = {
  host : 'localhost',
  user : 'postgres',
  password : process.env.DB_PASSWORD,
  database : 'visibility'
};

module.exports = {
  development: {
    client: 'pg',
    connection,
    migrations: {
      directory: './migrations',
    },
    seeds: { 
      directory: './seeds' 
    },
  },

  testing: {
    client: 'pg',
    connection,
    migrations: {
      directory: './migrations',
    },
    seeds: { 
      directory: './seeds' 
    },
  },

  production: {
    client: 'pg',
    connection,
    migrations: {
      directory: './migrations',
    },
    seeds: { 
      directory: './seeds' 
    },
  },
};