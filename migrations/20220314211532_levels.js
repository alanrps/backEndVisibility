
exports.up = knex => knex.schema.createTable('levels', table => {
    table
        .increments('id')
        .primary()
        .notNull();
    table
        .increments('description')
        .notNull();
    table
        .integer('points')
        .defaultTo(0);
    table
        .dateTime('created_at')
        .notNull()
        .defaultTo(knex.raw('now()'));
    table
        .dateTime('updated_at')
        .notNull()
        .defaultTo(knex.raw('now()'));
    table
        .dateTime('deleted_at')
        .defaultTo(null);
});

exports.down = knex => knex.schema.dropTable('levels');
