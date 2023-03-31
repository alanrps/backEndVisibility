import { Knex, knex } from 'knex';
import knexConfig from './knexfile';
import { attachPaginate } from 'knex-paginate';

const env = process.env.ENVIRONMENT || 'development';

const {
    client,
    connection,
    migrations,
    seeds,
} = knexConfig[env];

attachPaginate();

const config: Knex.Config = {
  client,
  connection,
  migrations,
  seeds,
  debug: false,
};

const knexInstance = knex(config);

export default knexInstance;
