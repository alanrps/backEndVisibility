// const env = process.env.ENVIRONMENT || 'development';
import { development } from './knexfile';

const {
    client,
    connection,
    migrations,
    seeds,
} = development;

const knex = require('knex')({
    client,
    connection,
    migrations,
    seeds,
});

module.exports = knex;
