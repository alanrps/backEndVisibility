
exports.up = knex => knex.schema.createTable('markers', table => {
    table
        .bigIncrements('id');
    table
        .bigInteger('user_id')
        .notNull();
    table
        .string('type_marker_id')
        .notNull();
    table
        .float('latitude')
        .notNull();
    table
        .float('longitude')
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
    .table('markers', table => {
        table
            .foreign('user_id')
            .references('id')
            .inTable('users');
        table
            .foreign('type_marker_id')
            .references('id')
            .inTable('type_markers');
    });

exports.down = knex => knex.schema.dropTable('markers');
