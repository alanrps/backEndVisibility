import { Knex } from 'knex';

const connection: Knex.ConnectionConfig = {
    host: process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USER || 'postgres',
    database: process.env.POSTGRES_DB || 'visibility',
    password: process.env.POSTGRES_PASSWORD,
    dialect: process.env.DIALECT || 'postgres',
    ssl: { rejectUnauthorized: false },
};

const clientConfigs: { development: Knex.Config, testing: Knex.Config, production: Knex.Config } = {
    development: {
        client: 'pg',
        connection,
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
    testing: {
        client: 'pg',
        connection,
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
    production: {
        client: 'pg',
        connection,
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
};

export default clientConfigs;
