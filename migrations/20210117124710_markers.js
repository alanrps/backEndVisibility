
exports.up = function (knex) {
    return knex.schema.createTable('markers', table => {
        table
            .increments('id');
        table
            .integer('user_id')
            .notNull();
        table
            .string('type_marker_id')
            .notNull();
        table
            .integer('latitude')
            .notNull();
        table
            .string('longitude')
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
};

exports.down = function (knex) {
    return knex.schema.dropTable('markers');
};
