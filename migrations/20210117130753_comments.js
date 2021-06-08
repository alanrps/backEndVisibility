
exports.up = function (knex) {
    return knex.schema.createTable('comments', table => {
        table
            .bigIncrements('id')
        table
            .bigInteger('user_id')
            .notNull();
        table
            .bigInteger('marker_id')
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
};

exports.down = function (knex) {
    return knex.schema.dropTable('comments');
};
