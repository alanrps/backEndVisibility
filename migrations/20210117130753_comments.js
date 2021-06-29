
exports.up = knex => knex.schema.createTable('comments', table => {
    table
        .increments('id');
    table
        .integer('user_id')
        .notNull();
    table
        .integer('marker_id')
        .notNull();
    table
        .string('description', 100)
        .notNull();
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
})
    .table('comments', table => {
        table
            .foreign('marker_id')
            .references('id')
            .inTable('markers');
        table
            .foreign('user_id')
            .references('id')
            .inTable('users');
    });

exports.down = knex => knex.schema.dropTable('comments');
