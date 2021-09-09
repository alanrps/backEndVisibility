
exports.up = knex => knex.schema.createTable('markers', table => {
    table
        .increments('id');
    table
        .integer('user_id')
        .notNull();
    table
        .string('markers_type_id')
        .notNull();
    table
        .specificType('coordinates', 'geography(POINT)')
        .notNull();
    table
        .integer('last_updated')
        .defaultTo(null);
    table
        .boolean('denounced')
        .defaultTo(false);
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
    .table('markers', table => {
        table
            .foreign('user_id')
            .references('id')
            .inTable('users');
        table
            .foreign('markers_type_id')
            .references('id')
            .inTable('markers_type');
    });

exports.down = knex => knex.schema.dropTable('markers');
