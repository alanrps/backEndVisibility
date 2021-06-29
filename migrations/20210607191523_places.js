exports.up = knex => knex.schema.createTable('places', table => {
    table
        .increments('id');
    table
        .integer('marker_id')
        .notNull();
    table
        .string('category_id', 50)
        .notNull();
    table
        .string('name', 100)
        .notNull();
    table
        .enu('classify', ['ACCESSIBLE', 'NOT ACCESSIBLE', 'PARTIALLY'])
        .notNull();
    table
        .enu('space_type', ['PRIVATE', 'PUBLIC'])
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
})
    .table('places', table => {
        table
            .foreign('marker_id')
            .references('id')
            .inTable('markers');
        table
            .foreign('category_id')
            .references('id')
            .inTable('categories');
    });

exports.down = knex => knex.schema.dropTable('places');

