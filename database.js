const knexConfig = require('./knexfile'); // Problema com o import, verificar babel

const env = process.env.ENVIRONMENT || 'development';

const {
    client,
    connection,
    migrations,
    seeds,
} = knexConfig[env];

const knex = require('knex')({
    client,
    connection,
    migrations,
    seeds,
});

module.exports = knex;
