const connection = {
    host: process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USER || 'postgres',
    database: process.env.POSTGRES_DB || 'visibility',
    password: process.env.POSTGRES_PASSWORD,
    dialect: process.env.DIALECT || 'postgres',
    ssl: { rejectUnauthorized: false },
};

module.exports = {
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
