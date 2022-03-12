
exports.up = knex => knex.schema.createTable('badges', table => {
    table
        .increments('id')
        .primary()
        .notNull();
    table
        .string('description', 100)
        .defaultTo(null);
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

exports.down = knex.schema.dropTable('badges');
