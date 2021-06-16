
exports.up = knex => knex.schema.createTable('categories', table => {
    table
        .string('id', 50)
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

exports.down = knex => knex.schema.dropTable('categories');
