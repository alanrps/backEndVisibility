const knexConfig = require('./knexfile'); // Problema com o import, verificar babel
const { attachPaginate } = require('knex-paginate');

const env = process.env.ENVIRONMENT || 'development';

const {
    client,
    connection,
    migrations,
    seeds,
} = knexConfig[env];

attachPaginate();

const knex = require('knex')({
    client,
    connection,
    migrations,
    seeds,
    debug: false,
});

module.exports = knex;
