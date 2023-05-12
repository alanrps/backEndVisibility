import { Knex, knex } from 'knex';
import knexConfig from './knexfile';
import { attachPaginate } from 'knex-paginate';

const env = process.env.ENVIRONMENT || 'development';

const clientConfigs: Knex.Config = knexConfig[env];

attachPaginate();

const knexInstance = knex({ ...clientConfigs, debug: false });

export default knexInstance;
